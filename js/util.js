const util = {
  // возвращает случайное число от min до max
  getRandomInt (min, max) {
    if (min < 0 || max < 0) {
      return -1;
    }
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // проверяет, является ли длина строки меньше переданной максимальной длины
  isValidLength (string, maxLength) {
    return (string.length <= maxLength);
  },

  // возвращает перемешанный массив уникальных чисел от 1 до указанного числа
  getUniqueNumbersArray (length) {
    let numbers = [];
    for (let i = 1; i <= length; i++){
      numbers.push(i);
    }
    for (let i = 0; i < length; i++){
      let tempIndex = this.getRandomInt(0, length - 1);
      let tempNumber = numbers[i];
      numbers[i] = numbers[tempIndex];
      numbers[tempIndex] = tempNumber;
    }
    return numbers;
  },
}

export {util}
