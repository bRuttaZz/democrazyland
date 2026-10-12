export const assetStore = {
  img: {
    // Object<String, Array<HTMLImageElement>>
    bg: null,
    platform: null,
    heroRun: null,
    heroJump: null,
    heroStand: null,
  },
  audio: {
    // Object<String, ArrayBuffer>
    start: null,
    jump: null,
    gameOver: null,
    tada: null
  },
};

export const assetStatus = {
  events: new EventTarget(),
  totalAssets: 0,
  loadedAssets: 0,
}

const imgAssetSrc = {
  bg: [
    new URL("../../assets/imgs/bg0.png", import.meta.url),
    new URL("../../assets/imgs/bg1.png", import.meta.url),
    new URL("../../assets/imgs/bg2.png", import.meta.url),
  ],
  platform: [
    new URL("../../assets/imgs/platform.png", import.meta.url),
  ],

  heroRun: [
    new URL("../../assets/imgs/hero-run-0.png", import.meta.url),
    new URL("../../assets/imgs/hero-run-1.png", import.meta.url),
    new URL("../../assets/imgs/hero-run-2.png", import.meta.url),
    new URL("../../assets/imgs/hero-run-1.png", import.meta.url),
  ],
  heroJump: [
    new URL("../../assets/imgs/hero-run-1.png", import.meta.url),
    new URL("../../assets/imgs/hero-run-2.png", import.meta.url),
  ],
  heroStand: [
    new URL("../../assets/imgs/hero-run-0.png", import.meta.url),
    new URL("../../assets/imgs/hero-run-1.png", import.meta.url),
  ],


};

const audioAssetSrc = {
  start: new URL("../../assets/audio/start.mp3", import.meta.url),
  jump: new URL("../../assets/audio/jump.mp3", import.meta.url),
  gameOver: new URL("../../assets/audio/game-over.mp3", import.meta.url),
  tada: new URL("../../assets/audio/tada.mp3", import.meta.url),

  bgMain: new URL("../../assets/audio/bg-loop.mp3", import.meta.url),
  bgNoise: new URL("../../assets/audio/noise-loop.mp3", import.meta.url),

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
