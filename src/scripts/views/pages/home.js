import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase/Firebase";

/* eslint-disable max-len */
const Homepage = {
  async render() {
    return `
    
    <section class="home">
    <img class="home-img" src="./images/home.png" alt="">
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
      try {
        // Check user authentication status before rendering
        const user = await checkAuthentication();

        // If the promise resolves, the user is authenticated
        console.log("User is authenticated:", user);

        // Render the home page content here
      } catch (error) {
        alert("login sebelum masuk ke home");
        // If the promise rejects, the user is not authenticated
        console.error("Authentication error:", error);
        // Redirect to the login page or handle unauthorized access
        window.location.href = "/#/signin";
      }

      const response = await fetch("./data/dummy.json");
      const data = await response.json();
      this.updateCultureList(data.cultures);

      // Menambahkan event listener untuk form pencarian
      const searchForm = document.getElementById("searchForm");
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        Homepage.searchCultures(data);
      });
      const landingPageHeader = document.querySelector(".landing-head");
      if (landingPageHeader) {
        landingPageHeader.style.display = "none";
      }

      // Tampilkan Homepage Header
      const homepageHeader = document.querySelector(".heading");
      if (homepageHeader) {
        homepageHeader.style.display = "flex";
      }
      // Fetch weather data for Jakarta
      const weatherData = await this.fetchWeatherData(
        "Jakarta",
        "dbe5889baa9a6b2e6fbb81ec46c1cd96"
      );
      console.log("Weather in Jakarta:", weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  updateCultureList(cultures) {
    const cultureListElement = document.getElementById('culture-list');
  
    const cultureItemsHTML = cultures.map((culture) => `
      <section class="culture-card">
        <article class="culture-item">
          <img src="${culture.picture}" alt="${culture.name} Picture" class="culture-picture">
        </article>
        <article class="culture-descript">
          <h2><a href="/#/detail/" style="color: #CE5A18; font-family: Poppins; font-size: 20px;font-style: normal;font-weight: 600;line-height: normal;">${culture.name}</a></h2>
          <p>${culture.description}</p>
        </article>
      </section>
    `).join('');
  
    cultureListElement.innerHTML = cultureItemsHTML;
  },
  

  searchCultures(data) {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cultureListElement = document.getElementById("culture-list");

    const matchingCultures = data.cultures.filter(
      (culture) =>
        culture.name.toLowerCase().includes(searchTerm) ||
        culture.description.toLowerCase().includes(searchTerm)
    );

    this.updateCultureList(matchingCultures);

    if (matchingCultures.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.classList.add("nothing");
      noResultsMessage.textContent =
        "Tidak ada hasil yang sesuai dengan pencarian.";
      cultureListElement.appendChild(noResultsMessage);
    }
  },
  async fetchWeatherData(city, apiKey) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(weatherApiUrl);
    const weatherData = await response.json();
    return weatherData;
  },
};

// Function to check user authentication status
function checkAuthentication() {
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        resolve(user);
      } else {
        // User is not authenticated
        reject("User is not authenticated");
      }
    });
  });
}

export default Homepage;
