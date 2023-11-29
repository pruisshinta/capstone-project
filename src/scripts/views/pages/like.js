const Like = {
  async render() {
    return `
    <section class="favorite">
    <h2 class="label-title">Favorite Culture</h2>
    <article id="container" class="container">
    </article>
  </section>
    `;
  },

  async afterRender() {
    const landingPageHeader = document.querySelector('.landing-head');
    if (landingPageHeader) {
      landingPageHeader.style.display = 'none';
    }
  },
};

export default Like;
