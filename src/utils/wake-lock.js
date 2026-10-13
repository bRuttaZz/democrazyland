
class ScreenWakeLock {
  constructor() {
    this.sentinel = null;
    this.wanted = false;

    document.addEventListener("visibilitychange", () => {
      if (this.wanted && document.visibilityState === "visible") this._request();
    });
  }

  async keepAwake() {
    this.wanted = true;
    await this._request();
  }

  async release() {
    this.wanted = false;
    await this.sentinel?.release();
    this.sentinel = null;
  }

  async _request() {
    if (!("wakeLock" in navigator) || this.sentinel) return;
    try {
      this.sentinel = await navigator.wakeLock.request("screen");
      this.sentinel.addEventListener("release", () => { this.sentinel = null; });
    } catch (err) {
      console.warn("Wake lock not available:", err);
    }
  }
}

export const wakeLock = new ScreenWakeLock();
