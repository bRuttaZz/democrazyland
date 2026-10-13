// This page gonna be different. Currently spin up a basic game

import { loadAllAssets, assetStore } from "./utils/asset-man.js"
import { Sketcher } from "./engine/sketcher.js";
import { audioEngine } from "./audio-engine/engine.js";
import { micMeter } from "./audio-engine/mic.js"
import { Game } from "./game";
import { modal, micBar } from "./utils/ui.js"

async function main() {
  await loadAllAssets();
  await modal.show("Hi", "there", "Ok");
  await micMeter.init();
  await audioEngine.init(assetStore.audio);

  const canvas = document.querySelector(".game-canvas");
  const sketcher = new Sketcher(canvas);
  const game = new Game(sketcher);

  micBar.setThreshold(micMeter.threshold);
  micMeter.addEventListener("level", (detail) => { micBar.update(detail.detail?.level, detail.detail?.isLoud) });
  micBar.show();

  game.addEventListener("wasted", async () => {
    await modal.show("Oops! We lost.", "You died! Try to say the slogan next time..", "Ok")
    window.location.reload();
  })

  game.addEventListener("victory", async () => {
    await modal.show("Great! We won.", "Try to make hold on to the box next time <br>(also use it properly)..", "Ok")
    window.location.reload();
  })

  game.start();
}

main();
