import { DOM, addCloseEvent } from './util.js';
import { renderComments } from './render.js';

// DOM-элементы попапа с большим изображением
const body = DOM.body;
const bigPictureContainer = DOM.bigPictureContainer;
// DOM-элементы для вставки данных большого изображения
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const pictureDescription = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsCounter = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const closeButton = bigPictureContainer.querySelector('#picture-cancel');


// добавляет обработчик события нажатия миниатюру, который открывает попап с большим изображением
export const addOpenEvent = (picture, pictureInfo) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureImage.src = pictureInfo.url;
    pictureDescription.textContent = pictureInfo.description;
    likesCount.textContent = pictureInfo.likes;
    commentsCount.textContent = pictureInfo.comments.length;
    renderComments(pictureInfo.comments, false);
    bigPictureContainer.classList.remove('hidden');
    body.classList.add('modal-open');
  });
}

// инициализация большого изображения при загрузке страницы, без показа и вставки данных
export const initBigPicture = () => {
  addCloseEvent(bigPictureContainer, closeButton);
  //временное скрытие счетчика и загрузчика комментариев
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}
