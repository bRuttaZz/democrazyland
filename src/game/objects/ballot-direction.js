import { GameObject } from "../../engine/game-object.js";
import { INFOTILE_ZINDEX } from "../conf.js";
import { CANVAS_DIMENTIONS } from "../../engine/conf.js"

// Oscillating particle
export const directionObjectMaker = (sketcher) => {
  const directionObject = new GameObject("directionObject", {
    x: CANVAS_DIMENTIONS.width / 2 - 150,
    y: 200,
    width: 300,
    height: 180,
    zIndex: INFOTILE_ZINDEX,
    gravity: false,
    disappearOnCollision: true,
    exceptSpaceAnimation: true,
  });
  directionObject.oscillation = true;
  directionObject.oscillationVelocityMax = 1;
  directionObject.oscillationAccilertaion = 0.05;
  directionObject.fill = "red";
  return directionObject
}
