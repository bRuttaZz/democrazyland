import { ANIMATION_VARS, CANVAS_DIMENTIONS } from "../engine/conf.js"
import { GameObject } from "../engine/game-object.js";
import { CHARACTER_ZINDEX, MAIN_CHARACTER_OBJ_NAME, CHARACTER_X_INIT, CHARACTER_Y_INIT, CHARACTER_VARS } from "./conf.js"

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
    // spawn new Objects
    if (this.completed) return
    if (ANIMATION_VARS.spaceAnimator.odometer > this.nextPitStop) {
      const obj = Obstacles.chart[this.nextPitStop](this.sketcher);
      delete Obstacles.chart[this.nextPitStop];
      this.sketcher.addItem(CHARACTER_ZINDEX, obj);
      this.nextPitStop = Object.keys(Obstacles.chart)[0]

      if (!this.nextPitStop) {
        this.event.dispatchEvent(new Event("end"));
        this.completed = true
      }
    }
    if (ANIMATION_VARS.spaceAnimator.odometer > 4500) {
      document.querySelector(".mic-hint").classList.add("d-none");
    }
  }
}

Obstacles.chart = {

  850: _barricadeMaker,
  2350: _unclesMaker,
  3350: _barricadeMaker,
  4350: _godiMediaMaker,
  5350: _barricadeMaker,

  6350: _leftieMaker,         // pro to us
  6400: _leftieMakerCockroach,// pro to us

  7350: _rssMaker,
  9350: _barricadeMaker,
  10350: _policeMaker,     // life threatening
  11350: _barricadeMaker,
  12350: _RSSMaker,        // life threatening
  13350: _barricadeMaker,
  14350: _ModiMaker,       // run against
  15350: _ECChairMaker,    // fly away
  16350: _BallotBox,       // victory
}

function __baseObstacle() {
  return new GameObject(`weak-obstacle-${Date.now()}`, {
    x: CANVAS_DIMENTIONS.width+2,
    y: CHARACTER_Y_INIT,
    width: 180,
    height: 400,
    zIndex: CHARACTER_ZINDEX,
    gravity: true,
    deleteOnOffscreen: true,
    exceptSpaceAnimation: false,
    collitionVelocityDampingFactor: 0, // collision damping caused by this character
  });
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _barricadeMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "yellow";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _unclesMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "gray";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _godiMediaMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "orange";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _leftieMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "leftie1"
  obstcl.jumpDelayIndex = 5
  obstcl.stopAtXRelativeToMainChar = 100
  obstcl.ignoreCollisionExceptBottom = [MAIN_CHARACTER_OBJ_NAME, "leftie2"]
  obstcl.fill = "red";
  return obstcl;
}
/**
 *
 * @param {Sketcher} sketcher
 */
function _leftieMakerCockroach(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "leftie2"
  obstcl.jumpDelayIndex = 0
  obstcl.stopAtXRelativeToMainChar = 200
  obstcl.ignoreCollisionExceptBottom = [MAIN_CHARACTER_OBJ_NAME, "leftie1"]
  obstcl.fill = "brown";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _rssMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "magenta";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _policeMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "strong-obstacle-police";
  obstcl.fill = "black";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _RSSMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "strong-obstacle-rss";
  obstcl.fill = "orange";
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _ModiMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "coward-obstacle-mna"
  obstcl.fill = "orange";
  obstcl.xVelocityVector = 3
  obstcl.ignoreCollisionExceptBottom = ["throw-away-obstacle-ecchair", "victory-obstacle-ballotbox", ]
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _ECChairMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "throw-away-obstacle-ecchair"
  obstcl.fill = "purple";
  obstcl.addEventListener("collided", () => {
    obstcl.zIndex = CHARACTER_ZINDEX + 1
    sketcher.changeItemZindex(CHARACTER_ZINDEX + 1, CHARACTER_ZINDEX, obstcl);
  })
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _BallotBox(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.name = "victory-obstacle-ballotbox"
  obstcl.fill = "green";
  let vicrotyHandler = () => {
    obstcl.removeEventListener("collided", vicrotyHandler);
    sketcher.dispatchEvent(new Event("victory"))
  }
  obstcl.addEventListener("collided", vicrotyHandler)
  return obstcl;
}
