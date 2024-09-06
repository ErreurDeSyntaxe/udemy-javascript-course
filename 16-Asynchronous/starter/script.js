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
 * Callback Hell:
 */
const getCountryAndNeighbors = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`); // async
  request.send(); // async
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

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
getCountryAndNeighbors('usa');

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
