import { Sketcher } from "../engine/sketcher";
import { CHARACTER_ZINDEX } from "./conf.js"


export class ScatteringConfetti extends EventTarget {
  static colors = [
    "#10b981",
    "#7c3aed",
    "#fbbf24",
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#ef4444",
  ]

  constructor(sketcher) {
    super();
    this._enabled = false;
    this._start = Infinity;
    this.confetti = []

    for (let i = 0; i < 40; i++) {
      const radius = Math.floor(Math.random() * 100) - 10
      const tilt = Math.floor(Math.random() * 50) - 10
      const x = Math.random() * sketcher.canvas.width;
      const y = Math.random() * sketcher.canvas.height;

      this.confetti.push({
        x,
        y,
        radius,
        tilt,
        color: ScatteringConfetti.colors[Math.floor(Math.random() * ScatteringConfetti.colors.length)],
        yVelocity: Math.random() * 6 + 2,
        xVelocity: Math.random() * 2 - 1
      })
    }
  }

  start() {
    return new Promise(res => {
      this._enabled = true;
      this._start = performance.now();
      this.addEventListener("completed", res, { once: true });
    })
  }

  drawer(cntxt) {
    if (this._enabled) {
        // Run for at most 10 seconds
      if (performance.now() - this._start > 10000) {
        this._enabled = false;
        this._start = Infinity;
        this.dispatchEvent(new Event("completed"));
        return
      }
      this.confetti.forEach((piece) => {
        piece.y += piece.yVelocity;
        piece.x += piece.xVelocity;
        cntxt.beginPath();
        cntxt.lineWidth = piece.radius / 2;
        cntxt.strokeStyle = piece.color;
        cntxt.moveTo(piece.x + piece.tilt + piece.radius / 4, piece.y);
        cntxt.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.radius / 4);
        cntxt.stroke();
      })
    }
  }
}
