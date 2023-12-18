import '../styles/main.css';
import 'regenerator-runtime';
import App from './views/app';
import swRegister from './utils/sw';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#draw'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
