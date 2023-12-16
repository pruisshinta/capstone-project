/* eslint-disable no-underscore-dangle */
import DrawerInitiator from "../utils/drawer";
import UrlParser from "../routes/urlParse";
import routes from "../routes/routes";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
    
    }
    // const skipLinkElem = document.querySelector('.skip');
    // skipLinkElem.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   document.querySelector('#main-content').focus();
    // });
  }
  
}

export default App;
