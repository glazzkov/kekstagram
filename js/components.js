import { initBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

// возвращает DOM-элемент изображения на основе переданного объекта
export const createPicture = (pictureObject) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const pictureImage = newPicture.querySelector('.picture__img');
  const likesCount = newPicture.querySelector('.picture__likes');
  const commentsCount = newPicture.querySelector('.picture__comments');

  pictureImage.src = pictureObject.url;
  likesCount.textContent = pictureObject.likes;
  commentsCount.textContent = pictureObject.comments.length;

  initBigPicture(newPicture, pictureObject);

  return newPicture;
}

// возвращает DOM-элемент комментария на основе переданного объекта
export const createComment = (commentObject) => {
  const newComment = commentTemplate.cloneNode(true);
  const commentAvatar = newComment.querySelector('.social__picture');
  const commentText = newComment.querySelector('.social__text');

  commentAvatar.src = commentObject.avatar;
  commentAvatar.alt = commentObject.name;
  commentText.textContent = commentObject.message;

  return newComment;
}

