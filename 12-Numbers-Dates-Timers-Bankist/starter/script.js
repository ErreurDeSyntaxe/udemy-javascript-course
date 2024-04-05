'use strict';
const log = console.log;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-03-28T10:17:24.185Z',
    '2024-03-31T14:11:59.604Z',
    '2024-04-01T17:01:17.194Z',
    '2024-04-02T23:36:17.929Z',
    '2024-04-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); // 8 -> 08
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // Set time to 300 seconds
  let time = 300;

  // Call the timer every second
  function tick() {
    const min = Math.trunc(time / 60);
    const sec = `${time % 60}`.padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;
    // When time === 0, stop timer and log out
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease time by 1 sec every sec
    time--;
  }
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    /*
    // Create current date and time
    const now = new Date();
    // labelDate.textContent = now; // Doesn't display a nice-looking message
    const day = `${now.getDate()}`.padStart(2, 0); // 8 -> 08
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minute = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
    */

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'short',
      month: 'numeric',
      // month: 'long',
      // month: '2-digit',
      year: 'numeric',
      // year: '2-digit',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      /*'fr-FR'*/ /*locale*/ currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer if user is active
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // Reset timer if user is active
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const learnAboutNumbers = function () {
  // JavaScript has a crappy way to handle numbers, but there's nothing to bo done
  log(`23 === 23.0 is ${23 === 23.0}`); // true
  log(`0.1 + 0.2 === 0.3 is ${0.1 + 0.2 === 0.3}`); // false 🎉

  // Convert a String to a Number
  log(Number('23'));
  log(+'23');

  // Parse a Number from a String
  log(Number.parseInt('30px', 10)); // outputs a number if the string starts w/ num
  log(Number.parseInt('e23', 10)); // NaN
  log(Number.parseInt('2.5rem')); // 2
  log(Number.parseFloat('2.5rem')); // 2.5

  // Check if something is a NaN // IT'S NOT GREAT
  log(Number.isNaN(20)); // false. it's a number
  log(Number.isNaN('20')); // false. it's a string (not NaN)
  log(Number.isNaN(+'20X')); // true. it's NaN
  log(Number.isNaN(23 / 0)); // false. it's Infinity according to JS
  log(-23 / 0); // -Infinity ∞

  // Check if a value is a Number // IT'S THE BEST WAY TO DO SO
  log(Number.isFinite(20)); // true
  log(Number.isFinite('20')); // false
  log(Number.isFinite(+'20X')); // false
  log(Number.isFinite(23 / 0)); // false

  // Check if a value is an Integer
  log(Number.isInteger(23)); // true
  log(Number.isInteger(23.0)); // true
  log(Number.isInteger(23 / 0)); // false
};
// learnAboutNumbers();

const learnAboutMath = function () {
  log(Math.sqrt(81)); // dedicated square root method
  log(36 ** (1 / 2));
  log(2 ** 3);
  log(8 ** (1 / 3)); // Cubic root

  log(Math.max(5, 543, '9129', 1, -9)); // does type coercion
  log(Math.max(5, 543, '9129px', 1, -9)); // doesn't work because of the letters
  log(Math.min(12, -1, 12, 31251, 121));
  log(Math.PI);
  log(Math.PI * Number.parseFloat('10px') ** 2);

  log(Math.trunc(Math.random() * 6) + 1); // from 1 to 6
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;
  log(randomInt(10, 20));

  // Rounding integers
  log(Math.trunc(23.3)); // 23

  log(Math.round(23.3)); // 23
  log(Math.round(23.9)); // 24

  log(Math.ceil('23.3')); // 24 // Returns a number
  log(Math.ceil(23.9)); // 24

  log(Math.floor(23.3)); // 23
  log(Math.floor(23.9)); // 23
  log(Math.floor(-23.3)); // -24
  log(Math.trunc(-23.3)); // -23

  // Rounding Floating Point Numbers (Decimals)
  log((2.7).toFixed(0)); // '2' // toFixed() returns a STRING
  log((2.7).toFixed(3)); // '2.700'
  log((2.345).toFixed(2)); // '2.35' // Rounded result
  log(+(2.345).toFixed(2)); // 2.35 // A number!
};
// learnAboutMath();

const learnAboutRemainder = function () {
  log(5 % 2); // 1
  log(8 % 6); // 2
  log(100 % 10); // 0

  const isEven = n => n % 2 === 0;

  log(`8 is even: ${isEven(8)}`);
  log(`1 is even: ${isEven(1)}`);
  log(`-8 is even: ${isEven(-8)}`);

  const colorMyThings = function () {
    [...document.querySelectorAll('.movements__row')].forEach(function (
      row,
      i
    ) {
      if (i % 2 === 0) {
        row.style.backgroundColor = 'orangered';
      }
      if (i % 3 === 0) {
        row.style.backgroundColor = 'blue';
      }
    });
  };
  labelBalance.addEventListener('click', colorMyThings);
};
// learnAboutRemainder();

