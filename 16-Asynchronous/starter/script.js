'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
 *
 *
 * Learning Section: Asynchronous JS, Promises, Async/Await, AJAX, APIs
 *
 *
 */

// course update: the API changed its URL

/*
 * Display a message for the user to explain the error
 */
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

/*
 * renderCountry function [NEEDED FOR THE WHOLE SECTION]
 */
const renderCountry = function (data, className = '') {
  let languages = '';
  for (const [langCode, langName] of Object.entries(data.languages)) {
    languages += `${langName} & `;
  }
  languages = languages.slice(0, -3);

  let currencies = '';
  for (const [curCode, curName] of Object.entries(data.currencies)) {
    currencies += `${curName.name}`;
  }

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1_000_000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${languages}</p>
          <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
      </article>`;

  // countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

/*
 * renderCountryAndNeighbor function
 * [DEMO CALLBACK HELL, where callbacks are nested deeply into callbacks]
 */
const renderCountryAndNeighbor = function (countryName) {
  // AJAX call for country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`); // async
  request.send(); // async
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get the first neighbor
    let neighbors = data?.borders?.[0]; // limit to just one neighbor
    if (!neighbors) return;
    console.log(neighbors);

    neighbors = [neighbors]; // limiti to just one neighbor
    neighbors.forEach(neighbor => {
      // AJAX call for country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`); // async
      request2.send(); // async
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};
// renderCountryAndNeighbor('germany');

/*
 * getJSON: fetch, then, catch, handle (all in one)
 */
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/*
 * Sequential AJAX calls with Promises & Error Handling (catching)
 */
const sequentialAJAX = function (countryName) {
  getJSON(
    `https://restcountries.com/v3.1/name/${countryName}`,
    `Country (${countryName}) not found`
  )
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbor = data[0]?.borders?.[0];

      if (!neighbor) throw new Error('No neighbor found');

      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally((countriesContainer.style.opacity = 1));

  /*
  OLD CODE: NOW THE HANDLING OF FETCH/CATCH IS EXPORTED TO getJSON
  OLD CODE: NOW THE HANDLING OF FETCH/CATCH IS EXPORTED TO getJSON
  OLD CODE: NOW THE HANDLING OF FETCH/CATCH IS EXPORTED TO getJSON
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      console.log(response);

      if (!response.ok) {
        throw new Error(
          `Country (${countryName}) not found (${response.status})`
        );
      }

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0]?.borders?.[0];

      if (!neighbor) return;

      // neighboring country
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥 ${err.message}. Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
    */
  // .then(response => response.json())
  // .then(data => {
  //   renderCountry(data[0], 'neighbour');
  //   const neighbor = data[0]?.borders?.[1];
  //   if (!neighbor) return;
  //   return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
  // });
  // instead of creating a triangle (indicating callback hell),
  // chained promises are flat. their indentation is the same
  // it's easier to reason and fix/add to
};

/*
 * Simulate loss of internet connexion
 */
btn.addEventListener('click', function () {
  sequentialAJAX('taiwan');
});

/*
 * Promises: Rendering one country with promises instead of XMLHttpRequest
 */
const getCountryDataPromise = function (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
// getCountryDataPromise('canada');

/*
 * Promises: A way to escape callback hell
 */
const learnAboutPromises = function () {
  // how it used to be done
  // const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.com/v3.1/name/portugal`);
  // request.send();
  // request.addEventListener('load', function () {
  //   console.log('async JS');
  // });

  const request = fetch('https://restcountries.com/v3.1/name/portugal');
  console.log(request); // fetch immediately store the promise in the var
  setTimeout(function () {
    console.log(request);
  }, 5000); // later, the promise is settled (either fulfilled or rejected)
};
// learnAboutPromises();

/*
 * XML Requests: The Basics of the Old School
 */
const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`); // async
  request.send(); // async
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    let languages = '';
    for (const [langCode, langName] of Object.entries(data.languages)) {
      languages += `${langName} & `;
    }
    languages = languages.slice(0, -3);

    let currencies = '';
    for (const [curCode, curName] of Object.entries(data.currencies)) {
      currencies += `${curName.name}`;
    }

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flags.svg}"/>
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1_000_000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${languages}</p>
          <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
      </article>`;

    countriesContainer.style.opacity = 1;
    countriesContainer.insertAdjacentHTML('beforeend', html);
  });
};
// getCountryData('taiwan');
// getCountryData('canada');

/*
 * Synchronous vs Asynchronous
 */
const learnAboutSynchronous = function () {
  const para = document.querySelector('.p'); // synchronous
  setTimeout(() => (para.style.color = 'red'), 2000); // defered
  para.textContent = 'Xavier'; // sync
  // the color is set to 'red' way after the content it set to 'Xavier'
  // as opposed to immediately set to red

  const img = document.createElement('img');
  img.src = '';
  // this action is asynchronous although it looks synchronous
  img.addEventListener('load', () => (img.style.height = '200px'));
  // this action is synchronous. event listeners are NOT async
};
// learnAboutSynchronous();

/*
 * Coding Challenge 1: Reverse Geocoding
 */
const challenge1 = function () {
  const delegatedFetch = function (url, errorMsg = 'There was an error') {
    // was missing 'return'
    return fetch(url).then(response => {
      if (!response.ok) throw new Error('Problem with geocoding API');
      console.log(response);
      return response.json();
    });
  };

  const whereAmI = function (lat, lng) {
    console.log(`latitude: ${lat}, longitude: ${lng}`);
    delegatedFetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`,
      'Coordinates not found'
    )
      .then(data => {
        if (data?.error?.code === '018')
          throw new Error('Could not find a city at these coordinates');
        if (data.city === 'Throttled! See geocode.xyz/pricing')
          throw new Error('You are making too many requests');
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
          .then(response => {
            if (!response.ok) throw new Error('Country not found');

            return response.json();
          })
          .then(data => {
            renderCountry(data[0]);
          });
      })
      .catch(err => {
        console.error(err);
        renderError(err.message);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  // whereAmI(22.6273, 120.3014);
  // whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  // whereAmI(-33.933, 18.474);
  navigator.geolocation.getCurrentPosition(geoObject =>
    whereAmI(geoObject.coords.latitude, geoObject.coords.longitude)
  );
};
// challenge1();

/*
 * Event Loop Practice: JavaScript timers are NOT reliable
 */
const eventLoopPractice = function () {
  // top-level code executed first: 1
  console.log('Test Start');
  // callbacks in the queue executed last: 5
  setTimeout(() => console.log('0-second timer'), 0);
  // micro-tasks executed second: 3
  Promise.resolve('Resolved promise 1').then(res => console.log(res));
  // micro-tasks executed second: 4
  Promise.resolve('Resolved promise 2').then(res => {
    for (let i = -1_000_000_00; i < 1_000_000_000; i++) {
      const x = 1;
    }
    // 4 (because it's part of micro-tast executed second: 4)
    console.log(res);
  });
  // top-level code executed first: 2
  console.log('Test End');
};
// eventLoopPractice();

/*
 * Building a Promise
 */
const buildPromise1 = function () {
  const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery being drawn');
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve('You win! 💰💰💰');
      } else {
        reject(new Error('You lose... 💩'));
      }
    }, 1500);
  });
  lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
};
// buildPromise1();

/*
 * Promisifying setTimeout
 */
const buildPromise2 = function () {
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(seconds), seconds * 1000);
    });
  };
  wait(1.5)
    .then(res => {
      console.log(`I waited ${res} seconds`);
      return wait(1);
    })
    .then(res => console.log(`I waited ${res} seconds more`));
};
// buildPromise2();
