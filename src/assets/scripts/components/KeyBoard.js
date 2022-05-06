import createElement from '../utils/createElement';
import { setStorage, getStorage } from '../utils/storage';
import { Key } from './Key';

const getDefaultLang = (langLayouts) => {
  const lang = Object.keys(langLayouts)[0];
  setStorage('kb-lang', lang);
  return lang;
};

export class KeyBoard {
  constructor(langLayouts, keyboardKit) {
    this.langLayouts = langLayouts;
    this.kbKit = keyboardKit;

    this.kbLang = getStorage('kb-lang') || getDefaultLang(langLayouts);
  }

  init() {
    this.container = createElement({
      classNames: 'keyboard',
      child: createElement({
        classNames: 'box',
      }),
    });

    this.kbKit.forEach((kbRow) => {
      const row = createElement({
        classNames: 'keys-row',
      });
      kbRow.forEach((keyCode) => {
        const foundKey = this.langLayouts[this.kbLang][keyCode];
        if (foundKey) {
          const $key = new Key({
            code: keyCode,
            ...foundKey,
          });
          row.append($key.container);
        }
      });
      this.container.append(row);
    });

    return this;
  }

  output(prop) {
    this.textarea = prop;
    this.textarea.focus();

    this.#listen();

    return this;
  }

  #listen() {
    console.log('listen key press');

    return this;
  }
}
