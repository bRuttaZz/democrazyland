// This page gonna be different. Currently spin up a basic game

import { loadAllAssets, assetStore } from "./utils/asset-man.js"
import { Sketcher } from "./engine/sketcher.js";
import { audioEngine } from "./audio-engine/engine.js";
import { micMeter, MicNotFoundError } from "./audio-engine/mic.js"
import { Game } from "./game";
import { modal, micBar, showAssetLoadModal } from "./utils/ui.js"

async function main() {
  showAssetLoadModal();
  await loadAllAssets();

  let day = self.localStorage.getItem("day") || 0
  day = parseInt(day)

  const initRes = await modal.show(
    "Lets Go!",
    `Day <b>${day}</b>. Welcome to <b>DemoCrazyLand</b>. <br>Your journey begins.`,
    day ? "Let's win this time!" : "Dive in",
    async () => {
      await micMeter.init();
      await audioEngine.init(assetStore.audio);
    }
  );
  if (initRes) {
    window.hehe = initRes
    // if (initRes == DOMException)
    let error = `<strong style="color: red; font-size: 0.8rem;">Oops! Something went wrong..<br>Please try again later.</strong>`
    if (initRes instanceof DOMException) {
      error = `<strong style="color: red; font-size: 0.8rem;">Oops! You have to grant temporary microphone permission to play this game!
              <br>Please grant it.
              <br><br><small>(Seems like you're a bit cautious about privacy... It might be difficult for you to survive in <b>DemoCrazyLand</b>.)</small>
              </strong>`
    } else if (initRes instanceof MicNotFoundError) {
      error = `<strong style="color: red; font-size: 0.8rem;">Oops! Seems like your browser has no microphone access!
              <br>Please try on a different device..
              </strong>`
    }

    await modal.show(null, error, "Ok")
    window.location.reload();
    return
  }

  const canvas = document.querySelector(".game-canvas");
  const sketcher = new Sketcher(canvas);
  const game = new Game(sketcher);

  micBar.setThreshold(micMeter.threshold);
  micMeter.addEventListener("level", (detail) => { micBar.update(detail.detail?.level, detail.detail?.isLoud) });

  game.addEventListener("start", () => {
    micBar.show();
  })
  game.addEventListener("wasted", async () => {
    await modal.show("Oops! We lost.", "You died! Try to say the slogan bit more loud next time..", "Ok")
    let day = parseInt(self.localStorage.getItem("day") || 0)
    self.localStorage.setItem("day", day + 1);
    window.location.reload();
  })

  game.addEventListener("victory", async () => {
    await modal.show("Great! We won.", "Try to make hold on to the box next time <br>(also use it properly)..", "Ok")
    self.localStorage.removeItem("day");
    window.location.reload();
  })

  game.start(day==0);
}

main();
