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
    this.cursorPosition = 0;

    this.kbLang = getStorage('kb-lang') || getDefaultLang(langLayouts);
  }

  init() {
    this.container = createElement({
      classNames: 'keyboard',
      child: createElement({
        classNames: 'box',
      }),
    });

    this.keys = [];
    this.kbKit.forEach((kbRow) => {
      const row = createElement({
        classNames: 'keys-row',
      });
      kbRow.forEach((keyCode) => {
        const foundKey = this.langLayouts[this.kbLang][keyCode];
        if (foundKey) {
          const key = new Key({
            code: keyCode,
            ...foundKey,
          });
          // console.log(key);
          this.keys.push(key);
          row.append(key.container);
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
    window.addEventListener('keydown', (e) => {
      e.preventDefault();

      const eCode = e.code;
      this.keys.forEach((key) => {
        if (key.code === eCode) {
          key.keydown();

          // text key
          if (!key.isFunction) {
            this.textarea.value = this.#updateText(this.cursorPosition, key.key);
            this.cursorPosition += 1;
            this.textarea.selectionEnd = this.cursorPosition;
          }

          // enter
          if (key.code === 'Enter') {
            this.textarea.value = this.#updateText(this.cursorPosition, '\n');
            this.cursorPosition += 1;
            this.textarea.selectionEnd = this.cursorPosition;
          }

          // arrow left
          if (key.code === 'ArrowLeft' && this.cursorPosition > 0) {
            this.cursorPosition -= 1;
            this.textarea.selectionEnd = this.cursorPosition;
          }

          // arrow right
          if (key.code === 'ArrowRight' && this.cursorPosition < this.textarea.value.length) {
            this.cursorPosition += 1;
            this.textarea.selectionStart = this.cursorPosition;
          }

          // backspace
          if (key.code === 'Backspace' && this.cursorPosition > 0) {
            const originalText = this.textarea.value;
            this.textarea.value = `${originalText.substring(0, this.cursorPosition - 1)}${originalText.substring(this.cursorPosition)}`;
            this.cursorPosition -= 1;
            this.textarea.selectionEnd = this.cursorPosition;
          }

          this.textarea.focus();
        }
      });

      // console.log(this);
    });

    window.addEventListener('keyup', (e) => {
      e.preventDefault();

      const eCode = e.code;
      this.keys.forEach((key) => {
        if (key.code === eCode) {
          key.keyup();
        }
      });
    });

    return this;
  }

  #updateText(position, symbol) {
    const originalText = this.textarea.value;
    return `${originalText.substring(0, position)}${symbol}${originalText.substring(position)}`;
  }
}
