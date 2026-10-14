export const assetStore = {
  img: {
    idleBg: null,
    storyFrames: null,

    // Object<String, Array<HTMLImageElement>>
    bg: null,
    platform: null,
    direction: null,

    // obstacles
    baricade: null,
    media: null,
    uncles: null,
    rss: null,
    rssKalip: null,
    police: null,
    chair: null,
    ballot: null,

    heroRun: null,
    heroJump: null,
    heroStand: null,
    leftieRun: null,
    leftieJump: null,
    leftieStand: null,
    cockroachRun: null,
    cockroachJump: null,
    cockroachStand: null,
    mnaRun: null,
    mnaStand: null,
    utils: null,
  },
  audio: {
    // Object<String, ArrayBuffer>
    shutter: null,
    // filmNoise: null,
    start: null,
    jump: null,
    gameOver: null,
    tada: null,
    footStep: null,
    police: null,
    knockChair: null,
    appear: null,
    glitch: null,
    happyAppear: null,
    muteScream: null,
    RSSStart: null,
    accepter: null,
  },
};

export const assetStatus = {
  events: new EventTarget(),
  totalAssets: 0,
  loadedAssets: 0,
}

const imgAssetSrc = {
  idleBg: [
    new URL("../../assets/imgs/bg_.png", import.meta.url),
  ],
  storyFrames: [
    new URL("../../assets/imgs/story1.png", import.meta.url),
    new URL("../../assets/imgs/story2.png", import.meta.url),
    new URL("../../assets/imgs/story3.png", import.meta.url),
    new URL("../../assets/imgs/story4.png", import.meta.url),
    new URL("../../assets/imgs/story5.png", import.meta.url),
    new URL("../../assets/imgs/story6.png", import.meta.url),
  ],
  bg: [
    new URL("../../assets/imgs/bg0.png", import.meta.url),
    new URL("../../assets/imgs/bg1.png", import.meta.url),
    new URL("../../assets/imgs/bg2.png", import.meta.url),
  ],
  platform: [
    new URL("../../assets/imgs/platform.png", import.meta.url),
  ],
  direction: [
    new URL("../../assets/imgs/direction.png", import.meta.url),
  ],

  // obstacles
  baricade: [
    new URL("../../assets/imgs/baricade.png", import.meta.url),
  ],
  media: [
    new URL("../../assets/imgs/media-1.png", import.meta.url),
    new URL("../../assets/imgs/media-2.png", import.meta.url),
  ],
  uncles: [
    new URL("../../assets/imgs/uncles-1.png", import.meta.url),
    new URL("../../assets/imgs/uncles-2.png", import.meta.url),
  ],
  rss: [
    new URL("../../assets/imgs/rss-1.png", import.meta.url),
    new URL("../../assets/imgs/rss-2.png", import.meta.url),
  ],
  rssKalip: [
    new URL("../../assets/imgs/rss-kalipp-1.png", import.meta.url),
    new URL("../../assets/imgs/rss-kalipp-2.png", import.meta.url),
  ],
  police: [
    new URL("../../assets/imgs/police-1.png", import.meta.url),
    new URL("../../assets/imgs/police-2.png", import.meta.url),
  ],
  chair: [
    new URL("../../assets/imgs/chair.png", import.meta.url),
  ],
  ballot: [
    new URL("../../assets/imgs/ballot-1.png", import.meta.url),
    new URL("../../assets/imgs/ballot-2.png", import.meta.url),
  ],

  // characters
  heroRun: [
    new URL("../../assets/imgs/bora-run-1.png", import.meta.url),
    new URL("../../assets/imgs/bora-run-2.png", import.meta.url),
    new URL("../../assets/imgs/bora-run-3.png", import.meta.url),
    new URL("../../assets/imgs/bora-run-2.png", import.meta.url),
  ],
  heroJump: [
    new URL("../../assets/imgs/bora-jump-1.png", import.meta.url),
    new URL("../../assets/imgs/bora-run-1.png", import.meta.url),
    // new URL("../../assets/imgs/bora-jump-2.png", import.meta.url),
  ],
  heroStand: [
    new URL("../../assets/imgs/bora-idle-1.png", import.meta.url),
    new URL("../../assets/imgs/bora-idle-2.png", import.meta.url),
  ],
  leftieRun: [
    new URL("../../assets/imgs/leftie-run-1.png", import.meta.url),
    new URL("../../assets/imgs/leftie-run-2.png", import.meta.url),
    new URL("../../assets/imgs/leftie-run-3.png", import.meta.url),
    new URL("../../assets/imgs/leftie-run-2.png", import.meta.url),
  ],
  leftieJump: [
    new URL("../../assets/imgs/leftie-jump-1.png", import.meta.url),
    new URL("../../assets/imgs/leftie-run-1.png", import.meta.url),
    // new URL("../../assets/imgs/bora-jump-2.png", import.meta.url),
  ],
  leftieStand: [
    new URL("../../assets/imgs/leftie-idle-1.png", import.meta.url),
    new URL("../../assets/imgs/leftie-idle-2.png", import.meta.url),
  ],
  cockroachRun: [
    new URL("../../assets/imgs/cockroch-run-1.png", import.meta.url),
    new URL("../../assets/imgs/cockroch-run-2.png", import.meta.url),
    new URL("../../assets/imgs/cockroch-run-3.png", import.meta.url),
    new URL("../../assets/imgs/cockroch-run-2.png", import.meta.url),
  ],
  cockroachJump: [
    new URL("../../assets/imgs/cockroch-jump-1.png", import.meta.url),
    new URL("../../assets/imgs/cockroch-run-1.png", import.meta.url),
    // new URL("../../assets/imgs/bora-jump-2.png", import.meta.url),
  ],
  cockroachStand: [
    new URL("../../assets/imgs/cockroch-idle-1.png", import.meta.url),
    new URL("../../assets/imgs/cockroch-idle-2.png", import.meta.url),
  ],
  mnaRun: [
    new URL("../../assets/imgs/mna-run-1.png", import.meta.url),
    new URL("../../assets/imgs/mna-run-2.png", import.meta.url),
    new URL("../../assets/imgs/mna-run-3.png", import.meta.url),
    new URL("../../assets/imgs/mna-run-2.png", import.meta.url),
  ],
  mnaStand: [
    new URL("../../assets/imgs/mna-idle-1.png", import.meta.url),
    new URL("../../assets/imgs/mna-idle-2.png", import.meta.url),
  ],
  utils: [
    new URL("../../assets/imgs/headphone.png", import.meta.url),
  ]
};

