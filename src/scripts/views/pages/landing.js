const landingPage = {
  async render() {
    return `
    <article class="hero">
        <img class="hero-image" src="./images/landing1.png" alt="hero image">
        <h2 class="hero-bold">Explore Culture, <br>Embrace Diversity</h2>
        <p class="hero-desc">Our platform is your gateway to immersive experiences, connecting you with the heart and soul of diverse cultures. From ancient rituals to modern expressions, join us in celebrating the beauty and depth of cultural wonders. Explore, learn, and create lasting memories that transcend borders. Your journey to cultural discovery begins here!</p>
    </article>
    
    <article class="benefits">
        <h2 class="title">Benefits</h2>
        <p class="benefits-text">The benefits to be gained from this platform.</p>
        <article class="benefits-items">
        <section>
            <img class="benefits-icon" src="../images/culture.png" alt="">
            <h3 class="benefits-item">Explore Cultural Tourism!</h3>
            <p class="benefits-desc">Plan your next trip more thoroughly using this platform. All the information you're looking for is right here.</p>
        </section>
        <section>
            <img class="benefits-icon" src="../images/map.png" alt="">
            <h3 class="benefits-item">Discover the route!</h3>
            <p class="benefits-desc">Get information about the travel route to your destination quickly and without getting lost. Make your journey more comfortable</p>
        </section>
        <section>
            <img class="benefits-icon" src="../images/review.png" alt="">
            <h3 class="benefits-item">Traveler Reviews!</h3>
            <p class="benefits-desc">Discover reviews from travelers who have visited the place before. Check out their comments to make you more confident about visiting it.</p>
        </section>
    </article>
    </article>
    
    <article class="summary">
        <h2 class="title" id="summary-title">Culture of Indonesia</h2>
        <section class="summary-items">
            <img class="summary-img" src="../images/indonesia.png" alt="">
            <p class="summary-desc">Indonesia has a highly diverse cultural tourism, spread from Sabang to Merauke. This cultural heritage must be preserved. The existence of this platform can assist tourists in finding information about cultural attractions they can visit. Of course, it can also introduce Indonesian cultural tourism to the world.</p>
        </section>
    </article>
    
    <article class="about">
        <section class="about-items">
            <img class="about-img" src="../images/landing2.png" alt="">
            <section class="about-grid">
                <h2 class="about-title">About Cultural Voyager</h2>
                <p class="about-desc">Cultural Voyager is a website dedicated to recommendations for cultural tourism in Indonesia. This website promotes cultural tourism to be better known by both local and foreign tourists. Within this website, there will be a list of cultural attractions such as Borobudur Temple, Prambanan Temple, and other lesser-known cultural destinations.</p>
            </section>
        </section>
    </article>
    `;
  },

  async afterRender() {
    try {
      const landingPageHeader = document.querySelector('.heading');
      if (landingPageHeader) {
        landingPageHeader.style.display = 'none';
      }

      const footer = document.querySelector('footer');
      footer.style.display = 'block';

      const homepageHeader = document.querySelector('.landing-head');
      if (homepageHeader) {
        homepageHeader.style.display = 'flex';
      }

      const loginButton = document.getElementById('loginButton');
      if (loginButton) {
        loginButton.addEventListener('click', () => {
          window.location.href = '#/signin';
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

export default landingPage;
