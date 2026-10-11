import { heroMaker } from "./hero.js"
import { pathMaker } from "./path.js"
import { directionObjectMaker } from "./ballot-direction.js"

export class Objects {

  static ObjectMakers = []

  /**
   * Game Objects
   * @param {Sketcher} sketcher
   */
  constructor(sketcher) {
    this.sketcher = sketcher
    this.objects = Objects.ObjectMakers.map(maker => maker(sketcher))
    console.log(this.objects)
  }

  bind() {
    this.objects.forEach(obj => {
      this.sketcher.addItem(obj.zIndex, obj);
    });
  }
}

Objects.ObjectMakers = [
  heroMaker,
  directionObjectMaker,

  pathMaker,
]
