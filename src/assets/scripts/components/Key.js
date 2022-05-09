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
      child: this.shiftKey,
    });

    this.container = createElement({
      tagName: 'button',
      classNames: `${
        this.isFunction ? 'key-item key-item__function' : 'key-item'
      } ${this.className}`,
      child: [this.secondaryKeyNode, this.primaryKeyNode],
    });

    if (this.shiftKey && this.shiftKey.match(/[a-zA-Zа-яА-Я0-9ёЁ]/)) {
      this.container.classList.add('key-item__letter');
    }

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

  changeData({ key, shiftKey }) {
    this.key = key;
    this.primaryKeyNode.textContent = key;
    this.shiftKey = shiftKey;
    this.secondaryKeyNode.textContent = shiftKey;

    this.container.classList.remove('key-item__letter');
    if (shiftKey && shiftKey.match(/[a-zA-Zа-яА-Я0-9ёЁ]/)) {
      this.container.classList.add('key-item__letter');
    }

    return this;
  }

  highlight() {
    this.container.classList.toggle('highlight');
  }
}
