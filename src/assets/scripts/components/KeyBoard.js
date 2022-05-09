import createElement from '../utils/createElement';
import { setStorage, getStorage } from '../utils/storage';
import { Key } from './Key';

export class KeyBoard {
  constructor(langLayouts, keyboardKit) {
    this.langLayouts = langLayouts;
    this.kbKit = keyboardKit;
    this.cursorPosition = 0;

    this.langLayoutCount = 0;
    this.kbLang = this.#initLang();
  }

  #initLang() {
    let lang = getStorage('kb-lang');
    if (lang) {
      // set langLayoutCount
      Object.keys(this.langLayouts).forEach((item, idx) => {
        if (item === lang) {
          this.langLayoutCount = idx;
        }
      });
    } else {
      // lang = langLayouts[0]
      [lang] = Object.keys(this.langLayouts);
    }

    setStorage('kb-lang', lang);
    return lang;
  }

  #changeKbLang() {
    const langsArr = Object.keys(this.langLayouts);
    if (this.langLayoutCount !== langsArr.length - 1) {
      this.langLayoutCount += 1;
    } else {
      this.langLayoutCount = 0;
    }

    const lang = langsArr[this.langLayoutCount];
    setStorage('kb-lang', lang);
    this.kbLang = lang;
  }

  init() {
    this.container = createElement({
      classNames: 'keyboard',
      child: createElement({
        classNames: 'box',
      }),
    });
    this.#renderKb();

    return this;
  }

  #renderKb() {
    this.container.replaceChildren();
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
          }).render();

          key.container.addEventListener(
            'mousedown',
            this.#keyDownHandler.bind(this, key),
          );
          key.container.addEventListener(
            'mouseup',
            this.#keyUpHandler.bind(this, key),
          );

          this.keys.push(key);
          row.append(key.container);
        }
      });
      this.container.append(row);
    });
  }

  output(prop) {
    this.textarea = prop;
    this.textarea.focus();

    this.textarea.addEventListener('click', (e) => {
      e.preventDefault();
      this.cursorPosition = this.textarea.selectionStart;
    });

    this.#keyPressListen();

    return this;
  }

  #keyPressListen() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();

      const eCode = e.code;
      this.keys.forEach((key) => {
        if (key.code === eCode) this.#keyDownHandler.call(this, key);
      });
    });

    window.addEventListener('keyup', (e) => {
      e.preventDefault();

      const eCode = e.code;
      this.keys.forEach((key) => {
        if (key.code === eCode) this.#keyUpHandler.call(this, key);
      });
    });

    return this;
  }

  #keyDownHandler(key) {
    key.keydown();

    // text key
    if (!key.isFunction) {
      if (this.isShiftActive) {
        this.textarea.value = this.#updateText(
          this.cursorPosition,
          key.shiftKey,
        );
      } else {
        this.textarea.value = this.#updateText(this.cursorPosition, key.key);
      }
      this.cursorPosition += 1;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // enter
    if (key.code === 'Enter') {
      this.textarea.value = this.#updateText(this.cursorPosition, '\n');
      this.cursorPosition += 1;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // tab
    if (key.code === 'Tab') {
      this.textarea.value = this.#updateText(this.cursorPosition, '\t');
      this.cursorPosition += 1;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // arrow left
    if (key.code === 'ArrowLeft' && this.cursorPosition > 0) {
      this.cursorPosition -= 1;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // arrow right
    if (
      // prettier-ignore
      key.code === 'ArrowRight'
      && this.cursorPosition < this.textarea.value.length
    ) {
      this.cursorPosition += 1;
      this.textarea.selectionStart = this.cursorPosition;
    }

    // backspace
    if (key.code === 'Backspace' && this.cursorPosition > 0) {
      const originalText = this.textarea.value;
      this.textarea.value = `${originalText.substring(
        0,
        this.cursorPosition - 1,
      )}${originalText.substring(this.cursorPosition)}`;
      this.cursorPosition -= 1;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // delete
    if (key.code === 'Delete') {
      const originalText = this.textarea.value;
      this.textarea.value = `${originalText.substring(
        0,
        this.cursorPosition,
      )}${originalText.substring(this.cursorPosition + 1)}`;
      this.textarea.selectionEnd = this.cursorPosition;
    }

    // CapsLock
    if (key.key === 'CapsLk') {
      this.isCapitalCase = !this.isCapitalCase;
      key.highlight();
      this.#changeCase();
    }

    // ctrl
    if (key.key === 'Ctrl') {
      this.isCtrlActive = true;
      if (this.isShiftActive) {
        this.#changeLangHandler();
      }
    }

    // shift
    if (key.key === 'Shift') {
      this.isShiftActive = true;
      this.container.classList.add('shift');
      if (this.isCtrlActive) {
        this.#changeLangHandler();
      }
    }

    // this.textarea.focus();
    return this;
  }

  #changeLangHandler() {
    this.#changeKbLang();

    this.keys.forEach((k) => {
      if (!k.isFunction) {
        const { key, shiftKey } = this.langLayouts[this.kbLang][k.code];
        k.changeData({ key, shiftKey });
      }
    });

    // rerender Ё, Ж, Х, Ъ, Б, Ю keys, if necessary
    if (this.isCapitalCase) {
      this.#changeCase();
    }
  }

  #changeCase() {
    this.keys.forEach((k) => {
      if (!k.isFunction && k.key && k.key.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
        const { key: a, shiftKey: b } = this.langLayouts[this.kbLang][k.code];
        if (!this.isCapitalCase) {
          k.changeData({ key: a, shiftKey: b });
        } else {
          k.changeData({ key: b, shiftKey: a });
        }
      }
    });
  }

  #keyUpHandler(key) {
    if (key.key === 'Ctrl') {
      this.isCtrlActive = false;
    }

    if (key.key === 'Shift') {
      this.container.classList.remove('shift');
      this.isShiftActive = false;
    }

    key.keyup();
    this.textarea.focus();
    return this;
  }

  #updateText(position, symbol) {
    const originalText = this.textarea.value;
    return `${originalText.substring(
      0,
      position,
    )}${symbol}${originalText.substring(position)}`;
  }
}
