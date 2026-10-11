import { GameObject } from "../engine/game-object.js";
import { gameAnimator } from "./animators.js";
import {
  registerSpaceAnimationKeyBinds,
  registerCharacterJumpKeyBindings,
} from "./keybindings.js";
import { Objects } from "./objects"
import { DEBUG } from "./conf.js";


export class Game{
  /**
   * Game
   * @param {Sketcher} sketcher
   */
  constructor(sketcher) {
    this.sketcher = sketcher;
    this.objects = new Objects(this.sketcher);
    if (DEBUG)
      this.sketcher.fpsIndicator = document.querySelector(".fps-value");
  }

  /**
   * Bind characters and game listerns
   */
  start() {
    this.objects.bind();
    registerSpaceAnimationKeyBinds();
    registerCharacterJumpKeyBindings();
  }

  /**
   * Game custom animator
   * @param {Number} zindex - zindex of objects
   * @param {Array<GameObject>} items - game objects
   */
  animator(zindex, items) {
    gameAnimator(zindex, items);
  }
}