const learnAboutNumericSeparators = function () {
  //287, 460, 000, 000
  const diameter = 287_460_000_000; // the underscores don't matter
  log(diameter);

  // $345.99
  const price = 345_99;
  log(price);

  const transferFee1 = 15_00; // looks like $15.00
  const transferFee2 = 1_500; // looks like $1,500

  log(Number('230_000')); // Doesn't work // NaN
  log(parseInt('230_000')); // 230 Doesn't read the last three 0
};
// learnAboutNumericSeparators();

const learnAboutBIGINT = function () {
  log(2 ** 53 - 1); // The biggest number that JS can store
  log(Number.MAX_SAFE_INTEGER);
  log(2 ** 53 + 1); // Incorrect output

  // Creating Big Int numbers
  log(125234512342343294283491231231234n); // huge number, probably not precise
  log(BigInt(125234512342343294283491231231234)); // Somehow diff ???

  log(10_000n + 10_000n);
  log(10_000n + BigInt(1)); // Error if didn't use BigInt
  // log(10_000n + 1); // TypeError: Cannot mix BigInt and other types
  // log(Math.sqrt(16n)); // TypeError: Cannot convert BigInt

  log(20n > 15); // Can still compare BigInt and other types
  log(20n === 20); // false because === doesn't do type conversion
  log(typeof 20n);

  const huge = 124135234234234234234123n;
  log(huge + ' is REALLY big');

  log(10n / 3n); // CANNOT return a decimal value... it's an integer
  log(11n / 3n);
};
// learnAboutBIGINT();

const learnAboutDates = function () {
  // 1. Empty Date constructor
  const now = new Date();
  log(now);

  // 2. Based on a string
  log(new Date('December 25, 2024'));
  log(new Date(account1.movementsDates[0]));

  // 3. Based on numbers
  log(new Date(2037, 10, 19, 15, 23, 5));
  // year, month (from 0 to 11), day, hour, minutes, seconds
  log(new Date(2037, 10, 31)); // November has 30 days -> JS fixes it to Dec 1st

  // 4. Based on number of milliseconds since Unix Time (Jan 1, 1970)
  log(new Date(0));
  const threeDays = 3 * 24 * 60 * 60 * 1000; // a timestamp
  log(new Date(threeDays)); // 3 days after Unix

  log('+++++++++++++++++++++++++++++++++');
  // Working with dates
  const future = new Date(2037, 10, 19, 15, 23);
  log(future);
  log(future.getFullYear());
  log(future.getMonth()); // 0 to 11
  log(future.getDate()); // the day of the month
  log(future.getDay()); // the day of the week (4 = thursday)
  log(future.getHours());
  log(future.getMinutes());
  log(future.getSeconds());
  log(future.toISOString());
  log(future.getTime()); // the timestamp based on milliseconds since Unix
  log(Date.now()); // the timestamp for now // Don't need a new Date()
  future.setFullYear(2040);
  log(future);
};
// learnAboutDates();

const learnMoreDates = function () {
  const future = new Date(2037, 10, 19, 15, 23);
  log(+future);

  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
  log(days1);
};
// learnMoreDates();

const learnAboutINTL = function () {
  const num = 1543298.12;
  const options = {
    // style: 'unit',
    // style: 'percent',
    style: 'currency',
    currency: 'EUR',
    // useGrouping: false,
    // unit: 'mile-per-hour',
    // unit: 'celsius',
  };

  log(
    'US:'.padEnd(8, ' '),
    new Intl.NumberFormat('en-US', options).format(num)
  );
  log(
    'Germany:'.padEnd(8, ' '),
    new Intl.NumberFormat('de-DE', options).format(num)
  );
  log(
    'Syria:'.padEnd(8, ' '),
    new Intl.NumberFormat('ar-SY', options).format(num)
  );
  log(
    'Taiwan:'.padEnd(8, ' '),
    new Intl.NumberFormat('zh-TW', options).format(num)
  );
  log(
    'France:'.padEnd(8, ' '),
    new Intl.NumberFormat('fr-FR', options).format(num)
  );
  log(
    'Can Ang:'.padEnd(8, ' '),
    new Intl.NumberFormat('en-CA', options).format(num)
  );
  log(
    'Can Fr:'.padEnd(8, ' '),
    new Intl.NumberFormat('fr-CA', options).format(num)
  );
  log(
    navigator.language.padEnd(8, ' '),
    new Intl.NumberFormat(navigator.language, options).format(num)
  );
};
// learnAboutINTL();

/*
 * timers: setTimeout & setInterval
 */
const learnAboutTimers = function () {
  // setTimeout
  const ingredients = ['olives', 'spinach'];

  const pizzaTimer = setTimeout(
    (ing1, ing2) => log(`Pizza with ${ing1} and ${ing2} Delivered 🍕`),
    3000,
    ...ingredients
  );
  log('Waiting for the pizza');
  if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

  // setInterval
  setInterval(() => {
    const now = new Date();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    const seconds = `${now.getSeconds()}`.padStart(2, 0);
    log(`It is now ${hours}:${minutes}:${seconds}`);
  }, 30000);
};
// learnAboutTimers();
