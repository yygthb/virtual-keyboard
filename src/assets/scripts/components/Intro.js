import createElement from '../utils/createElement';

const infoArr = ['to swhtch keyboard language use Ctrl + Shift'];

export default function introText() {
  const $title = createElement({
    tagName: 'h1',
    classNames: 'title',
    child: 'Virtual Keyboard',
  });

  const $aboutLink = createElement({
    tagName: 'a',
    classNames: 'about-link',
    child: 'Virtual Keyboard',
    attributes: [
      [
        'href',
        'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/virtual-keyboard/virtual-keyboard-en.md',
      ],
      ['target', '_blank'],
    ],
  });
  const $about = createElement({
    tagName: 'p',
    classNames: 'about',
    child: ['RSSchool #stage1 ', $aboutLink, ' task'],
  });

  const $rules = createElement({
    tagName: 'ul',
    classNames: 'info-items',
    child: infoArr.map((info) => {
      const infoListItem = createElement({
        tagName: 'li',
        classNames: 'info-item',
        child: info,
      });
      return infoListItem;
    }),
  });

  const container = createElement({
    classNames: 'intro',
    child: [$title, $about, $rules],
  });

  return container;
}
