import { Thumbnail } from './Thumbnail.js';
import { Api } from './Api.js';
// класс галереи на главной
export class Galery extends HTMLElement {

  get $viewer() {return this._$viewer}

  constructor() {
    super();
    this.setAttribute('is', 'app-galery');

    this._$viewer = document.querySelector('.big-picture');

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
      const thumbnailsData = await Api.getPicturesData()
      const thumbnailsFragment = document.createDocumentFragment();
      thumbnailsData.forEach((thumbnailData) => {
        const thumbnail = new Thumbnail(thumbnailData);
        thumbnailsFragment.appendChild(thumbnail);
      });
      this.appendChild(thumbnailsFragment);
    }
  }
}


