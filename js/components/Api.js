export class Api {
  static get GET_URL() {
    return 'https://23.javascript.pages.academy/kekstagram/data/';
  }

  static get POST_URL() {
    return'https://23.javascript.pages.academy/kekstagram/';
  }

  static get getPicturesData() {
    return async () => {
      const response = await fetch(this.GET_URL);
      const data = await response.json();
      return data;
    }
  }

  static get postNewPicture() {
    return async (form) => {
      const response = await fetch(this.POST_URL, {
        method: 'POST',
        body: new FormData(form),
      });
      const json = await response.json()
      return json;
    }
  }
}
