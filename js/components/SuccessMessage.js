export class SuccessMessage extends HTMLElement{

  get $successTitle() { return this._$successTitle; }
  get $successButton() { return this._$successButton; }

  constructor() {
    super();
    this.setAttribute('is', 'app-success-message');
    this.classList.add('success');
    this.classList.add('hidden');
    const $template = document.querySelector('#success').content.querySelector('.success__inner').cloneNode(true);
    this.appendChild($template);

    this._$successTitle = this.querySelector('.success__title');
    this._$successButton = this.querySelector('.success__button');

    this.$successButton.addEventListener('click', this.hide);
  }

  get show() {
    return () => {
      this.classList.remove('hidden');
    }
  }

  get hide() {
    return () => {
      this.classList.add('hidden');
    }
  }
}
