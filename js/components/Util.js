export class Util{
  static get isEscKey() {
    return (key) => key === 'Escape' || key === 'Esc';
  }

  static get hasStringsArrayDuplicates() {
    return (array) => {
      array = array.map((item) => item.toLowerCase());
      let maxCount = 1;
      for (let i = 0; i < array.length; i++) {
        let value = array[i];
        let count = 0;
        for (let j = 0; j < array.length; j++) {
          count = (value === array[j]) ? count + 1 : count;
        }
        maxCount = (count > maxCount) ? count : maxCount;
      }
      return maxCount > 1;
    };
  }

  static get isStringHashtag() {
    return (string) => {
      let match = string.match(/^#[a-zA-Zа-яА-ЯёЁ0-9]{1,20}/i);
      return (!!match && match[0] === match.input)
    }
  }

  static get addCloseEventHandler() {
    return (closeButton, closeCallback) => {
      const onPopupClose = (evt) => {
        evt.preventDefault();
        const isInputInFocus = evt.target.nodeName === 'INPUT' || evt.target.nodeName === 'TEXTAREA';
        const isEsc = Util.isEscKey(evt.key)
        const isClick = evt.type === 'click';
        if ((isEsc || isClick) && !isInputInFocus) {
          closeCallback();
        }
      }
      closeButton.addEventListener('click', onPopupClose);
      window.addEventListener('keyup', onPopupClose);
    }
  }
}

