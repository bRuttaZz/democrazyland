import { GameObject } from "../../engine/game-object.js";
import { CANVAS_DIMENTIONS } from "../../engine/conf.js";
import { CHARACTER_ZINDEX } from "../conf.js";


export const pathMaker = (sketcher) => {
  const char_path = new GameObject(`path`, {
    skin: null,
    x: 0,
    y: CANVAS_DIMENTIONS.height - 80,
    width: CANVAS_DIMENTIONS.width,
    height: 90,
    zIndex: CHARACTER_ZINDEX,
    gravity: false,
    deleteOnOffscreen: false,
    exceptSpaceAnimation: true,
    collitionVelocityDampingFactor: 0.2,
    disappearOnCollision: false,
    preventDelete: false,
  });
  char_path.fill = "black"
  return char_path
}
