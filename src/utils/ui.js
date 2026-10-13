import { assetStatus } from "./asset-man.js"

document.querySelector(".start-over-btn")?.addEventListener("click", () => {
  self.localStorage.removeItem("day");
  window.location.reload();
})

class Modal {
  constructor() {
    this.modal = document.querySelector("dialog");
    this.header = document.querySelector(".modal-head");
    this.body = document.querySelector(".modal-body");
    this.btn1 = document.querySelector(".modal-btn0");
    this.btn2 = document.querySelector(".modal-btn1");

    this._btn1Callback = async () => { }
    this._btn2Callback = async () => { }
    this._utilCallback = () => { }

    [
      [this.btn1, "_btn1Callback"],
      [this.btn2, "_btn2Callback"]
    ].forEach((el) => {
       el[0].addEventListener("click", async () => {
         try {
            el[0].disabled = true;
            await this[el[1]]();
            this.modal.close();
            return this._utilCallback(false);
         } catch (e) {
            return this._utilCallback(e);
         } finally {
            el[0].disabled = false;
         }
       })
    });

    // prevent modal escape
    this.modal.addEventListener('cancel', (event) => {
      if (event.key === 'Escape' && preventClosing) {
          event.preventDefault();
      }
    });
    self.window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.modal.open) {
        event.preventDefault();
      }
    });
  }

  show(header, body, btn1, btn1Callback, btn2, btn2Callback) {
    this.modal.close();
    this.header.innerHTML = header || "";
    this.body.innerHTML = body || "Seems something is off :)";
    this._btn1Callback = btn1Callback || (async () => { })
    this._btn2Callback = btn2Callback || (async () => { })
    this.btn1.classList.add("d-none")
    this.btn2.classList.add("d-none")
    if (btn1) {
      this.btn1.innerText = btn1;
      this.btn1.classList.remove("d-none");
    }
    if (btn2) {
      this.btn2.innerText = btn2;
      this.btn2.classList.remove("d-none");
    }
    return new Promise(resolve => {
      this._utilCallback = resolve;
      this.modal.show();
    })
  }

  close() {
    this.modal.close();
  }
}



class MicBar {
  constructor() {
    this.el = document.querySelector(".mic-bar");
    this.threshold = 0.6;
  }
  show() { this.el.classList.remove("d-none"); }
  hide() { this.el.classList.add("d-none"); }

  setThreshold(threshold) {
    this.threshold = threshold;
    this.el.style.setProperty("--threshold", threshold);
  }

  update(level, isLoud) {
    this.el.style.setProperty("--level", level.toFixed(3));
    this.el.classList.toggle("is-loud", isLoud);
  }
}
export const micBar = new MicBar();
export const modal = new Modal();

export function showAssetLoadModal() {
  const progresBar = document.querySelector(".modal-progress")
  const loadingProgresBar = document.querySelector(".loading-progress-bar");

  progresBar.classList.remove("d-none")
  modal.show(
    "Loading..",
    "Preparing your browser for survival."
  )
  assetStatus.events.addEventListener("load", () => {
    progresBar.classList.add("d-none")
  })
  assetStatus.events.addEventListener("loadError", () => {
    progresBar.innerHTML = `
      <strong style="color: red; font-size: 0.9rem;">
        Oops! something went wrong loading the assets..
        <br>Please try again later!
        <br><small>( Chances for govt take down != 0 )</small>
      </strong>`
  })
  assetStatus.events.addEventListener("progress", () => {
    loadingProgresBar.style.width = `${(assetStatus.loadedAssets / assetStatus.totalAssets) * 100}%`
  })
}
