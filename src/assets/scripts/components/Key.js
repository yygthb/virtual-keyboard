import createElement from '../utils/createElement';

export class Key {
  // prettier-ignore
  constructor({
    code,
    key,
    shiftKey,
    className,
    isFunction,
  }) {
    this.code = code;
    this.key = key;
    this.shiftKey = shiftKey;
    this.className = className;
    this.isFunction = isFunction || false;
  }

  render() {
    this.primaryKeyNode = createElement({
      classNames: 'key-code__primary',
      child: this.key,
    });
    this.secondaryKeyNode = createElement({
      classNames: 'key-code__secondary',
      child: '',
    });
    if (this.shiftKey && this.shiftKey.match(/[^a-zA-Zа-яА-Я0-9ёЁ]/)) {
      this.secondaryKeyNode = createElement({
        classNames: 'key-code__secondary',
        child: this.shiftKey,
      });
    }

    this.container = createElement({
      tagName: 'button',
      classNames: `key-item ${this.className}`,
      child: [this.secondaryKeyNode, this.primaryKeyNode],
    });

    return this;
  }

  keydown() {
    this.container.classList.add('active');
    return this;
  }

  keyup() {
    this.container.classList.remove('active');
    return this;
  }

  changeData(keyData) {
    this.primaryKeyNode.textContent = keyData.key;
    this.key = keyData.key;

    if (keyData.shiftKey && keyData.shiftKey.match(/[^a-zA-Zа-яА-Я0-9ёЁ]/)) {
      this.shiftKey = keyData.shiftKey;
      this.secondaryKeyNode.textContent = keyData.shiftKey;
    } else {
      this.shiftKey = null;
      this.secondaryKeyNode.textContent = '';
    }

    return this;
  }
}
