import { GameObject } from "../../engine/game-object.js";
import { INFOTILE_ZINDEX } from "../conf.js";


// Oscillating particle
export const directionObjectMaker = (sketcher) => {
  const directionObject = new GameObject("directionObject", {
    x: 500,
    y: 300,
    width: 50,
    height: 50,
    zIndex: 5,
    gravity: false,
    disappearOnCollision: true,
  });
  directionObject.oscillation = true;
  directionObject.oscillationVelocityMax = 1;
  directionObject.oscillationAccilertaion = 0.05;
  directionObject.fill = "red";
  console.log("got here ", directionObject)
  return directionObject
}
