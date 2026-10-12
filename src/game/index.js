import { GameObject } from "../engine/game-object.js";
import { physicsAnimator } from "../engine/animators/physics-animator.js";
import { spaceAnimator } from "../engine/animators/space-animator.js";
import { ANIMATION_VARS } from "../engine/conf.js"
import { audioEngine } from "../audio-engine/engine.js"
import { gameAnimator } from "./animators.js";
import { registerCharacterJumpKeyBindings } from "./keybindings.js";
import { Objects } from "./objects.js"
import { BGMaker } from "./bg.js";
import { Obstacles } from "./obstacles.js";
import { DEBUG, CHARACTER_VARS } from "./conf.js";
import { ScatteringConfetti } from "./tada.js"

export class Game extends EventTarget{
  /**
   * Game
   * @param {Sketcher} sketcher
   */
  constructor(sketcher) {
    super();
    this.sketcher = sketcher;
    this.objects = new Objects(this.sketcher);
    this.bgMaker = new BGMaker(this.sketcher);
    this.obstacles = new Obstacles(this.sketcher);
    this.victoryPop = new ScatteringConfetti(this.sketcher);
    if (DEBUG)
      this.sketcher.fpsIndicator = document.querySelector(".fps-value");

    this.sketcher.animator = this.animator.bind(this);
    this.sketcher.externalDrawer = (cntxt) => {
      this.victoryPop.drawer(cntxt);
    }

    this.sketcher.addEventListener("victory", async () => {
      this.dispatchEvent(new Event("victory"));
      audioEngine.play("tada");
      CHARACTER_VARS.onControl = false
      CHARACTER_VARS.standing = true
      CHARACTER_VARS.jumping = true
      ANIMATION_VARS.spaceAnimator.status = false
      setTimeout(() => {
        CHARACTER_VARS.jumping = false;
      }, 100);
      await this.victoryPop.start();
      sketcher.stop();
    })
    this.sketcher.addEventListener("wasted", () => {
      this.dispatchEvent(new Event("wasted"));
      audioEngine.play("game-over");
      sketcher.stop();
    })
  }

  /**
   * Bind characters and game listerns
   */
  start() {
    audioEngine.play("start");
    audioEngine.playInBg("bgMain");
    audioEngine.playInBg("bgNoise");
    this.objects.bind();
    registerCharacterJumpKeyBindings();
    this.sketcher.start();
  }

  /**
   * Game custom animator
   * @param {Number} zindex - zindex of objects
   * @param {Array<GameObject>} items - game objects
   */
  animator(zindex, items) {
    this.bgMaker.animator(zindex, items);
    this.obstacles.animator(zindex, items);
    gameAnimator(zindex, items);
    spaceAnimator(zindex, items);
    physicsAnimator(zindex, items);
  }
}
