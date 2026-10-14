import { assetStatus } from "./asset-man.js"

document.querySelector(".start-over-btn")?.addEventListener("click", () => {
  self.localStorage.removeItem("day");
  window.location.reload();
})

document.querySelector(".cast-btn")?.addEventListener("click", () => {
  const html = document.querySelector(".cast-section");
  modal.show("Characters.", html.innerHTML, "Close", null, null, null, true, true);
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

    this._snapshot = false;
    this._fullModal = false;
    this._previousStatus = null;

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
           this._utilCallback = () => { }
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

  _showBase(header, body, btn1, btn1Callback, btn2, btn2Callback, fullModal) {
    this.modal.close();
    this.header.innerHTML = header || "";
    this.body.innerHTML = body || "Seems something is off :)";
    this._btn1Callback = btn1Callback || (async () => { })
    this._btn2Callback = btn2Callback || (async () => { })
    this.btn1.classList.add("d-none")
    this.btn2.classList.add("d-none")
    this._fullModal = fullModal

    if (btn1) {
      this.btn1.innerText = btn1;
      this.btn1.classList.remove("d-none");
    }
    if (btn2) {
      this.btn2.innerText = btn2;
      this.btn2.classList.remove("d-none");
    }
  }

  async _show() {
    this.modal.classList.remove("big-dialog")
    if (this._fullModal) {
      this.modal.classList.add("big-dialog")
      return this.modal.showModal();
    }
    return this.modal.show();
  }

  async _callWithSnapshot(callback) {
    const state = this.modal.open ? {
      header: this.header.innerHTML,
      body: this.body.innerHTML,
      _btn1Callback: this._btn1Callback,
      _btn2Callback: this._btn2Callback,
      btn1: this.btn1.innerText,
      btn2: this.btn2.innerText,
      _utilCallback: this._utilCallback,
      fullModal: this._fullModal,
      snapshot: this._snapshot,
      _previousStatus: this._previousStatus,
    } : null
    this._previousStatus = state;
    try {
      return await callback()
    } finally {
      if (this._previousStatus) {
        this.header.innerHTML = this._previousStatus.header;
        this.body.innerHTML = this._previousStatus.body;
        this._btn1Callback = this._previousStatus._btn1Callback;
        this._btn2Callback = this._previousStatus._btn2Callback;
        this.btn1.innerText = this._previousStatus.btn1;
        this.btn2.innerText = this._previousStatus.btn2;
        this._utilCallback = this._previousStatus._utilCallback;
        this._snapshot = this._previousStatus.snapshot;
        this._fullModal = this._previousStatus.fullModal;
        this._previousStatus = this._previousStatus._previousStatus;

        this._show();
      }
    }
  }

  async show(header, body, btn1, btn1Callback, btn2, btn2Callback, fullModal, snapshot) {
    this._snapshot = snapshot
    const action = () => {
      this._showBase(header, body, btn1, btn1Callback, btn2, btn2Callback, fullModal);
      return new Promise(resolve => {
        this._utilCallback = resolve;
        this._show();
      })
    }
    if (this._snapshot) return await this._callWithSnapshot(action)
    return await action()
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
