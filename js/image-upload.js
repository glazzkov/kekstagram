import { bools } from './util.js';
// DOM-элементы
const body = document.querySelector('body');
const uploadSection = document.querySelector('.img-upload');

const uploadForm = uploadSection.querySelector('#upload-select-image');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

const fileInput = uploadForm.querySelector('#upload-file');
const scaleInput = uploadForm.querySelector('.scale__control--value');

const effectSelectors = uploadForm.querySelector('.effects__list').children;

const overlayCloseButton = uploadForm.querySelector('#upload-cancel');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');


// отображает изображение из инпута в форме и в миниатюрах эффектов
const showUploadedImage = (file) => {
  const reader = new FileReader();
  reader.addEventListener('load', (evt) => {
    imagePreview.src = evt.target.result;
    for (let selector of effectSelectors) {
      const thumbnail = selector.querySelector('.effects__preview');
      thumbnail.style.backgroundImage = `url(${evt.target.result})`;
    }
  });
  reader.readAsDataURL(file);
}

// установка значений по умолчанию в форму
const setDefaultValues = () => {
  scaleInput.value = '100%'
}

// событие загрузки файла, открытие формы
const onFileUpload = (evt) => {
  evt.preventDefault();
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');

  overlayCloseButton.addEventListener('click', onFormClose);
  window.addEventListener('keyup', onFormClose);
  showUploadedImage(fileInput.files[0]);
  setDefaultValues();
}

// событие закрытия формы
const onFormClose = (evt) => {
  evt.preventDefault();
  const isInputInFocus = evt.target.nodeName === 'INPUT' || evt.target.nodeName === 'TEXTAREA';
  const isEsc = bools.isEscKey(evt.key)
  const isClick = evt.type === 'click';
  if ((isEsc || isClick) && !isInputInFocus) {

    body.classList.remove('modal-open');
    uploadOverlay.classList.add('hidden');

    overlayCloseButton.removeEventListener('click', onFormClose);
    window.removeEventListener('keyup', onFormClose);

    fileInput.value = null;
  }
}

// событие кнопок масштабирования
const onScaleButtonsClick = (evt) => {
  evt.preventDefault();
  let coef = 1;
  const STEP = 25;
  const MIN = 25;
  const MAX = 100;
  let currentValue = parseInt(scaleInput.value);
  if (evt.target === scaleSmallerButton) {
    coef = -1;
    if (currentValue <= MIN) {
      return;
    }
  } else if ((evt.target === scaleBiggerButton)) {
    if (currentValue >= MAX) {
      return;
    }
  }
  currentValue = currentValue + (STEP * coef);
  scaleInput.value = `${currentValue}%`

  imagePreview.style.transform = `scale(${currentValue/100})`;

}

// инициализация формы
export const initUpload = () => {
  fileInput.addEventListener('input', onFileUpload);
  scaleSmallerButton.addEventListener('click', onScaleButtonsClick);
  scaleBiggerButton.addEventListener('click', onScaleButtonsClick);
}

// удалить после реализации функционала
// uploadOverlay.classList.remove('hidden');
// setDefaultValues();
