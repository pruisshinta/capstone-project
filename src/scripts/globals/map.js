/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-undef */

import { Loader } from '@googlemaps/js-api-loader';

class Map {
  static loadGoogleMapsApi() {
    return new Promise((resolve, reject) => {
      // Cek apakah API Google Maps sudah dimuat sebelumnya
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwuxRVJSQp_F79qM0zH1rCIEY6pMzUXY0&libraries=places&callback=initMap';
        script.defer = true;
        script.async = true;

        window.initMap = () => {
          // Callback ini akan dipanggil ketika API berhasil dimuat
          resolve(google.maps);
        };

        script.onerror = () => {
          // Callback ini akan dipanggil jika terjadi kesalahan saat memuat API
          reject(new Error('Failed to load Google Maps API.'));
        };

        document.head.appendChild(script);
      }
    });
  }

  static createMap(googleMaps, mapElement, cultureData) {
    const { latitude, longitude } = cultureData;

    const map = new googleMaps.Map(mapElement, {
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      zoom: 8,
    });

    // Tambahkan marker ke peta
    new googleMaps.Marker({
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      map,
      title: cultureData.name,
    });

    return map;
  }
}

export default Map;
