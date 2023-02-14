export class ErrorMessage extends HTMLElement{
  get $errorTitle() {return this._$errorTitle}
  get $errorButton() {return this._$errorButton}

  constructor(callback) {
    super();
    this.setAttribute('is', 'app-error-message');
    this.classList.add('error');
    this.classList.add('hidden');
    const $template = document.querySelector('#error').content.querySelector('.error__inner').cloneNode(true);
    this.appendChild($template);

    this._$errorTitle = this.querySelector('.error__title');
    this._$errorButton = this.querySelector('.error__button');

    if (callback) {
      this.$errorButton.addEventListener('click', callback);
    } else {
      this.$errorButton.addEventListener('click', this.hide);
    }

  }

  get errorTitle() { return this.$errorTitle.textContent }
  set errorTitle(value) { this.$errorTitle.textContent = value }

  get errorButtonText(){ return this.$errorButton.textContent}
  set errorButtonText(value){ this.$errorButton.textContent = value}

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

