// возвращает случайное положительное число в указанном диапазоне
export const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// возвращает массив перемешанных чисел от нуля до указанной длины
export const getUniqueNumbersArray = (length) => {
  let numbers = [];
  for (let i = 1; i <= length; i++){
    numbers.push(i);
  }
  for (let i = 0; i < length; i++){
    let tempIndex = getRandomInt(0, length - 1);
    let tempNumber = numbers[i];
    numbers[i] = numbers[tempIndex];
    numbers[tempIndex] = tempNumber;
  }
  return numbers;
}
// универсальные булевые переменные
export const bools = {
  isEscKey: (key) => key === 'Escape' || key === 'Esc',
  isValidLength: (string, maxLength) => (string.length <= maxLength),
  hasDuplicates: (array) => {
    array = array.map((item) => item.toLowerCase());
    let maxCount = 1;
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      let count = 0;
      for (let j = 0; j < array.length; j++) {
        count = (value === array[j]) ? count + 1 : count;
      }
      maxCount = (count > maxCount) ? count : maxCount;
    }
    return maxCount > 1;
  },
}
// часто используемые DOM-элементы
export const DOM = {
  body: document.querySelector('body'),
  picturesContainer: document.querySelector('.pictures'),
  commentsContainer: document.querySelector('.social__comments'),
  bigPictureContainer: document.querySelector('.big-picture'),
  uploadSection: document.querySelector('.img-upload'),
}
// добавляет обработчик закрытия попапа
export const addCloseEvent = (popup, closeButton) => {
  const onPopupClose = (evt) => {
    evt.preventDefault();
    const isInputInFocus = evt.target.nodeName === 'INPUT' || evt.target.nodeName === 'TEXTAREA';
    const isEsc = bools.isEscKey(evt.key)
    const isClick = evt.type === 'click';
    if ((isEsc || isClick) && !isInputInFocus) {
      DOM.body.classList.remove('modal-open');
      popup.classList.add('hidden');
    }
  }
  closeButton.addEventListener('click', onPopupClose);
  window.addEventListener('keyup', onPopupClose);
}


