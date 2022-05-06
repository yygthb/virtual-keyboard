import createElement from '../utils/createElement';

const createKeyContainer = (keyObj) => {
  const $primaryKey = createElement({
    classNames: 'key-code__primary',
    child: keyObj.key,
  });

  let $secondaryKey = createElement({
    classNames: 'key-code__secondary',
    child: '',
  });
  if (keyObj.shiftKey && keyObj.shiftKey.match(/[^a-zA-Zа-яА-Я0-9]/)) {
    $secondaryKey = createElement({
      classNames: 'key-code__secondary',
      child: keyObj.shiftKey,
    });
  }

  return createElement({
    tagName: 'button',
    classNames: `key-item ${keyObj.className}`,
    child: [$secondaryKey, $primaryKey],
  });
};

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

    this.container = createKeyContainer({ key, shiftKey, className });
  }
}
