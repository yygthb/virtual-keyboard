import { KeyBoard } from './components/KeyBoard';
import createElement from './utils/createElement';
import { langLayouts, keyboardKit } from './layout';
import { kbIntro } from './components/Intro';
import { textarea } from './components/Textarea';

const body = document.querySelector('body');

// app info and textarea
const $info = kbIntro();
const $textArea = textarea();
// init keyboard
const kb = new KeyBoard(langLayouts, keyboardKit).init();

const app = createElement({
  attributes: [['id', 'app']],
  child: [$info, $textArea, kb.container],
});

body.prepend(app);

// listen kb actions
kb.output($textArea);
