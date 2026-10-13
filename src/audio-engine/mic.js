export class MicNotFoundError extends Error {
  constructor(msg) {
    super(msg)
    this.name = "MicNotFoundError"
  }
}

export class MicMeter extends EventTarget {
  /**
   * @param {Number} threshold - 0 to 1
   * @param {Number} hysteresis - 0 to 1 level must drop this to treat as quite again
   * @param {Number} minDb / maxDb - loudness mapped to an empty / full bar
   */
  constructor({ threshold = 0.7, hysteresis = 0.08, minDb = -60, maxDb = -10 } = {}) {
    super();
    this.threshold = threshold;
    this.hysteresis = hysteresis;
    this.minDb = minDb;
    this.maxDb = maxDb;
    this.level = 0;
    this.isLoud = false;
    this.isRunning = false;
    this.stream = null;

    window.addEventListener("unload", () => {
      this.stream?.getTracks().forEach((t) => t.stop());
    })

    this._tickFn = this._tick.bind(this);
  }

  async init() {
    if (this.stream) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new MicNotFoundError("Mic not supported (needs https or localhost)")
    }
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,  // keeps the game's own sounds out of the mic
        noiseSuppression: true,
        autoGainControl: false,  // AGC flattens the loudness to be measured
      },
    });
  }

  async start(context = null) {
    if (this.isRunning) return;
    await this.init()

    this.context = context || this.context || new AudioContext();
    if (this.context.state === "suspended") this.context.resume(); // not awaited on purpose

    this.source = this.context.createMediaStreamSource(this.stream);
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 1024;
    this.samples = new Float32Array(this.analyser.fftSize);
    this.source.connect(this.analyser); // NOT to destination, so no mic echo

    this.isRunning = true;
    this._rafId = requestAnimationFrame(this._tickFn);
  }

  stop() {
    if (!this.isRunning) return;
    cancelAnimationFrame(this._rafId);
    this.source.disconnect();
    this.stream.getTracks().forEach((t) => t.stop());
    this.isRunning = false;
    this.level = 0;
    this.isLoud = false;
    this.dispatchEvent(new CustomEvent("level", {detail: {level: 0, isLoud: false}}))
  }

  _tick() {
    if (!this.isRunning) {
      this._rafId = requestAnimationFrame(this._tickFn);
      return
    }
    this.analyser.getFloatTimeDomainData(this.samples);
    let sum = 0;
    for (let i = 0; i < this.samples.length; i++) sum += this.samples[i] ** 2;
    const rms = Math.sqrt(sum / this.samples.length);
    const db = 20 * Math.log10(rms || 1e-8);
    const target = Math.min(1, Math.max(0, (db - this.minDb) / (this.maxDb - this.minDb)));

    // Rise fast, fall slow
    this.level += (target - this.level) * (target > this.level ? 0.5 : 0.08);

    if (!this.isLoud && this.level >= this.threshold) {
      this.isLoud = true;
      this.dispatchEvent(new CustomEvent("loud", {detail: {level: this.level,}}))
    } else if (this.isLoud && this.level < this.threshold - this.hysteresis) {
      this.isLoud = false;
      this.dispatchEvent(new CustomEvent("quiet", {detail: {level: this.level,}}))

    }
    this.dispatchEvent(new CustomEvent("level", {detail: {level: this.level, isLoud: this.isLoud}}))
    this._rafId = requestAnimationFrame(this._tickFn);
  }
}

export const micMeter = new MicMeter()
