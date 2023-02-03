import { Comment } from './Comment.js';
import { Util } from './util.js';

// класс управления полноэкранным просмотром изображения
export class PictureViewer extends HTMLElement {
  get $commentsList() { return this._$commentsList; }
  get $img() { return this._$img; }
  get $description() { return this._$description; }
  get $likesCount() { return this._$likesCount; }
  get $commentsCount() { return this._$commentsCount; }
  get $commentsCounter() { return this._$commentsCounter; }
  get $commentsLoader() { return this._$commentsLoader; }
  get $closeButton() { return this._$closeButton; }

  constructor() {
    super();
    this.setAttribute('is', 'app-picture-viewer');
    this._$commentsList = this.querySelector('.social__comments');
    this._$img = this.querySelector('.big-picture__img img');
    this._$description = this.querySelector('.social__caption');
    this._$likesCount = this.querySelector('.likes-count');
    this._$commentsCount = this.querySelector('.comments-count');
    this._$commentsCounter = this.querySelector('.social__comment-count');
    this._$commentsLoader = this.querySelector('.comments-loader');
    this._$closeButton = this.querySelector('#picture-cancel');

    this.$commentsCounter.classList.add('hidden');
    this.$commentsLoader.classList.add('hidden');

    Util.addCloseEventHandler(this.$closeButton, this.hide);
  }

  get show() {
    return () => {
      document.$appBody.classList.add('modal-open');
      this.classList.remove('hidden');
    }
  }

  get hide() {
    return () => {
      document.$appBody.classList.remove('modal-open');
      this.classList.add('hidden');
    }
  }

  get renderComments() {
    return (commentsDataArray, isAddional) => {
      const commentsFragment = document.createDocumentFragment();
      commentsDataArray.forEach((data) => {
        const comment = new Comment(data);
        commentsFragment.appendChild(comment);
      });
      if (!isAddional) {
        this.$commentsList.innerHTML = '';
      }
      this.$commentsList.appendChild(commentsFragment);
    }
  }

  get value() { return this._value; }
  set value(value) {
    this.$img.src = value.url;
    this.$description.textContent = value.description;
    this.$likesCount.textContent = value.likesCount;
    this.$commentsCount.textContent = value.commentsCount;
    this.renderComments(value.commentsArray, false);
    this._value = value;
  }

  get commentsList() { return this.$commentsList.children; }
}
