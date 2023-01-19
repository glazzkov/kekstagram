import { util } from './util.js';

const PHOTOS_COUNT = 25;

const generate = {
  // генерирует случайное имя
  name() {
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
    return `${firstNames[util.getRandomInt(0, firstNames.length - 1)]} ${lastNames[util.getRandomInt(0, lastNames.length - 1)]}`;
  },

  // генеригует текст сообщения
  message () {
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
      message += templates[util.getRandomInt(0, templates.length - 1)];
    }
    return message;
  },

  // генеригует объект комментария со всеми полями
  comment (id, avatarUrl, message, name) {
    return {
      id: id,
      avatar: avatarUrl,
      message: message,
      name: name,
    };
  },

  // генерирует массив комментариев указанной длины
  commentsArray (count) {
    let commensts = [];
    for (let i = 0; i < count; i++){
      let comment = this.comment(i, `img/avatar-${util.getRandomInt(1, 6)}.svg`, generate.message(), generate.name());
      commensts.push(comment);
    }
    return commensts;
  },

  // генеригует информацию об одном объекте фотографии
  photoInfo (id, url, description, likes, commenstsArray) {
    return {
      id: id,
      url: url,
      description: description,
      likes: likes,
      commensts: commenstsArray,
    };
  },

  // генерирует массив данных о фотографиях указанной длины
  photoInfoArray (photosCount = PHOTOS_COUNT) {
    photosCount;
    let photos = [];
    let idArray = util.getUniqueNumbersArray(photosCount);
    for (let i = 0; i < photosCount; i++){
      let id = idArray[i];
      let url = `photos/${id}.jpg`
      let description = 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Одна над но жизни предупредила своих власти последний грамматики инициал!'
      let likes = util.getRandomInt(15, 200);
      let commenstsArray = this.commentsArray(util.getRandomInt(1, 5));
      let photo = this.photoInfo(id, url, description, likes, commenstsArray);
      photos.push(photo);
    }
    return photos;
  },
};

export { generate };
