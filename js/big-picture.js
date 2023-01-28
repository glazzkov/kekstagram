import { DOM, addCloseEvent } from './util.js';
import { renderComments } from './render.js';
import { getPictureById } from './data.js';

// DOM-элементы попапа с большим изображением
const body = DOM.body;
const picturesContainer = DOM.picturesContainer;
const bigPictureContainer = DOM.bigPictureContainer;
// DOM-элементы для вставки данных большого изображения
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const pictureDescription = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsCounter = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const closeButton = bigPictureContainer.querySelector('#picture-cancel');

// вставка данных переданного изображения в попап с большой картинкой
const insertData = (pictureInfo) => {
  bigPictureImage.src = pictureInfo.url;
  pictureDescription.textContent = pictureInfo.description;
  likesCount.textContent = pictureInfo.likes;
  commentsCount.textContent = pictureInfo.comments.length;
}

// добавляет обработчик события нажатия на любую миниатюру, который открывает попап с большим изображением
const addOpenEvent = () => {
  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.parentNode;
    if (picture.classList.contains('picture')) {
      evt.preventDefault();
      const id = picture.id.replace('picture-', '');
      const info = getPictureById(id);
      insertData(info);
      renderComments(info.comments, false);
      bigPictureContainer.classList.remove('hidden');
      body.classList.add('modal-open');
    }
  });
}

// инициализация большого изображения при загрузке страницы, без показа и вставки данных
export const initBigPicture = () => {
  addCloseEvent(bigPictureContainer, closeButton);
  addOpenEvent();
  //временное скрытие счетчика и загрузчика комментариев
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}
