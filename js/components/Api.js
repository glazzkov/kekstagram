export class Api {
  static get GET_URL() {
    return 'https://23.javascript.pages.academy/kekstagram/data/';
  }

  static get POST_URL() {
    return'https://23.javascript.pages.academy/kekstagram/';
  }

  static get getPicturesData() {
    return async () => {
      try {
        const response = await fetch(this.GET_URL);
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  }

  static get postNewPicture() {
    return async (form) => {
      try {
        const response = await fetch(this.POST_URL, {
          method: 'POST',
          body: new FormData(form),
        });
        await response.json();
        return true;
      } catch (error) {
        return error;
      }
    }
  }
}
