'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/*
 *
 *
 * Geolocation API: Very basics of the API
 *
 *
 */
const learnAboutGeolocation = function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(position);
        console.log(latitude, longitude);
        console.log(
          'https://www.google.com/maps/@45.5578342,-73.532523,14z?entry=ttu'
        );
        console.log(
          `https://www.google.com/maps/@${latitude},${longitude},14z?entry=ttu`
        );
      },
      function () {
        alert('Could not get your position');
      }
    );
};
// learnAboutGeolocation();

/*
 *
 *
 * Leaflet Library: Third Party Library to display maps
 *
 *
 */
const learnAboutLeaflet = function () {
  // review geolocation API
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const coords = [position.coords.latitude, position.coords.longitude];
      console.log(coords[0], coords[1]);

      // learn Leaflet
      // 'map' is a DOM element's ID
      // 13 is the zoom level
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('We could not get your location');
    }
  );
};
learnAboutLeaflet();
