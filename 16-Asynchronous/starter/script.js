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
// https://countries-api-836d.onrender.com/countries/

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
