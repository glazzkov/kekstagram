import { Thumbnail } from './Thumbnail.js';
import { ErrorMessage } from './ErrorMessage.js';
import { Api } from './Api.js';
// класс галереи на главной
export class Galery extends HTMLElement {

  get $viewer() { return this._$viewer }
  get $errorMessage() { return this._$errorMessage }

  constructor() {
    super();
    this.setAttribute('is', 'app-galery');

    this._$viewer = document.querySelector('.big-picture');
    this._$errorMessage = new ErrorMessage(this.render);


    this.$errorMessage.errorTitle = 'Не удалось загрузить данные с сервера';
    this.$errorMessage.errorButtonText = 'Попробовать снова';
    document.$appBody.appendChild(this.$errorMessage);

    this.addEventListener('click', (evt) => {
      const thumbnail = evt.target.parentNode;
      if (thumbnail.classList.contains('picture')) {
        evt.preventDefault();
        this.$viewer.value = thumbnail;
        this.$viewer.show();
      }
    });
    this.render();
  }

  get render() {
    return async () => {
      const thumbnailsFragment = document.createDocumentFragment();
      let thumbnailsData = [];
      try {
        thumbnailsData = await Api.getPicturesData()
      } catch (error) {
        this.$errorMessage.show();
        return;
      }
      thumbnailsData.forEach((thumbnailData) => {
        const thumbnail = new Thumbnail(thumbnailData);
        thumbnailsFragment.appendChild(thumbnail);
      });
      this.appendChild(thumbnailsFragment);
      this.$errorMessage.hide();
    }
  }
}


