// This page gonna be different. Currently spin up a basic game

import { Sketcher } from "./engine/sketcher.js";
import { physicsAnimator } from "./engine/animators/physics-animator.js";
import { spaceAnimator } from "./engine/animators/space-animator.js";
import { Game } from "./game";
function main() {
  const canvas = document.querySelector(".game-canvas");
  const sketcher = new Sketcher(canvas);
  const game = new Game(sketcher);

  sketcher.animator = (zindex, items) => {
    game.animator(zindex, items)
    spaceAnimator(zindex, items);
    physicsAnimator(zindex, items);
  };
  sketcher.start();
  game.start();
}

main();
