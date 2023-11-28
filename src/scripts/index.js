<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5f79d573a0f7803c2ac27f24f3cef2adbb20a94c
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
<<<<<<< HEAD
=======
=======
import '../styles/main.css';
>>>>>>> ed65d109a21df8428fedab383578726d2345b5df
>>>>>>> 5f79d573a0f7803c2ac27f24f3cef2adbb20a94c
