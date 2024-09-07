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
learnAboutPromises();

/*
 * Callback Hell:
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
  console.log(data?.borders);

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

  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryAndNeighbors = function (countryName) {
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
// getCountryAndNeighbors('germany');

/*
 * XML Requests: The Basics
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
