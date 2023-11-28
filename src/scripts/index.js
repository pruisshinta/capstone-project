<<<<<<< HEAD
/* eslint-disable import/no-extraneous-dependencies */
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
=======
import '../styles/main.css';
>>>>>>> ed65d109a21df8428fedab383578726d2345b5df
