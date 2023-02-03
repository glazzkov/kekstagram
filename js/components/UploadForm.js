/* global noUiSlider:readonly */
import { Util } from './Util.js';

// класс управления формой отправки фото на сервер
export class UploadForm extends HTMLElement {
  get $form() { return this._$form; }
  get $overlay() { return this._$overlay; }
  get $preview() { return this._$preview; }
  get $fileInput() { return this._$fileInput; }
  get $hashtagsInput() { return this._$hashtagsInput; }
  get $descriptionInput() { return this._$descriptionInput; }
  get $scaleInput() { return this._$scaleInput; }
  get $effectsRadios() { return this._$effectsRadios; }
  get $effectsPreviews() { return this._$effectsPreviews; }
  get $closeButton() { return this._$closeButton; }
  get $scaleBigger() { return this._$scaleBigger; }
  get $scaleSmaller() { return this._$scaleSmaller; }
  get $effectLevel() { return this._$effectLevel; }
  get $effectLevelValue() { return this._$effectLevelValue; }
  get $effectLevelSlider() { return this._$effectLevelSlider; }

  constructor() {
    super();
    this.setAttribute('is', 'app-form');
    // DOM-элементы

    this._$form = this.querySelector('#upload-select-image');
    this._$overlay = this.querySelector('.img-upload__overlay');
    this._$preview = this.querySelector('.img-upload__preview img');
    this._$fileInput = this.querySelector('#upload-file');
    this._$hashtagsInput = this.querySelector('.text__hashtags');
    this._$descriptionInput = this.querySelector('.text__description');
    this._$scaleInput = this.querySelector('.scale__control--value');
    this._$effectsRadios = this.querySelectorAll('.effects__radio');
    this._$effectsPreviews = this.querySelectorAll('.effects__preview');
    this._$closeButton = this.querySelector('#upload-cancel');
    this._$scaleBigger = this.querySelector('.scale__control--bigger');
    this._$scaleSmaller = this.querySelector('.scale__control--smaller');
    this._$effectLevel = this.querySelector('.effect-level');
    this._$effectLevelValue = this.querySelector('.effect-level__value');
    this._$effectLevelSlider = this.querySelector('.effect-level__slider');

    Util.addCloseEventHandler(this.$closeButton, this.hide);

    this.createSlider();
    this.setDefaultValues(true);

    // обработчики событий
    this.$fileInput.addEventListener('input', (evt) => {
      evt.preventDefault();
      const reader = new FileReader();
      reader.readAsDataURL(this.$fileInput.files[0]);
      reader.addEventListener('load', (evt) => {
        this.imageUrl = evt.target.result;
        for (let preview of this.$effectsPreviews) {
          preview.style.backgroundImage = `url(${evt.target.result})`;
        }
      });
      this.show();
    });

    for (let radio of this.$effectsRadios) {
      radio.addEventListener('input', (evt) => {
        evt.preventDefault();
        this.effect = radio.value;
      });
    }

    this.$form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.$form.addEventListener('input', (evt) => {
      evt.preventDefault();
      this.validateHashtags();
    });

    this.$scaleSmaller.addEventListener('click', () => {
      this.scale = `${parseInt(this.scale) - 25}%`;
    });

    this.$scaleBigger.addEventListener('click', () => {
      this.scale = `${parseInt(this.scale) + 25}%`;
    });

    this.$effectLevelSlider.noUiSlider.on('update', (___, handle, unencoded)=> {
      this.effectLevel = unencoded[handle];
    });
  }

  // добавляет слайдер в форму
  get createSlider() {
    return () => {
      noUiSlider.create(this.$effectLevelSlider, {
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 0,
        connect: 'lower',
      });
    }
  }

  // показ/скрытие слайдера
  get showSlider() { return () => this.$effectLevel.classList.remove('hidden');  }
  get hideSlider() { return () => this.$effectLevel.classList.add('hidden');  }

  // показ формы
  get show() {
    return () => {
      document.$appBody.classList.add('modal-open');
      this.$overlay.classList.remove('hidden');
    }
  }

