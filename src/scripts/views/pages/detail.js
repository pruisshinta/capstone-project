import UrlParser from '../../routes/urlParse';
import dummy from '../../../public/data/dummy.json';
import ThecultureDbSource from '../../../public/data/cultureDb';

const Detail = {
  async render() {
    return `
    <main>
      <div class="container">
      <img class="home-img" src="./images/signup.png" alt="">
        <div class="informasi">
          <p class="tempatdestinasi">Prambanan Temple</p>
          <p class="keterangan">City</p>
          <p class="keteranganisi">Daerah Istimewah Yogyakarta</p>
          <p class="keterangan">Address</p>
          <p class="keteranganisi">
            Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec.
            Prambanan, Kabupaten Sleman, DIY.
          </p>
        </div>
      </div>
      <div class="deskripsi">
        <p style="font-weight: bold">Description</p>
        <p>
          Prambanan Temple, also known as Rara Jonggrang, is a 9th-century Hindu
          temple compound in Central Java, Indonesia. This UNESCO World Heritage
          site is renowned for its stunning architecture and intricate stone
          carvings, showcasing the grandeur of ancient Javanese art and culture.
          Dedicated to the Trimurti, the three main Hindu deities—Brahma,
          Vishnu, and Shiva—the temple complex includes towering shrines, each
          adorned with detailed reliefs depicting epic Hindu legends and
          mythological stories. The main Shiva temple stands at 47 meters high,
          surrounded by smaller temples, pavilions, and numerous shrines.
          Prambanan is a testament to Indonesia's rich cultural heritage and a
          must-visit for those interested in exploring the historical and
          artistic wonders of the region.
        </p>
      </div>
      <div class="route">
        <p style="font-weight: bold">Get the route!</p>

      </div>
      <div style="max-width:100%;list-style:none; transition: none;overflow:hidden;width:700px;height:250px;"><div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;"><iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=Prambanan+Temple,+Jalan+Raya+Solo+-+Yogyakarta,+Kranggan,+Bokoharjo,+Sleman+Regency,+Special+Region+of+Yogyakarta,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe></div><a class="code-for-google-map" href="https://www.bootstrapskins.com/themes" id="get-data-for-map">premium bootstrap themes</a><style>#gmap-canvas img{max-width:none!important;background:none!important;font-size: inherit;font-weight:inherit;}</style></div>

      <div class="review">
        <p style="font-weight: bold">Review</p>
        <div class="isireview">
          <div>
            <img
              class="bagiankanan"
              src="./images/landing2.png"
              alt=""/>
          </div>
          <div class="bagiankiri">
            <img class="fotoreview" src="./images/Ellipse.jpg" alt="" />
            <p class="user">applupy</p>
            <div>
              <p class="komenan">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="addkomen">
        <p style="font-weight: bold">Add Reviews</p>
        <div class="tambahkankomen">
          <p>type here....</p>
        </div>
        <div class="addfoto">
          <img src="./images/material-symbols_add-a-photo.png" alt="" />
          Add photos
        </div>
      </div>
      <div class="button">Submit</div>
    </main>
        `;
  },

  async afterRender() {
    try {
      const response = await fetch('./data/dummy.json');
      const data = await response.json();
      this.updateCultureList(data.cultures);

     
      const landingPageHeader = document.querySelector('.landing-head');
      if (landingPageHeader) {
        landingPageHeader.style.display = 'none';
      }

      // Tampilkan Homepage Header
      const homepageHeader = document.querySelector('.heading');
      if (homepageHeader) {
        homepageHeader.style.display = 'flex';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

}

export default Detail;
