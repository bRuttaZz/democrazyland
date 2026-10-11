import { GameObject } from "../../engine/game-object.js";
import { CANVAS_DIMENTIONS } from "../../engine/conf.js";
import { CHARACTER_ZINDEX } from "../conf.js";


export const pathMaker = (sketcher) => {
  const char_path = new GameObject(`path`, {
    skin: null,
    x: 0,
    y: CANVAS_DIMENTIONS.height - 20,
    width: CANVAS_DIMENTIONS.width,
    height: 10,
    zIndex: CHARACTER_ZINDEX,
    gravity: false,
    deleteOnOffscreen: true,
    exceptSpaceAnimation: true,
    collitionVelocityDampingFactor: 0.6,
  });
  return char_path
}
