import { bools } from './util.js';
import { renderComments } from './render.js';

// DOM-элементы для работы с большим изображением
const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const pictureDescription = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsCounter = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const closeButton = bigPictureContainer.querySelector('#picture-cancel');

// обработчик события закрытия полноэкранного просмотра
const onPictureClose = (evt) => {
  evt.preventDefault();
  if (bools.isEscKey(evt.key) || evt.type === 'click') {
    bigPictureContainer.classList.add('hidden');
    body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onPictureClose);
    window.removeEventListener('keyup', onPictureClose);
  }
}

// инициализирует просмотр большого изображения для каждой миниатюры
const initBigPicture = (picture, pictureInfo) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureImage.src = pictureInfo.url;
    pictureDescription.textContent = pictureInfo.description;
    likesCount.textContent = pictureInfo.likes;
    commentsCount.textContent = pictureInfo.comments.length;

    renderComments(pictureInfo.comments, false);
    closeButton.addEventListener('click', onPictureClose);
    window.addEventListener('keyup', onPictureClose);

    bigPictureContainer.classList.remove('hidden');
    body.classList.add('modal-open');

    //временное скрытие счетчика и загрузчика комментариев
    commentsCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  });
};



export { initBigPicture };
