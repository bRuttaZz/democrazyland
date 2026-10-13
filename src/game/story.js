import { audioEngine } from "../audio-engine/engine.js";
import { Sketcher } from "../engine/sketcher";
import { assetStore } from "../utils/asset-man.js";


export class Story {
  /**
  *
  * @param {Sketcher} canvas
  */
  constructor(sketcher) {
    this.frames = assetStore.img.storyFrames

    this.sketcher = sketcher;
    this.canvas = sketcher.canvas;
    this.context = sketcher.cntxt;
    this.width = sketcher.width;
    this.height = sketcher.height;

    this.originalBg = this.canvas.style.backgroundImage;

    this.grainCanvas = document.createElement('canvas');
    this.grainCanvas.width = this.canvas.width;
    this.grainCanvas.height = this.canvas.height;
    this.grainCtx = this.grainCanvas.getContext('2d');
  }

  delete() {
    this.canvas.style.backgroundImage = this.originalBg;
    this.context.clearRect(0, 0, this.width, this.height);

    this.sketcher = null;
    this.canvas = null;
    this.context = null;
    this.width = null;
    this.height = null;

    this.originalBg = null;
    this.grainCtx.closePath();
    this.grainCanvas = null;
    this.grainCtx = null
  }

  drawFrame(index) {
    this.canvas.style.backgroundImage = `url("${this.frames[index].src}")`;
  }

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  async tellStory() {
    this.context.fillColor = "#eee";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    await this.sleep(1000);

    const intervel = setInterval(this._addGrain.bind(this, 0.6), 100);
    const audiobg1 = audioEngine.play("bgNoise", { loop: true })

//     audioEngine.play("storyShutter");
//     this.drawFrame(0);
//     await this.sleep(2000);
//
//     audioEngine.play("storyShutter");
//     this.drawFrame(1);
//     await this.sleep(2000);

    audiobg1.stop();
    clearInterval(intervel);
    this.canvas.style.backgroundImage = this.originalBg;
  }

  _addGrain(intensity = 0.2) {
    const imageData = this.grainCtx.createImageData(this.grainCanvas.width, this.grainCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = 128 + (Math.random() - 0.5) * 255 * intensity;
      data[i] = data[i + 1] = data[i + 2] = val; // grayscale
      data[i + 3] = 50; // Alpha: 0 (transparent) to 255 (opaque)
    }

    this.grainCtx.putImageData(imageData, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.grainCanvas, 0, 0);
  }

}
