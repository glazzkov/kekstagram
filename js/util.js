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
}
