/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getCultureData } from '../../globals/db';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import firebaseApp from '../../globals/config';

const Homepage = {
  async render() {
    return `
    <section>
      <section class="home">
        <img class="home-img" src="./images/home.png" alt="">
        <section class="weather">
        <h2 class="weather-title"> <span id="locationName"></span></h2>
        <div id="weatherInfo" class="weather-info"></div>
      </section>
      
        <section class="home-inner">
          <h1 class="home-title">Explore Cultural Tourism in Indonesia</h1>
          <p class="home-ket">
            Let's uncover the charm of Indonesia through an exciting journey to cultural heritage sites rich in history and beauty!
          </p>
        </section>
      </section>
      <section class="search" id="search" tabindex="0">
        <p>Search for the cultural tourism you desire.</p>
        <form id="searchForm">
          <input type="text" id="searchInput" name="searchInput" placeholder="Type here...">
          <button type="submit">Search</button>
        </form>
      </section>
      <section class="menu-label">
        <h1 class="label-title"> Explore Cultural Tourism </h1>
        <article id="culture-list" class="culture-list"></article>
      </section>
    `;
  },

  async afterRender() {
    try {
      try {
        const user = await checkAuthentication();

        console.log('User is authenticated:', user);
      } catch (error) {
        alert('Login terlebih dahulu');
        console.error('Authentication error:', error);
        window.location.href = '/#/signin';
      }

      getCultureData((data) => {
        this.updateCultureList(data);
      });

      const searchForm = document.getElementById('searchForm');
      if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const searchInput = document.getElementById('searchInput');
          const searchTerm = searchInput.value.trim().toLowerCase();
          await this.handleSearch(searchTerm);
        });
      }

      const landingPageHeader = document.querySelector('.landing-head');
      if (landingPageHeader) {
        landingPageHeader.style.display = 'none';
      }

      const homepageHeader = document.querySelector('.heading');
      if (homepageHeader) {
        homepageHeader.style.display = 'flex';
      }

      await this.handleWeatherData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  async handleWeatherData() {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const locationName = await this.getCityName(latitude, longitude, 'dbe5889baa9a6b2e6fbb81ec46c1cd96');
              document.getElementById('locationName').textContent = locationName;
              const weatherData = await this.fetchWeatherData(latitude, longitude);
              this.displayWeatherData(weatherData);
            } catch (error) {
              console.error('Error getting weather data:', error);
              this.displayWeatherError();
            }
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            this.displayWeatherError();
          },
        );
      } else {
        console.error('Geolocation is not supported.');
        this.displayWeatherError();
      }
    } catch (error) {
      console.error('Error handling weather data:', error);
      this.displayWeatherError();
    }
  },

  updateCultureList(cultures) {
    const sortedCultures = cultures.sort((a, b) => a.name.localeCompare(b.name));

    const cultureListElement = document.getElementById('culture-list');

    const cultureItemsHTML = sortedCultures.map((culture) => `
      <section class="culture-card">
        <article class="culture-item">
         <a href="#/detail/${culture.id}">
          <img class="lazyload" data-src="${culture.picture}" alt="${culture.name} Picture" class="culture-picture">
        </a>
        </article>
        <article class="culture-descript">
        <a href="#/detail/${culture.id}">
          <h2>${culture.name}</h2>
          <p>${culture.description}</p>
        </a>
        </article>
      </section>
    `).join('');

    cultureListElement.innerHTML = cultureItemsHTML;
  },

  async handleSearch(searchTerm) {
    try {
      getCultureData((data) => {
        const filteredCultures = data.filter((culture) => culture.name.toLowerCase().includes(searchTerm));

        if (filteredCultures.length > 0) {
          this.updateCultureList(filteredCultures);
        } else {
          this.displayNoResultsMessage();
        }
      });
    } catch (error) {
      console.error('Error handling search:', error);
    }
  },

  displayNoResultsMessage() {
    const cultureListElement = document.getElementById('culture-list');
    cultureListElement.innerHTML = '<p class="no-results-message">No matching data found.</p>';
  },

  // WEATHER

  async fetchWeatherData(latitude, longitude) {
    try {
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dbe5889baa9a6b2e6fbb81ec46c1cd96`;
      const response = await fetch(weatherApiUrl);
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  displayWeatherData(weatherData) {
    const weatherInfoElement = document.getElementById('weatherInfo');

    if (weatherData && weatherData.weather && weatherData.main) {
      const temperature = Math.round(weatherData.main.temp - 273.15);
      const { description } = weatherData.weather[0];
      const { icon } = weatherData.weather[0];

      const weatherHTML = `
        <div class="weather-icon">
          <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        </div>
        <div class="weather-details">
          <p class="temperature">${temperature}°C</p>
          <p class="description">${description}</p>
        </div>
      `;

      weatherInfoElement.innerHTML = weatherHTML;
    } else {
      this.displayWeatherError();
    }
  },

  displayWeatherError() {
    const weatherInfoElement = document.getElementById('weatherInfo');
    weatherInfoElement.innerHTML = '<p class="error-message">Failed to get weather data.</p>';
  },

  async getCityName(latitude, longitude, apiKey) {
    try {
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      const response = await fetch(weatherApiUrl);
      const weatherData = await response.json();

      if (weatherData.name) {
        return weatherData.name;
      }
      throw new Error('City name not found.');
    } catch (error) {
      console.error('Error in fetching city name:', error);
      throw error;
    }
  },

};

const footer = document.querySelector('footer');
footer.style.display = 'block';

const checkAuthentication = () => {
  const auth = getAuth(firebaseApp);

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User is not authenticated'));
      }
    });
  });
};

export default Homepage;
