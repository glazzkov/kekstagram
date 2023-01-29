import { DOM, addCloseEvent } from './util.js';
import { setDefaultEffects } from './effects.js'
import { postNewPicture } from './api.js';
import { createSuccessPopup } from './components.js';
// DOM-элементы для управления загрузкой нового изображения
const body = DOM.body;
const uploadSection = DOM.uploadSection;
const uploadForm = uploadSection.querySelector('#upload-select-image');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const fileInput = uploadForm.querySelector('#upload-file');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const effectSelectors = uploadForm.querySelector('.effects__list').children;
const overlayCloseButton = uploadForm.querySelector('#upload-cancel');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const resultMessageField = uploadForm.querySelector('.img-upload__result-message');

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

// показ сообщения об ошибке
const showError = () => {
  resultMessageField.classList.remove('hidden');
  resultMessageField.textContent = 'Ошибка отправки данных. Повторите попытку.';
}

// скрытие сообщения об ошибке
const hideMessage = () => {
  resultMessageField.classList.add('hidden');
  resultMessageField.textContent = '';
}


// установка значений по умолчанию в форму
const setDefaultValues = () => {
  setDefaultEffects();
  hideMessage();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  fileInput.value = '';
  imagePreview.src = '';
  imagePreview.style.transform = '';
  scaleInput.value = '100%';
  hashtagsInput.value = '';
  descriptionInput.value = '';
}

// добавляет обработчик события загрузки файла, открытия формы
const addUploadEvent = () => {
  fileInput.addEventListener('input', (evt) => {
    evt.preventDefault();
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    showUploadedImage(fileInput.files[0]);
  });
}

// добавляет обработчик отправки формы
const addSubmitEvent = () => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    const success = await postNewPicture(uploadForm);
    if (success) {
      setDefaultValues();
      body.appendChild(createSuccessPopup());
      return;
    }
    showError();
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
  addSubmitEvent();
  addUploadEvent();
  addCloseEvent(uploadOverlay, overlayCloseButton);
  overlayCloseButton.addEventListener('click', setDefaultValues);
  scaleSmallerButton.addEventListener('click', onScaleButtonsClick);
  scaleBiggerButton.addEventListener('click', onScaleButtonsClick);

}

