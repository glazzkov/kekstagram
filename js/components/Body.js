// главный класс приложения
export class Body extends HTMLBodyElement {
  get $galery() { return this._$galery; }

  constructor() {
    super();
    this.setAttribute('is', 'app-body');
    this._$galery = document.querySelector('.pictures');
  }

}

