import { CHARACTER_VARS } from "./conf.js";
import { micMeter } from "../audio-engine/mic.js"

export function registerCharacterJumpKeyBindings() {
  const paddle = document.querySelector(".paddle-jump");
  let setFlag = false;
  const action = (set) => {
    if (!CHARACTER_VARS.onControl)
      return
    if (set && !setFlag) {
      setFlag = true;
      CHARACTER_VARS.jumping = set;
    } else if (!set) {
      setFlag = false;
      CHARACTER_VARS.jumping = set;
    }
  };

  self.window.addEventListener("keydown", (e) => {
    if (e.key === " ") action(true);
  });
  self.window.addEventListener("keyup", (e) => {
    if (e.key === " ") action(false);
  });
  paddle.addEventListener("touchstart", (e) => {
    action(true);
    e.preventDefault();
  });
  paddle.addEventListener("touchend", (e) => {
    action(false);
    e.preventDefault();
  });

  // mic
  micMeter.addEventListener("loud", ()=>action(true));
  micMeter.addEventListener("quiet", ()=>action(false));
}
