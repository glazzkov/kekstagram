import { DOM } from './util.js';
import { renderPictures } from './render.js';

const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data/';
const POST_URL = 'https://23.javascript.pages.academy/kekstagram/';

// получение данных с сервера
export const getDataFromServer = async () => {
  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();
    renderPictures(data);
  } catch (error) {
    DOM.picturesContainer.insertAdjacentText('beforeend', `Ошибка получения данных - ${error.message}. Рекомендуем перезагрузить страницу.`);
  }
}

// отправка данных на сервер, возвращает true при успешной отправке, false при ошибке.
export const postNewPicture = async (form) => {
  try {
    const response = await fetch(POST_URL, {
      method: 'POST',
      body: new FormData(form),
    });
    await response.json();
    return true;
  } catch (error) {
    return false;
  }
}
