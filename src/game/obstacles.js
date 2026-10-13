import { ANIMATION_VARS, CANVAS_DIMENTIONS } from "../engine/conf.js"
import { GameObject } from "../engine/game-object.js";
import { assetStore } from "../utils/asset-man.js";
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

  6350: _leftieMakerCockroach,// pro to us
  6400: _leftieMaker,         // pro to us

  7350: _rssMaker,
  9350: _barricadeMaker,
  10350: _policeMaker,     // life threatening
  11350: _barricadeMaker,
  12350: _RSSMaker,        // life threatening
  13350: _barricadeMaker,
  14350: _ModiMaker,       // run against
  15850: _ECChairMaker,    // fly away
  16850: _BallotBox,       // victory
}

function __baseObstacle() {
  return new GameObject(`weak-obstacle-${Date.now()}`, {
    x: CANVAS_DIMENTIONS.width,
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
  obstcl.skin = assetStore.img.baricade[0]
  obstcl.width = 250
  obstcl.leftOffset = 150
  obstcl.rightOffset = 150
  obstcl.topOffset = 30
  obstcl.bottomOffset = 50
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _unclesMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "gray";
  obstcl.leftOffset = 250
  obstcl.rightOffset = 250
  obstcl.topOffset = 250
  obstcl.bottomOffset = 150

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.uncles
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.uncles.length
  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _godiMediaMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "orange";
  obstcl.leftOffset = 180
  obstcl.rightOffset = 180
  obstcl.topOffset = 100
  obstcl.bottomOffset = 50

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.media
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.media.length
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
  obstcl.stopAtXRelativeToMainChar = 150
  obstcl.ignoreCollisionExceptBottom = [MAIN_CHARACTER_OBJ_NAME, "leftie2"]
  obstcl.fill = "red";

  obstcl.leftOffset = 80
  obstcl.rightOffset = 80
  obstcl.topOffset = 100
  obstcl.bottomOffset = 20

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.leftieStand
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.leftieStand.length

  obstcl.skinArray = {
    run: assetStore.img.leftieRun,
    jump: assetStore.img.leftieJump,
    stand: assetStore.img.leftieStand,
  };
  obstcl.skinArrayRunIndex = 0;
  obstcl.skinIdleIndex = 0;
  obstcl.skinArrayRunIndexMax = assetStore.img.leftieRun.length;
  obstcl.skinIdleIndexMax = assetStore.img.leftieStand.length;

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
  obstcl.stopAtXRelativeToMainChar = 250
  obstcl.ignoreCollisionExceptBottom = [MAIN_CHARACTER_OBJ_NAME, "leftie1"]
  obstcl.fill = "brown";

  obstcl.leftOffset = 80
  obstcl.rightOffset = 80
  obstcl.topOffset = 100
  obstcl.bottomOffset = 20

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.cockroachStand
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.cockroachStand.length

  obstcl.skinArray = {
    run: assetStore.img.cockroachRun,
    jump: assetStore.img.cockroachJump,
    stand: assetStore.img.cockroachStand,
  };
  obstcl.skinArrayRunIndex = 0;
  obstcl.skinIdleIndex = 0;
  obstcl.skinArrayRunIndexMax = assetStore.img.cockroachRun.length;
  obstcl.skinIdleIndexMax = assetStore.img.cockroachStand.length;

  return obstcl;
}

/**
 *
 * @param {Sketcher} sketcher
 */
function _rssMaker(sketcher) {
  const obstcl = __baseObstacle()
  obstcl.fill = "magenta";
  obstcl.leftOffset = 250
  obstcl.rightOffset = 250
  obstcl.topOffset = 300
  obstcl.bottomOffset = 100

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.rss
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.rss.length
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
  obstcl.leftOffset = 100
  obstcl.rightOffset = 350
  obstcl.topOffset = 250
  obstcl.bottomOffset = 150

  obstcl.xVelocityVector = -3

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.police
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.police.length
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
  obstcl.leftOffset = 100
  obstcl.rightOffset = 400
  obstcl.topOffset = 270
  obstcl.bottomOffset = 130

  obstcl.xVelocityVector = -5

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.rssKalip
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.rssKalip.length
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
  obstcl.ignoreCollisionExceptBottom = ["throw-away-obstacle-ecchair", "victory-obstacle-ballotbox",]

  obstcl.leftOffset = 0
  obstcl.rightOffset = 250
  obstcl.topOffset = 50
  // obstcl.bottomOffset = 50

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.mnaStand
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.mnaStand.length

  obstcl.addEventListener("velocity-flipped", () => {
    obstcl.idleSkinArray = assetStore.img.mnaRun
    obstcl.idleSkinArrayIndex = 0
    obstcl.idleSkinArrayIndexMax = assetStore.img.mnaRun.length
  })

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
  obstcl.ignoreCollisionExceptBottom = ["coward-obstacle-mna", ]
  obstcl.leftOffset = 0
  obstcl.rightOffset = 400
  obstcl.topOffset = 200
  obstcl.bottomOffset = 50

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.chair
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.chair.length

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
  obstcl.ignoreCollisionExceptBottom = ["coward-obstacle-mna", ]

  obstcl.leftOffset = 400
  obstcl.rightOffset = 0
  obstcl.topOffset = 100
  obstcl.bottomOffset = 150

  obstcl.idleChar = true
  obstcl.idleSkinArray = assetStore.img.ballot
  obstcl.idleSkinArrayIndex = 0
  obstcl.idleSkinArrayIndexMax = assetStore.img.ballot.length

  sketcher.dispatchEvent(new Event("victory-box"))
  let vicrotyHandler = () => {
    obstcl.removeEventListener("collided", vicrotyHandler);
    sketcher.dispatchEvent(new Event("victory"))
  }
  obstcl.addEventListener("collided", vicrotyHandler)
  return obstcl;
}
