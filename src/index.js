// This page gonna be different. Currently spin up a basic game

import { loadAllAssets, assetStore } from "./utils/asset-man.js"
import { Sketcher } from "./engine/sketcher.js";
import { audioEngine } from "./audio-engine/engine.js";
import { Game } from "./game";
import { modal } from "./utils/ui.js"

async function main() {
  await loadAllAssets();
  await modal.show("Hi", "there", "Ok");
  await audioEngine.init(assetStore.audio);

  const canvas = document.querySelector(".game-canvas");
  const sketcher = new Sketcher(canvas);
  const game = new Game(sketcher);

  game.start();
}

main();
