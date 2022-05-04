import createElement from '../utils/createElement';

export class Key {
  // prettier-ignore
  constructor({
    code,
    key,
    shiftKey,
    className,
  }) {
    this.code = code;
    this.key = key;
    this.shiftKey = shiftKey;
    this.className = className;

    // container-rendering function
    const $primaryKey = createElement({
      classNames: 'key-code__primary',
      child: key,
    });

    let $secondaryKey = createElement({
      classNames: 'key-code__secondary',
      child: '',
    });
    if (shiftKey && shiftKey.match(/[^a-zA-Zа-яА-Я0-9]/)) {
      $secondaryKey = createElement({
        classNames: 'key-code__secondary',
        child: shiftKey,
      });
    }

    this.container = createElement({
      tagName: 'button',
      classNames: `key-item ${this.className}`,
      child: [$secondaryKey, $primaryKey],
    });
  }
}
