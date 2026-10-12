class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.header = document.querySelector(".modal-head");
    this.body = document.querySelector(".modal-body");
    this.btn1 = document.querySelector(".modal-btn0");
    this.btn2 = document.querySelector(".modal-btn1");

    this._btn1Callback = async () => { }
    this._btn2Callback = async () => { }
    this._utilCallback = () => { }

    this.btn1.addEventListener("click", async () => {
      await this._btn1Callback();
      this.modal.close();
      this._utilCallback();
    })
    this.btn2.addEventListener("click", async () => {
      await this._btn2Callback();
      this.modal.close();
      this._utilCallback();
    })
  }

  show(header, body, btn1, btn1Callback, btn2, btn2Callback) {
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
      this.modal.showModal();
    })
  }

  close() {
    this.modal.close();
  }
}

export const modal = new Modal();