  // скрытие формы
  get hide() {
    return () => {
      document.$appBody.classList.remove('modal-open');
      this.$overlay.classList.add('hidden');
      this.setDefaultValues(true);
    }
  }

  // сброс формы к значениям по умолчанию
  get setDefaultValues() {
    return (removeFile) => {
      if (removeFile){
        this.fileInputValue = null;
      }
      this.hashtags = '';
      this.description = '';
      this.effect = 'none';
      this.scale = '100%';
      this.hideSlider();
    }
  }

  // валидация поля ввода хештегов
  get validateHashtags() {
    return () => {
      this.hashtags = this.hashtags.replace(/[ ]{1,}/g, ' ');
      let value = this.hashtags.trim();
      let tags = value.split(/[ ]{1,}/);
      this.$hashtagsInput.setCustomValidity('');
      const message = 'Проверьте корректность введенных хештегов: \n - Длина тега должна быть не менее 1 символа, не считая #, и не более 20 символов вместе с #.\n - Хэштег должен начинаться с #, может состоять из букв латинского и русского алфавитов и цифр.\n - Максимальное допустимое количество тегов - 5.\n - Нельзя использовать один тег более 2-х раз. Регистр не учитывается.\n - Теги разделяются пробелами.';

      if (tags.length > 5) {
        this.$hashtagsInput.setCustomValidity(message);
        return;
      }
      for (let tag of tags) {
        if (!Util.isStringHashtag(tag)) {
          this.$hashtagsInput.setCustomValidity(message);
          return;
        }
      }
      this.$hashtagsInput.reportValidity();
    }
  }

  // геттеры и сеттеры значений формы
  get imageUrl() { return this.$preview.src }
  set imageUrl(value){ this.$preview.src = value}

  get fileInputValue() { return this.$fileInput.value; }
  set fileInputValue(value) { this.$fileInput.value = value; }

  get hashtags() { return this.$hashtagsInput.value; }
  set hashtags(value) { this.$hashtagsInput.value = value; }

  get description() { return this.$descriptionInput.value}
  set description(value) { this.$descriptionInput.value = value }

  get effect() {
    for (let radio of this.$effectsRadios) {
      if (radio.checked) { return radio.value; }
    }
    return 'none';
  }
  set effect(value) {
    for (let radio of this.$effectsRadios) {
      this.showSlider();
      if (radio.value === value) {
        radio.checked = true
      }

      let min = 0;
      let max = 1;
      let step = 0.1;

      switch (value) {
        case 'marvin':
          max = 100;
          step = 1;
          break;

        case 'phobos':
          max = 3;
          break;

        case 'heat':
          min = 1;
          max = 3;
          break;

        case 'sepia':
        case 'chrome':
          break;

        case 'none':
        default:
          this.hideSlider();
          break;
      }

      this.$effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        step: step,
      });
      this.$effectLevelSlider.noUiSlider.set(min);
    }
  }

  get effectLevel() { return this.$effectLevelValue.value }
  set effectLevel(value) {
    this.$effectLevelValue.value = value
    const effectClass = `effects__preview--${this.effect}`;
    this.$preview.classList = [effectClass];
    switch (this.effect) {
      case 'chrome':
        this.$preview.style.filter = `grayscale(${value})`;
        break;

      case 'sepia':
        this.$preview.style.filter = `sepia(${value})`;
        break;

      case 'marvin':
        this.$preview.style.filter = `invert(${value}%)`;
        break;

      case 'phobos':
        this.$preview.style.filter = `blur(${value}px)`;
        break;

      case 'heat':
        this.$preview.style.filter = `brightness(${value})`;
        break;

      case 'none':
      default:
        this.$preview.style.filter = '';
        this.hideSlider()
        break;
    }
  }

  get scale() { return this.$scaleInput.value }
  set scale(value) {
    value = parseInt(value);
    const MIN = 25;
    const MAX = 100;
    if (value >= MIN && value <= MAX) {
      this.$scaleInput.value = `${value}%`
      this.$preview.style.transform = `scale(${value / 100})`;
    }
  }
}

