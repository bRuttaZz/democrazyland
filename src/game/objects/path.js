import { GameObject } from "../../engine/game-object.js";
import { assetStore } from "../../utils/asset-man.js"
import { CANVAS_DIMENTIONS } from "../../engine/conf.js";
import { CHARACTER_ZINDEX } from "../conf.js";


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
  });
  char_path.skin = assetStore.img.platform[0]
  return char_path
}
