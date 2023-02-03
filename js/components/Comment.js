// класс элемента комментария при просмотре изображения
export class Comment extends HTMLLIElement{
  get $avatar() { return this._$avatar; }
  get $text() { return this._$text; }

  constructor(options) {
    super();
    this.setAttribute('is', 'app-comment');

    const $template = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true).innerHTML;
    this.insertAdjacentHTML('afterbegin', $template);
    this.classList.add('social__comment');

    this._$avatar = this.querySelector('.social__picture');
    this._$text = this.querySelector('.social__text');

    this._commentId = options.id;

    this.avatar = options.avatar;
    this.text = options.message;
    this.name = options.name;
  }

  get commentId() { return this._commentId; }

  get avatar() { return this.$avatar.src; }
  set avatar(value) { this.$avatar.src = value; }

  get name() { return this.$avatar.alt; }
  set name(value) { this.$avatar.alt = value; }

  get text() { return this.$text.textContent; }
  set text(value) { this.$text.textContent = value; }
}

