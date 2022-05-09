import { langLayouts, keyboardKit } from './layout';
import createElement from './utils/createElement';
import introText from './components/Intro';
import textarea from './components/Textarea';
import KeyBoard from './components/KeyBoard';

const body = document.querySelector('body');

// app info and textarea
const $info = introText();
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
