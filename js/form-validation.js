import { hasDuplicates } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');

const validityMessages = {
  tagLength: 'Длина тега должна быть не менее 1 символа, не считая #, и не более 20 символов вместе с #.\n',
  tagSymbols: 'Хэштег должен начинаться с #, может состоять из букв латинского и русского алфавитов и цифр.\n',
  tagsCount: 'Максимальное допустимое количество тегов - 5.\n',
  duplicateTags: 'Нельзя использовать один тег более 2-х раз. Регистр не учитывается.\n',
};

// проверяет валидность введенных хэштегов
const validateHashtags = () => {
  hashtagsInput.value = hashtagsInput.value.replace(/[ ]{1,}/g, ' ');
  let value = hashtagsInput.value.trim();
  let tags = value.split(/[ ]{1,}/);
  if (value.length === 0 || hashtagsInput.value === ' ') {
    hashtagsInput.setCustomValidity('');
    return;
  }
  let message = '';
  message += (tags.length > 5) ? validityMessages.tagsCount : '';
  message += (hasDuplicates(tags)) ? validityMessages.duplicateTags : '';
  let isError = false;
  for (let tag of tags) {
    let temp = tag;
    let match = tag.match(/^#[a-zA-Zа-яА-ЯёЁ0-9]{1,20}/i);

    if (match) {
      isError = ((match[0] !== match.input));
    } else {
      isError = true;
    }

  }
  message += isError ? validityMessages.tagLength + validityMessages.tagSymbols : '';
  hashtagsInput.setCustomValidity(message);

  hashtagsInput.reportValidity();
}

export const initValidation = () => {
  hashtagsInput.addEventListener('input', () => {
    validateHashtags();
  });
}
