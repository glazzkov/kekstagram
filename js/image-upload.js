import { DOM, addCloseEvent } from './util.js';
// DOM-элементы для управления загрузкой нового изображения
const body = DOM.body;
const uploadSection = DOM.uploadSection;
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
  reader.readAsDataURL(file);
  reader.addEventListener('load', (evt) => {
    imagePreview.src = evt.target.result;
    for (let selector of effectSelectors) {
      const thumbnail = selector.querySelector('.effects__preview');
      thumbnail.style.backgroundImage = `url(${evt.target.result})`;
    }
  });
}

// установка значений по умолчанию в форму
const setDefaultValues = () => {
  scaleInput.value = '100%'
}

// добавляет обработчик события загрузки файла, открытия формы
const addUploadEvent = () => {
  fileInput.addEventListener('input', (evt) => {
    evt.preventDefault();
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    showUploadedImage(fileInput.files[0]);
    setDefaultValues();
  });
}

// обработчик нажатий кнопок масштабирования
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
  setDefaultValues();
  addUploadEvent();
  addCloseEvent(uploadOverlay, overlayCloseButton);
  scaleSmallerButton.addEventListener('click', onScaleButtonsClick);
  scaleBiggerButton.addEventListener('click', onScaleButtonsClick);
}
