import { getRandomInt, getUniqueNumbersArray } from './util.js';

const PICTURES_COUNT = 25;

// возвращает случайное имя
export const getRandomName = () => {
  const firstNames = [
    'Оптимус',
    'Питер',
    'Адам',
    'Доминик',
    'Король',
    'Юпитер',
    'Гарик',
    'Шашлык',
    'Илон',
    'Иван',
  ];
  const lastNames = [
    'Торетто',
    'Шутович',
    'Шпроттер',
    'Жареный',
    'Сатурнович',
    'Грозный',
    'Арабов',
    'Паркер',
    'Прайм',
    'Маск',
  ];
  let firstName = firstNames[getRandomInt(0, firstNames.length - 1)]
  let lastName = lastNames[getRandomInt(0, lastNames.length - 1)]
  return `${firstName} ${lastName}`;
}
// возвращает случайный текст комментария из заготовленных шаблонов
export const getRandomCommentMessage = () => {
  let message = '';
  const templates = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё. ',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ',
    'В конце концов это просто непрофессионально. ',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. ',
    'Лица у людей на фотке перекошены, как будто их избивают. ',
    'Как можно было поймать такой неудачный момент ? ! ',
  ];
  for (let i = 0; i < 2; i++){
    message += templates[getRandomInt(0, templates.length - 1)];
  }
  return message;
}
// возвращает объект комментария со всеми полями
export const getCommentObject = (id, avatarUrl, message, name) => {
  return {
    id: id,
    avatar: avatarUrl,
    message: message,
    name: name,
  };
}
// возвращает массив из указанного числа случайных объектов комментариев
export const getCommentsArray = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++){
    let id = i;
    let avatarUrl = `img/avatar-${getRandomInt(1, 6)}.svg`;
    let message = getRandomCommentMessage();
    let name = getRandomName();
    let comment = getCommentObject(id, avatarUrl, message, name);
    comments.push(comment);
  }
  return comments;
}
// возвращает объект изображения со всеми полями
export const getPictureObject = (id, url, description, likes, commentsArray) => {
  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: commentsArray,
  };
}

// возвращает массив из указанного числа случайных объектов изображений
export const getPictureObjectsArray = (picturesCount = PICTURES_COUNT) => {
  let pictures = [];
  let idArray = getUniqueNumbersArray(picturesCount);
  for (let i = 0; i < picturesCount; i++){
    let id = idArray[i];
    let url = `photos/${id}.jpg`
    let description = 'Далеко-далеко за словесными горами живут рыбные тексты.'
    let likes = getRandomInt(15, 200);
    let commentsArray = getCommentsArray(getRandomInt(1, 5));
    let picture = getPictureObject(id, url, description, likes, commentsArray);
    pictures.push(picture);
  }
  return pictures;
}

