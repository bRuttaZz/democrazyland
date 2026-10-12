import { ANIMATION_VARS } from "../engine/conf.js";
import {
  MAIN_CHARACTER_OBJ_NAME,
  JUMP_VELOCITY,
  CHARACTER_VARS,
  CHARACTER_X_INIT,
  WEAK_OBJ_DISANCE,
  COWARD_OBJ_DISANCE,
} from "./conf.js";

const mainCharacterYTrack = Array(15);

/**
 * Game specific animations
 * @param {Number} zindex
 * @param {Array<GameObject>} items
 */
export function gameAnimator(zindex, items) {
  items.forEach((item) => {
    _leftieSpaceAnimDecider(zindex, item);
    _obstacleActionLogics(zindex, item);
    _skinAnimator(zindex, item);

    _characterJumpObjectAnimator(zindex, item);
    _oscillationAnimator(zindex, item);
  });
}

/**
 * Character jump animation
 * @param {Number} _zindex
 * @param {GameObject} item
 */
function _characterJumpObjectAnimator(_zindex, item) {
  if (item.name == MAIN_CHARACTER_OBJ_NAME) {
    // main character jump calc
    mainCharacterYTrack.push(item.y)
    mainCharacterYTrack.shift();
    CHARACTER_VARS.xPos = item.x + item.width

    if (
      item.isHorizontalCollided &&
      CHARACTER_VARS.jumping
    ) {
      item.dispatchEvent(new Event("jump"));
      item.yVelocityVector = JUMP_VELOCITY;
      setTimeout(() => {
        if (CHARACTER_VARS.jumping) {
          item.yVelocityVector += JUMP_VELOCITY / 2;
        }
        CHARACTER_VARS.jumping = false;
      }, 250);
    }
    if (item.isGrounded) {
      CHARACTER_VARS.onAir = false;
    } else {
      CHARACTER_VARS.onAir = true;
    }

  } else if (item.name.startsWith("leftie")) {
    // jump animation for the pro protesters
    if (!item.spaceAnimation)
      item.baseY = mainCharacterYTrack[item.jumpDelayIndex || 0];
  }
}

/**
 * Animator for some leftie character behaviour.
 * @param {Number} _zindex
 * @param {GameObject} item
 */
function _leftieSpaceAnimDecider(_zindex, item) {
  if (
    item.name.startsWith("leftie") &&
    item.spaceAnimation &&
    item.x <= CHARACTER_X_INIT - (item.stopAtXRelativeToMainChar || 200)
  ){
    item.spaceAnimation = false;
    item.proChar = true;
  }
}

/**
 * Animator for oscillation motions.
 * as of now handling only vertical oscillations
 * set the approprite values for perfect oscillation (prefereably gravity should be zero)
 * @param {Number} _zindex
 * @param {GameObject} item
 */
function _oscillationAnimator(_zindex, item) {
  if (
    !item.oscillation || // boolean
    !item.oscillationVelocityMax || // maximum oscillation velocity
    !item.oscillationAccilertaion // oscillation damping accileration
  )
    return;
  if (item._oscillationVelocity == undefined) {
    item._oscillationVelocity = item.oscillationVelocityMax;
    item._oscillationDirection = -1;
  }

  if (item._oscillationVelocity <= -item.oscillationVelocityMax) {
    item._oscillationDirection = 1;
  } else if (item._oscillationVelocity >= item.oscillationVelocityMax) {
    item._oscillationDirection = -1;
  }
  item._oscillationVelocity +=
    item._oscillationDirection * item.oscillationAccilertaion;

  item.yVelocityVector = item._oscillationVelocity;
}

function _obstacleActionLogics(_zindex, item) {
  if (
    item.name.startsWith("weak-obstacle")
  ) {
    const xDiff = item.x - CHARACTER_VARS.xPos
    if (xDiff <= WEAK_OBJ_DISANCE && xDiff > -5)
      CHARACTER_VARS.standing = true;
    else
      CHARACTER_VARS.standing = false;
  }
  if (
    item.name.startsWith("coward-obstacle")
  ) {
    const xDiff = item.x - CHARACTER_VARS.xPos
    if (xDiff <= COWARD_OBJ_DISANCE)
      item.xVelocityVector = 20
  }
  if (
    item.name.startsWith("throw-away-obstacle")
  ) {
    const xDiff = item.x - CHARACTER_VARS.xPos
    if (xDiff <= 10) {
      item.dispatchEvent(new Event("collided"))
    }
  }
  if (
    item.name.startsWith("victory-obstacle")
  ) {
    const xDiff = item.x - CHARACTER_VARS.xPos
    if (xDiff <= 500) {
      item.dispatchEvent(new Event("collided"))
    }
  }
}

/**
 * Skin animators
 * @param {Number} _zindex
 * @param {GameObject} item
 */
function _skinAnimator(_zindex, item) {
  if (item.proChar === true) {
    if (ANIMATION_VARS.spaceAnimator.status) {
      if (item.isHorizontalCollided) {
        // running state
        item.skinArrayRunIndex = item.skinArrayRunIndex + 0.125;
        item.skinIdleIndex = 0;
        const indx =
          parseInt(item.skinArrayRunIndex) % item.skinArrayRunIndexMax;
        item.skin = item.skinArray.run[indx];
        // I know, I could ve used a simple % opertator! But there is a glitch using that
      } else {
        // jumping state
        item.skinArrayRunIndex = 2; // ensure run from starting frame
        item.skinIdleIndex = 0;
        if (item.yVelocityVector < 0) item.skin = item.skinArray.jump[0];
        else item.skin = item.skinArray.jump[1];
      }
    } else {
      // static (without horizontal velocity)
      item.skinArrayRunIndex = 0; // ensure run from starting frame
      item.skinIdleIndex = item.skinIdleIndex + 0.1
      const indx =
        parseInt(item.skinIdleIndex) % item.skinIdleIndexMax;
      item.skin = item.skinArray.stand[indx];
    }
  }
  else if (item.idleChar === true) {
    item.idleSkinArrayIndex = item.idleSkinArrayIndex + 0.1;
    const indx = parseInt(item.idleSkinArrayIndex) % item.idleSkinArrayIndexMax;
    item.skin = item.idleSkinArray[indx];
  }
}
