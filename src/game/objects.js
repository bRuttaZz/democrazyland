import { GameObject } from "../engine/game-object.js";
import { INFOTILE_ZINDEX, MAIN_CHARACTER_OBJ_NAME, CHARACTER_ZINDEX, CHARACTER_X_INIT, CHARACTER_Y_INIT } from "./conf.js";
import { CANVAS_DIMENTIONS } from "../engine/conf.js"
import { assetStore } from "../utils/asset-man.js"
import { audioEngine } from "../audio-engine/engine.js"


export class Objects {

  static ObjectMakers = []

  /**
   * Game Objects
   * @param {Sketcher} sketcher
   */
  constructor(sketcher) {
    this.sketcher = sketcher
    this.objects = Objects.ObjectMakers.map(maker => maker(sketcher))
  }

  bind() {
    this.objects.forEach(obj => {
      this.sketcher.addItem(obj.zIndex, obj);
    });
  }
}

// Oscillating ballotbox direction
export const directionObjectMaker = (sketcher) => {
  const directionObject = new GameObject("directionObject", {
    x: CANVAS_DIMENTIONS.width - 600,
    y: 300,
    width: 500,
    height: 500,
    zIndex: INFOTILE_ZINDEX,
    gravity: false,
    disappearOnCollision: true,
    exceptSpaceAnimation: true,
  });
  directionObject.oscillation = true;
  directionObject.oscillationVelocityMax = 2;
  directionObject.oscillationAccilertaion = 0.1;
  directionObject.fill = "red";
  directionObject.skin = assetStore.img.direction[0];
  sketcher.addEventListener("victory-box", () => {
    directionObject.deleted = true
  }, {once: true})
  return directionObject
}

export const pathMaker = (sketcher) => {
  const char_path = new GameObject(`path`, {
    skin: null,
    x: 0,
    y: CANVAS_DIMENTIONS.height - 320,
    width: CANVAS_DIMENTIONS.width,
    height: 330,
    zIndex: CHARACTER_ZINDEX,
    gravity: false,
    deleteOnOffscreen: false,
    exceptSpaceAnimation: true,
    collitionVelocityDampingFactor: 0.2,
    disappearOnCollision: false,
    preventDelete: false,
    isFloor: true,
  });
  char_path.skin = assetStore.img.platform[0]
  return char_path
}

export const heroMaker = (sketcher) => {
  const mainCharacter = new GameObject(MAIN_CHARACTER_OBJ_NAME, {
    x: CHARACTER_X_INIT,
    y: CHARACTER_Y_INIT,
    width: 180,
    height: 400,
    leftOffset: 50,
    rightOffset: 50,
    topOffset: 50,
    zIndex: CHARACTER_ZINDEX,
    gravity: true,
    deleteOnOffscreen: true,
    exceptSpaceAnimation: true,
    collitionVelocityDampingFactor: 0, // collision damping caused by this character
  });
  mainCharacter.fill = "blue";
  mainCharacter.proChar = true;
  mainCharacter.skinArray = {
    run: assetStore.img.heroRun,
    jump: assetStore.img.heroJump,
    stand: assetStore.img.heroStand,
  };
  mainCharacter.skinArrayRunIndex = 0;
  mainCharacter.skinIdleIndex = 0;
  mainCharacter.skinArrayRunIndexMax = assetStore.img.heroRun.length;
  mainCharacter.skinIdleIndexMax = assetStore.img.heroStand.length;

  mainCharacter.addEventListener("jump", () => {
    audioEngine.play("jump")
  })
  mainCharacter.addEventListener("object-updated", () => {
    // making it bit regerous for main character
    if (mainCharacter.x + mainCharacter.width / 2 < 0)
      mainCharacter.deleted = true;
  })
  mainCharacter.addEventListener("deleted", () => {
    sketcher.dispatchEvent(new Event("wasted"));
  });

  return mainCharacter;
}


Objects.ObjectMakers = [
  pathMaker,  // first one

  heroMaker,
  directionObjectMaker,
]
