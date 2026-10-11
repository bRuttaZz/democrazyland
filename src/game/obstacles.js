import { ANIMATION_VARS } from "../engine/conf.js"
import { CHARACTER_ZINDEX } from "./conf.js"

export class Obstacles {
  static chart = {} // number: GameObjectMaker
  /**
   *
   * @param {Sketcher} sketcher
   */
  constructor(sketcher) {
    this.sketcher = sketcher;
    this.nextPitStop = Object.keys(Obstacles.chart)[0];
    this.event = new EventTarget()
    this.completed = false
  }

  animator(zindex, _items) {
    if (this.completed) return

    if (ANIMATION_VARS.spaceAnimator.odometer > this.nextPitStop) {
      obj = Obstacles.chart[this.nextPitStop](sketcher);
      delete Obstacles.chart[this.nextPitStop];
      this.sketcher.addItem(CHARACTER_ZINDEX, obj);
      this.nextPitStop = Object.keys(Obstacles.chart)[0]

      if (!this.nextPitStop) {
        this.event.dispatchEvent(new Event("end"));
        this.completed = true
      }
    }
  }
}
