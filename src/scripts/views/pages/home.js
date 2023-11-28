/* eslint-disable max-len */
const Homepage = {
  async render() {
    return `

    <section class="home">
    <img src="./images/home.png" alt="">
      <article class="home-inner">
        <h1 class="home-title">Explore Cultural Tourism in Indonesia</h1>
        <p class="home-ket">
        Let's uncover the charm of Indonesia through an exciting journey to cultural heritage sites rich in history and beauty!
        </p>
      </article>
    </section>
    <section class="search">
    <p>Search for the cultural tourism you desire.</p>
    <form id="searchForm">
        <input type="text" id="searchInput" name="searchInput" placeholder="Type here...">
        <button type="submit">Search</button>
    </form>
    </section>
    <section class="menu-label">
        <h1 class="label-title"> Explore Cultural Tourism </h1>
        <article id="culture-list" class="culture-list">
        </article>
    </section>
    `;
  },

  async afterRender() {
    try {
      const response = await fetch('./data/dummy.json');
      const data = await response.json();
      this.updateCultureList(data.cultures);

      // Menambahkan event listener untuk form pencarian
      const searchForm = document.getElementById('searchForm');
      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        Homepage.searchCultures(data); // Mengirimkan data sebagai argumen
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  updateCultureList(cultures) {
    const cultureListElement = document.getElementById('culture-list');

    const cultureItemsHTML = cultures.map((culture) => `
    <section class="restaurant-card">
    <article class="restaurant-item">
      <img src="${culture.picture}" alt="${culture.name} Picture" class="culture-picture">
    </article>
    <article class="restaurant-descript">
      <h2>${culture.name}</h2>
      <p>${culture.description}</p>
    </article>
  </section>
    `).join('');

    cultureListElement.innerHTML = cultureItemsHTML;
  },

  searchCultures(data) {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cultureListElement = document.getElementById('culture-list');

    const matchingCultures = data.cultures.filter((culture) => culture.name.toLowerCase().includes(searchTerm) || culture.description.toLowerCase().includes(searchTerm));

    this.updateCultureList(matchingCultures);

    if (matchingCultures.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.classList.add('nothing');
      noResultsMessage.textContent = 'Tidak ada hasil yang sesuai dengan pencarian.';
      cultureListElement.appendChild(noResultsMessage);
    }
  },
};

export default Homepage;
