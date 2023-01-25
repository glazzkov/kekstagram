/* global noUiSlider:readonly */

const uploadSection = document.querySelector('.img-upload');
const uploadForm = uploadSection.querySelector('#upload-select-image');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

const effectItems = uploadForm.querySelector('.effects__list').children;
const effectLevel = uploadForm.querySelector('.effect-level__value');

const sliderContainer = uploadForm.querySelector('.effect-level');
const slider = uploadForm.querySelector('.effect-level__slider')

let currentEffectId = '';

// применение эффекта к фото
const showEffect = (value) => {
  switch (currentEffectId) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${value})`;
      break;
    default:
      imagePreview.style.filter = '';
      break;
  }
}

// добавление слайдера на страницу
const createSlider = (min, max, step) => {
  noUiSlider.create(slider, {
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: 0,
    connect: 'lower',
  });

  slider.noUiSlider.on('update', (___, handle, unencoded)=> {
    effectLevel.value = unencoded[handle];
    showEffect(effectLevel.value);
  });
  sliderContainer.classList.add('hidden');
  effectLevel.value = min;
}

// обновление значений слайдера при смене эффекта
const updateSlider = (effect) => {
  sliderContainer.classList.remove('hidden');
  let min = 0;
  let max = 1;
  let step = 0.1;
  switch (effect) {
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
    case 'chrome':
    case 'sepia':
      break;
    default:
      sliderContainer.classList.add('hidden');
      break;
  }

  // console.log(min, max, step);

  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
  });
  slider.noUiSlider.set(min);
}

// выбор эффекта
const selectEffect = (selector) => {
  const effectId = selector.id.slice(7);

  const baseClass = 'effect-level__value';
  const newClass = `effects__preview--${effectId}`;
  const classList = (effectId === 'none') ? [baseClass] : [baseClass, newClass];
  imagePreview.classList = classList;
  currentEffectId = effectId;
  updateSlider(effectId);
}

// инициализация эффектов
export const initEffects = () => {
  createSlider(0, 1, 0.1);
  for (let item of effectItems) {
    const selector = item.querySelector('.effects__radio');
    item.addEventListener('input', () => {
      selectEffect(selector);
    });
  }
}



