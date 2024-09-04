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
 * Project Building: START
 *
 *
 */

/*
 * Workout: The parent class
 */
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

/*
 * Running: Child class
 */
class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // minutes/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

/*
 * Cycling: Child class
 */
class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
// setTimeout so the IDs are different
setTimeout(() => {
  const bike1 = new Cycling([39, -12], 27, 95, 523);
  console.log(run1, bike1);
}, 10);

/*
 * The Application: The map, the events (click & submit)
 */
class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Respond to form select field
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.log(`We could not obtain your position`);
        }
      );
  }

  _loadMap(position) {
    const coords = [position.coords.latitude, position.coords.longitude];
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handle clicks on the map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validateInput = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const checkPositive = (...inputs) => inputs.every(input => input > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Create appropriate object
    if (type === 'running') {
      // Check data validity
      const cadence = +inputCadence.value;
      if (
        !validateInput(distance, duration, cadence) ||
        !checkPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      // Check data validity
      const elevation = +inputElevation.value;
      if (
        !validateInput(distance, duration, elevation) ||
        !checkPositive(distance, duration)
      )
        return alert(
          'Distance and duration must be positive numbers! Elevation may be negative.'
        );
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add workout to array
    this.#workouts.push(workout);
    console.log(workout);
    console.log(this.#workouts);

    // Render workout on the map
    this.renderWorkoutMarker(workout);

    // Render work on the list

    // Hide the form

    // Clear the form
    inputCadence.value = '';
    inputDistance.value = '';
    inputDuration.value = '';
    inputElevation.value = '';
  }

  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.distance + '')
      .openPopup();
  }
}

const app = new App();
/*
 *
 *
 * Project Building: END
 *
 *
 */

/*
 *
 *
 * Learning Section: Geolocation, Leaflet, Form
 *
 *
 */

/*
 *
 * Geolocation API: Very basics of the API
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
 * Leaflet Library: Third Party Library to display maps
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
      // addEventLister on map
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Leaflet's addEventListener
      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout!')
          .openPopup();
      });
    },
    function () {
      alert('We could not get your location');
    }
  );
};
// learnAboutLeaflet();

/*
 *
 * Popup Form
 *
 */
const displayPopupForm = function () {
  // global variables
  let map;
  let mapEvent;

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const coords = [position.coords.latitude, position.coords.longitude];
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handle clicks on the map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        const { lat, lng } = mapEvent.latlng;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      console.log(`We could not obtain your position`);
    }
  );

  // Display the markers on the map
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Clear the form
    inputCadence.value = '';
    inputDistance.value = '';
    inputDuration.value = '';
    inputElevation.value = '';
    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout!')
      .openPopup();
  });

  // Respond to form select field
  inputType.addEventListener('change', function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  });
};
// displayPopupForm();
