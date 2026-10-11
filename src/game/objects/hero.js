// Main chatacter
import { GameObject } from "../../engine/game-object.js";
import { MAIN_CHARACTER_OBJ_NAME, CHARACTER_ZINDEX } from "../conf.js";


export const heroMaker = (sketcher) => {
  const mainCharacter = new GameObject(MAIN_CHARACTER_OBJ_NAME, {
    x: 60,
    y: 300,
    width: 50,
    height: 100,
    zIndex: CHARACTER_ZINDEX,
    gravity: true,
    deleteOnOffscreen: true,
    exceptSpaceAnimation: true,
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
