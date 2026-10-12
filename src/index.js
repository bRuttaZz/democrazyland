// This page gonna be different. Currently spin up a basic game

import { loadAllAssets } from "./utils/asset-man.js"
import { Sketcher } from "./engine/sketcher.js";
import { Game } from "./game";

async function main() {
  await loadAllAssets();

  const canvas = document.querySelector(".game-canvas");
  const sketcher = new Sketcher(canvas);
  const game = new Game(sketcher);

  game.start();
}

main();
