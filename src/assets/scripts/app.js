import { KeyBoard } from './components/KeyBoard';
import createElement from './utils/createElement';
import { langLayouts, keyboardKit } from './layout';

const body = document.querySelector('body');

// app
const $title = createElement({
  tagName: 'h1',
  classNames: 'title',
  child: 'Virtual Keyboard',
});
const $textArea = createElement({
  tagName: 'textarea',
  classNames: 'textarea',
  attributes: [
    ['cols', 50],
    ['rows', 10],
    ['name', 'textarea'],
  ],
});

// init keyboard
const kb = new KeyBoard(langLayouts, keyboardKit).init();

const app = createElement({
  attributes: [['id', 'app']],
  child: [$title, $textArea, kb.container],
});

body.prepend(app);

// listen kb actions
kb.output($textArea);
