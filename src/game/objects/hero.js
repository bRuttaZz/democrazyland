// Main chatacter
import { GameObject } from "../../engine/game-object.js";
import { MAIN_CHARACTER_OBJ_NAME, CHARACTER_ZINDEX } from "../conf.js";
import { CANVAS_DIMENTIONS } from "../../engine/conf.js"

export const heroMaker = (sketcher) => {
  const mainCharacter = new GameObject(MAIN_CHARACTER_OBJ_NAME, {
    x: 500,
    y: 1000,
    width: 150,
    height: 300,
    zIndex: CHARACTER_ZINDEX,
    gravity: true,
    deleteOnOffscreen: true,
    exceptSpaceAnimation: true,
    collitionVelocityDampingFactor: 0, // collision damping caused by this character
  });
  mainCharacter.fill = "blue";
  mainCharacter.addEventListener("deleted", () => {
    console.log("Game Over");
    sketcher.stop();
    alert("Game Over!");
    self.window.location.reload();
  });
  return mainCharacter;
}
