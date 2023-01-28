import { createPicture, createComment } from './components.js';
import { DOM } from './util.js';

const picturesContainer = DOM.picturesContainer;
const commentsContainer = DOM.commentsContainer;

// добавляет массив изображений на страницу
export const renderPictures = (picturesArray) => {
  const picturesFragment = document.createDocumentFragment();
  picturesArray.forEach((picture) => {
    const newPicture = createPicture(picture);
    picturesFragment.appendChild(newPicture);
    newPicture.data = picture;
  });
  picturesContainer.appendChild(picturesFragment);
}
// добавляет указанный массив комментариев на страницу полноэкранного просмотра изображения
export const renderComments = (commentsArray, isAddional) => {
  const commentsFragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const newComment = createComment(comment);
    commentsFragment.appendChild(newComment);
  });
  if (!isAddional) {
    commentsContainer.innerHTML = '';
  }
  commentsContainer.appendChild(commentsFragment);
}