const audioAssetSrc = {
  // filmNoise: new URL("../../assets/audio/noise.mp3", import.meta.url),
  shutter: new URL("../../assets/audio/shutter.wav", import.meta.url),

  start: new URL("../../assets/audio/start.mp3", import.meta.url),
  jump: new URL("../../assets/audio/jump.mp3", import.meta.url),
  gameOver: new URL("../../assets/audio/game-over.mp3", import.meta.url),
  tada: new URL("../../assets/audio/tada.mp3", import.meta.url),

  bgMain: new URL("../../assets/audio/bg-loop.mp3", import.meta.url),
  // bgNoise: new URL("../../assets/audio/noise-loop.mp3", import.meta.url),

  footStep: new URL("../../assets/audio/foot-steps.mp3", import.meta.url),
  police: new URL("../../assets/audio/police-start.mp3", import.meta.url),
  knockChair: new URL("../../assets/audio/knock-chair.mp3", import.meta.url),
  appear: new URL("../../assets/audio/appear.mp3", import.meta.url),
  glitch: new URL("../../assets/audio/glitch.mp3", import.meta.url),
  happyAppear: new URL("../../assets/audio/happy-appear.mp3", import.meta.url),
  muteScream: new URL("../../assets/audio/mute-scream.mp3", import.meta.url),
  RSSStart: new URL("../../assets/audio/RSS-start.mp3", import.meta.url),
  accepter: new URL("../../assets/audio/accepter.mp3", import.meta.url),
  bgNew: new URL("../../assets/audio/bg-new.mp3", import.meta.url),
};

/**
 * Load all image assets
 * @returns {Promise} - resolves on loading all assets into mem
 */
export function loadImgAssets() {
  return new Promise((resolve, reject) => {
    let assetCounter = 0;
    for (const item in imgAssetSrc) {
      assetCounter += imgAssetSrc[item].length;
    }
    assetStatus.totalAssets += assetCounter;
    console.debug(`[assetstore][img] loading ${assetCounter} items!`);

    const setupImg = (srcInfo) => {
      const item = new Image();
      item.onload = () => {
        assetStatus.loadedAssets++;
        assetStatus.events.dispatchEvent(new Event("progress"));
        assetCounter--;
        console.debug(
          `[assetstore][img][bal:${assetCounter}] item loaded :`,
          srcInfo.href,
        );
        if (assetCounter == 0) return resolve();
      };
      item.onerror = (err) => {
        console.error("[assetstore][img] error loading item : ", err);
        return reject(err);
      };
      item.src = srcInfo;
      return item;
    };
    for (const category in imgAssetSrc) {
      assetStore.img[category] = [];
      for (const srcInfo of imgAssetSrc[category]) {
        assetStore.img[category].push(setupImg(srcInfo));
      }
    }
  });
}

/**
 * Load all audio assets
 * @returns {Promise} - resolves on loading all sources
 */
export function loadAudioAssets() {
  const load = (url, key) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((resp) => resp.arrayBuffer())
        .then((buffer) => {
          assetStore.audio[key] = buffer;
          console.debug(`[assetStore][audio] loaded audio :`, url.href);
          assetStatus.loadedAssets++;
          assetStatus.events.dispatchEvent(new Event("progress"));
          resolve();
        })
        .catch((err) => {
          console.error(`[assetStore][audio] error loading audio :`, err);
          assetStatus.events.dispatchEvent(new Event("loadError"));
          reject(err);
        });
    });
  };
  const promises = [];
  for (const key in audioAssetSrc) {
    promises.push(load(audioAssetSrc[key], key));
  }
  assetStatus.totalAssets += promises.length;
  return Promise.all(promises);
}

/**
* Load all assets
*/
export async function loadAllAssets() {
  await Promise.all([loadImgAssets(), loadAudioAssets()]);
  assetStatus.events.dispatchEvent(new Event("load"));
}
