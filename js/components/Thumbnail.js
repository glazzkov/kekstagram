// класс, определяющий миниатюры фото на главной
export class Thumbnail extends HTMLAnchorElement{
  get $img() { return this._$img}
  get $comments() { return this._$comments}
  get $likes() { return this._$likes}

  constructor(options) {
    super();
    this.setAttribute('is', 'app-thumbnail');

    const $template = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true).innerHTML;
    this.insertAdjacentHTML('afterbegin', $template);
    this.classList.add('picture');

    this._$img = this.querySelector('.picture__img');
    this._$comments = this.querySelector('.picture__comments');
    this._$likes = this.querySelector('.picture__likes');

    this._commentsArray = options.comments;
    this._pictureId = options.id;
    this._description = options.description;

    this.url = options.url;
    this.commentsCount = this.commentsArray.length;
    this.likesCount = options.likes;
  }

  get commentsArray() { return this._commentsArray; }
  get pictureId() { return this._pictureId; }
  get description() { return this._description; }

  get url() { return this.$img.src; }
  set url(value) { this.$img.src = value;}

  get commentsCount() { return this.$comments.textContent; }
  set commentsCount(value) { this.$comments.textContent = value; }

  get likesCount() { return this.$likes.textContent }
  set likesCount(value) { this.$likes.textContent = value; }

}
