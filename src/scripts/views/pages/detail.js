/* eslint-disable no-alert */
/* eslint-disable no-console */
import UrlParser from '../../routes/urlParse';
import { getCultureDataById, addReview } from '../../globals/db';
import Map from '../../globals/map';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Detail = {
  async render() {
    return `
    <section id="detail-culture" class="detail-culture">
      <h2>Loading...</h2>
    </section>
    <section id="reviewForm" class="review-form">
      <h2>Add Review</h2>
      <form id="reviewForm">
        <input type="text" id="reviewerName" placeholder="Name">
        <textarea id="reviewContent" placeholder="Your Review"></textarea>
        <label for="reviewImage" class="custom-file-input"><img class="home-img" src="./images/upphoto.png" alt="">
        <p>Choose Image</p></label>
        <input type="file" id="reviewImage" accept="image/*" />
        <img id="uploadedImage" src="" alt="Uploaded Image" style="display: none;" />
        
       
        <button id="submitReview">Submit Review</button>
      </form>
    </section>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombinerWithoutLower();
    const cultureId = url.id;

    try {
      const detailCultureSection = document.getElementById('detail-culture');

      const cultureData = await getCultureDataById(cultureId);

      if (cultureData) {
        detailCultureSection.innerHTML = `
        <section class="detail">
      <article class="detail-head">
        <h2 class="detai-title">${cultureData.name}</h2>
        <img class="lazyload" data-src="${cultureData.picture}" alt="${cultureData.name}" />
      </article>
      <article class="detail-info">
        <h4>Address</h4>
        <p>${cultureData.address}</p>
        <h4>City</h4>
        <p>${cultureData.city}</p>
      </article>
    </section>

    <section class="detail-desc">
      <h4>Description</h4>
      <p>${cultureData.description}</p>
      <h4 class="location">Location</h4>
      <div id="map"></div>
    </section>
    

    <section id="reviews-section">
        <h2>Reviews</h2>
        <ul id="reviews-list"></ul>
      </section>
    `;

        const mapElement = document.getElementById('map');

        try {
          const googleMaps = await Map.loadGoogleMapsApi();
          Map.createMap(googleMaps, mapElement, cultureData.location);
        } catch (error) {
          console.error('Error loading Google Maps API:', error.message);
        }

        const reviewsSection = document.getElementById('reviews-section');
        const reviewsList = document.getElementById('reviews-list');

        const reviews = cultureData.review;
        if (reviews) {
          Object.values(reviews).forEach((review) => {
            const reviewItem = document.createElement('li');
            reviewItem.innerHTML = `
          
          <h3>${review.name}</h3>
          <p>${review.comment}</p>
          <img src="${review.addPicture}" class="review-img">
          
        `;

            reviewsList.appendChild(reviewItem);
          });
        } else {
          reviewsSection.innerHTML = '';
        }
      } else {
        console.warn('culture data not found for ID:', cultureId);
        detailCultureSection.innerHTML = '<p>Data not found</p>';
      }
    } catch (error) {
      console.error('Error fetching culture data:', error.message);
    }

    const submitReviewButton = document.getElementById('submitReview');
    submitReviewButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const reviewerName = document.getElementById('reviewerName').value;
      const reviewContent = document.getElementById('reviewContent').value;
      const reviewImage = document.getElementById('reviewImage').files[0];

      if (reviewerName && reviewContent) {
        try {
          await addReview(cultureId, {
            name: reviewerName,
            comment: reviewContent,
            reviewImageFile: reviewImage,
          });

          document.getElementById('reviewerName').value = '';
          document.getElementById('reviewContent').value = '';
          document.getElementById('reviewImage').value = '';
          document.getElementById('uploadedImage').src = '';

          window.location.reload();
        } catch (error) {
          console.error('Error submitting review:', error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    });

    const reviewImage = document.getElementById('reviewImage');

    reviewImage.addEventListener('change', () => {
      const uploadedImage = document.getElementById('uploadedImage');
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImage.src = reader.result;
        uploadedImage.style.display = 'block';
      };
      reader.readAsDataURL(reviewImage.files[0]);
    });

    const landingPageHeader = document.querySelector('.landing-head');
    if (landingPageHeader) {
      landingPageHeader.style.display = 'none';
    }

    const homepageHeader = document.querySelector('.heading');
    if (homepageHeader) {
      homepageHeader.style.display = 'flex';
    }

    const footer = document.querySelector('footer');
    footer.style.display = 'block';
  },
};

export default Detail;
