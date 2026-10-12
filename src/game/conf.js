import { watchObject } from "../utils"
import { ANIMATION_VARS } from "../engine/conf.js"
import { audioEngine } from "../audio-engine/engine.js"


export const DEBUG = true;

export const MAIN_CHARACTER_OBJ_NAME = "Neha-Bora";
export const JUMP_VELOCITY = -50;

export const CHARACTER_X_INIT = 500;
export const CHARACTER_Y_INIT = 1500;
export const CHARACTER_ZINDEX = 5;

export const INFOTILE_ZINDEX = CHARACTER_ZINDEX + 1;
export const WEAK_OBJ_DISANCE = 200;
export const COWARD_OBJ_DISANCE = 400;

export const CHARACTER_VARS = watchObject({
  xPos: CHARACTER_X_INIT,
  jumping: false,
  standing: false,
  onAir: false,
  onControl: true,
}, (obj, key, value, old) => {
  if (!obj.onControl) return
  switch (key) {
    case "jumping":
      if (value)
        audioEngine.play("jump")
      break
    case "onAir":
      ANIMATION_VARS.spaceAnimator.status = value || !obj.standing;
      break
    case "standing":
      ANIMATION_VARS.spaceAnimator.status = obj.onAir || !value
      break
  }
});
