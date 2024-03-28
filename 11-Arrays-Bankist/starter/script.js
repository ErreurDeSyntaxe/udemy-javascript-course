'use strict';
const log = console.log;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/*
 *
 * Simple DOM Manipulation
 *
 */
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // Not the same as containerMovements.textContent

  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
 *
 * forEach Used on Maps and Sets
 *
 */
const learnAboutMapsAndsSets = function () {
  currencies.forEach(function (value, key, map) {
    log(`${key}: ${value}`);
    log(map);
  });

  const currenciesUnique = new Set(['USD', 'GBP', 'EUR']);
  currenciesUnique.forEach(function (value, _, set) {
    log(`${value}: ${_}`); // An underscore is sometimes understood as a throwaway
    log(set);
    // A set doesn't have keys, but in order to keep all forEach methods the same
    // JS decided to keep the key argument in the Set method.
  });
};
// learnAboutMapsAndsSets();

/*
 *
 * forEach Used on Arrays
 *
 */
const learnAboutForEach = function () {
  const usingForOf = function () {
    for (const [index, movement] of movements.entries()) {
      if (movement > 0) {
        log(`Transaction ${index + 1}: You deposited $${movement}`);
      } else {
        log(`Transaction ${index + 1}: You withdrew $${Math.abs(movement)}`);
      }
    }
  };
  usingForOf();

  log('----- FOREACH -----');
  const usingForEach = function () {
    // Loops over the array. At each iteration, forEach passes three arguments:
    // the current element, the index of the element, and the whole array
    movements.forEach(function (movement, index, array) {
      // The anonymous function is a callback function
      log(
        movements > 0
          ? `Transaction ${index + 1}You deposited $${movement}`
          : `Transaction ${index + 1}You withdrew $${Math.abs(movement)}`
      );
    });
  };
  usingForEach();
};
// learnAboutForEach();

/*
 *
 * Basic Array Methods: Slice, Splice, Reverse, Join, At
 *
 */
const learnBasicMethods = function () {
  const anArray = ['a', 'b', 'c', 'd', 'e'];

  /*
   * Slice: returns a new array, does NOT modify the original array
   */
  log(anArray.slice(2)); // returns a new array ['c', 'd', 'e']
  log(anArray.slice(2, 4)); // returns 2 to 3 ['c', 'd']
  log(anArray.slice(-1)); // ['e']
  log(anArray.slice(-2)); // ['d', 'e']
  log(anArray.slice()); // shallow copy of the entire array
  log([...anArray]); // shallow copy of the entire array

  /*
   * Splice: mutates the array
   */
  log(anArray.splice(2)); // from 2 to the end
  log(anArray); // contains 0 and 1. 2, 3, 4 are gone
  log(anArray.splice(-1)); // took out the last element of the array
  log(anArray); // contains only 0
  anArray.push('b', 'c', 'd', 'e'); // back to the original content
  anArray.splice(1, 2); // from position 1 remove 2 elements
  log(anArray); // contains 0, 3, 4

  /*
   * Reverse: Mutates the original array & Returns the reversed array
   */
  const anotherArray = ['j', 'i', 'h', 'g', 'f'];
  log(anotherArray.reverse());
  log(anotherArray); // 'f', 'g', 'h',...

  /*
   * Concat: Returns a merged array
   */
  log(anotherArray.concat('Xavier'));
  log(anotherArray); // Original array NOT mutated
  log([...anArray, ...anotherArray]); // same as anArray.concat(anotherArray);

  /*
   * Join: Returns a string of all array items joined by a specified char
   */
  log(anotherArray.join('-'));
  log(anotherArray); // Not modified

  /*
   * At: A replacement for the bracket notation (also works on strings)
   */
  const aNewArray = [23, 11, 17];
  log(aNewArray.at(0));
  log(aNewArray[0]);
  // Getting the last element of the array w/o knowing the length
  log(aNewArray[aNewArray.length - 1]); // last element
  log(aNewArray.slice(-1)[0]); // first (and only) element return by slice
  log(aNewArray.at(-1)); // last element, like slice and splice
  log('Xavier'.at(0));
};
// learnBasicMethods();

/*
 *
 * Coding Challenge #1
 *
 */
const codingChallenge1 = function () {
  /*
   * test data
   */
  const julia1 = [3, 5, 2, 12, 7];
  const kate1 = [4, 1, 15, 8, 3];
  const julia2 = [9, 16, 6, 8, 3];
  const kate2 = [10, 5, 6, 1, 4];
  /*
   * test data
   */
  const checkDogs = function (dogsJulia, dogsKate) {
    const dogs = [...dogsJulia.slice(1, -2), ...dogsKate];
    dogs.forEach(function (age, index) {
      const verdict =
        age >= 3 ? `an adult and is ${age} years old` : 'still a puppy 🐶';
      log(`Dog number ${index + 1} is ${verdict}`);
    });
  };
  log('------------ FIRST TEST ------------');
  checkDogs(julia1, kate1);
  log('------------ SECOND TEST ------------');
  checkDogs(julia2, kate2);
};
// codingChallenge1();

/*
 *
 * Powerful Array Methods: Map, Filter, Reduce
 *
 */
const dataTransformation = function () {
  const mapMethod = function () {};
  mapMethod();
  const filterMethod = function () {};
  filterMethod();
  const reduceMethod = function () {};
  reduceMethod();
};
dataTransformation();
