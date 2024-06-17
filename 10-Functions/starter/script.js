'use strict';
const log = console.log;

/*
 *
 * Default Parameters: How to set default values to avoid bugs
 *
 */
const learnAboutDefaults = function () {
  const bookings = [];

  // ES6 way of dealing with missing parameters
  const createBooking = function (
    flightNum,
    passCount = 1,
    price = 199 * passCount
  ) {
    // ES5 way of dealing with missing parameters
    // passCount = passCount || 1;
    // price = price || 199;

    const booking = {
      flightNum,
      passCount,
      price,
    };
    log(booking);
    bookings.push(booking);
  };
  createBooking('AC123');
  createBooking('AC123', 2, 800);
  createBooking('AC123', 6);
  createBooking('AC123', undefined, 800); // A way of using the default value
};
// learnAboutDefaults();

/*
 *
 * Passing Arguments: by reference vs by value
 *
 */
const learnAboutArguments = function () {
  const flight = 'LH234';
  const xavier = {
    name: 'Xavier Bertrand',
    passport: 'HDMI3.1',
  };

  const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'; // A copy of the original string
    passenger.name = 'Mr. ' + passenger.name; // A reference to the original

    // if (passenger.passport === 'HDMI3.1') {
    //   alert('Checked in');
    // } else {
    //   alert('Wrong passport');
    // }
  };

  checkIn(flight, xavier);
  log(flight); // Flight number is still LH234, not LH999
  log(xavier);

  const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000);
  };

  newPassport(xavier); // Modifies the passport
  checkIn(flight, xavier); // Passports don't match anymore
};
// learnAboutArguments();

/*
 *
 * Functions as First Class Citizens
 *
 */
const learnAboutFunctions = function () {
  const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
  };

  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
  };

  // Higher-order function bc takes a function or returns a function
  const transformer = function (str, fn) {
    log(`Original string: ${str}`);
    log(`Transformed string: ${fn(str)}`);
    log(`Transformed by: ${fn.name}`);
  };

  transformer('JavaScript is the best!', upperFirstWord);
  transformer('JavaScript is the best!', oneWord);
  // JS uses callbacks all the time
  const high5 = function () {
    log('Hi 5!');
  };
  document.body.addEventListener('click', high5);

  const testFunctionKnowledge = function () {
    const paintPicture = function (artistName) {
      log(`${artistName} drew this: (╯°□°)╯︵ ┻━┻`);
    };

    const writePoem = function (artistName) {
      log(`${artistName} wrote this: Roses are rgb(255, 0, 0)`);
    };

    const makeArt = function (artistName, artForm) {
      artForm(artistName);
    };
    makeArt('Jeanne', paintPicture);
    makeArt('Xavier', writePoem);
  };
  // testFunctionKnowledge();

  /*
   *
   * Functions Returning Functions
   *
   */
  const learnMoreAboutFunctions = function () {
    const greet = function (greeting) {
      return function (name) {
        log(`${greeting} ${name}`);
      };
    };
    const greeterHey = greet('Hey');

    greeterHey('Xavier');
    greeterHey('Jeanne');
    greet('Hello')('Maïté');

    const greetArrow = greeting => {
      return name => {
        log(`${greeting} ${name}`);
      };
    };
    const greeterArrowHey = greetArrow('Hey');

    greeterArrowHey('Papi Marc');
  };
  // learnMoreAboutFunctions();
};
// learnAboutFunctions();

/*
 *
 * Functions: Using the THIS keyword
 *
 */
const learnAboutCallApplyBind = function () {
  // First Airline
  const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function (flightNum, passName) {}
    book(flightNum, passName) {
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, passName });
      // log(
      //   `${passName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      // );
    },
  };
  // Bookings for first airline
  lufthansa.book(239, 'Xavier Bertrand');
  lufthansa.book(356, 'Marc Bertrand');
  log(lufthansa);

  // Second Airline
  const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };

  /*
   *
   * Using the call Method: myObject.call(THIS, PARAM1, PARAM2...)
   *
   */

  // Copy the function from a pre-existing object
  const book = lufthansa.book;
  // book(23, 'Jeanne Bertrand');
  // I expected the booking would be made for the First Airline
  // I was wrong. It crashed (undefined) because book is a function without
  // a this keyword (it's undefined in an regular function call)

  /*
   *
   * The Call Method: myObject.apply(THIS, param1, param2,...)
   *
   */
  const learnAboutCall = function () {
    // Call sets the object as the first argument
    book.call(eurowings, 23, 'Jeanne Bertrand');
    log(eurowings);

    book.call(lufthansa, 239, 'Mamie Jo');
    log(lufthansa);

    const swiss = {
      airline: 'Swiss Air Lines',
      iataCode: 'LX',
      bookings: [],
    };
    book.call(swiss, 1234, 'Mamie Thalie');
    log(swiss);
  };
  // learnAboutCall();

  /*
   *
   * The Apply Method: myObject.apply(THIS, PARAMarray)
   *
   */
  const learnAboutApply = function () {
    // copied from learnAboutCall
    const swiss = {
      airline: 'Swiss Air Lines',
      iataCode: 'LX',
      bookings: [],
    };
    const flightData = [583, 'George Cooper'];
    book.apply(swiss, flightData); // Not common anymore
    book.call(swiss, ...flightData); // Just spread the array
    log(swiss);
  };
  // learnAboutApply();

  /*
   *
   * The Bind Method: myFunction.bind(THIS) || myFunction(THIS, param1,...)
   * Bind does NOT call the function. It returns a function with a
   * a bound THIS keyword
   *
   */
  const learnAboutBind = function () {
    // copied from learnAboutCall
    const swiss = {
      airline: 'Swiss Air Lines',
      iataCode: 'LX',
      bookings: [],
    };
    // This functions's this will always be the same object
    const bookLH = book.bind(lufthansa);
    const bookLX = book.bind(swiss);
    const bookEW = book.bind(eurowings);
    bookEW(23, 'Steven Williams');
    log(eurowings);

    // Partial Application: Some of the values are predefined
    const bookEW23 = book.bind(eurowings, 23);
    bookEW23('Papi March');
    log(eurowings);

    // With Event Listeners
    lufthansa.planes = 300;
    lufthansa.buyPlane = function () {
      this.planes++;
      log(this.planes);
    };
    // document
    //   .querySelector('.buy')
    //   .addEventListener('click', () => lufthansa.buyPlane());
    // Without an arrow function, this === buyButton
    // The arrow function lets this === lufthansa

    document
      .querySelector('.buy')
      .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

    // Partial Application: presetting parameters
    const addTax = (rate, value) => value + value * rate;
    log(addTax(0.1, 200));

    // Use null when the THIS doesn't matter
    const addVAT = addTax.bind(null, 0.23);
    log(addVAT(100));

    const addTaxes = function (rate) {
      return function (subtotal) {
        return subtotal + subtotal * rate;
      };
    };
    const add15 = addTaxes(0.15);
    log(add15(300));
  };
  learnAboutBind();
};
// learnAboutCallApplyBind();

/*
 *
 * Redo Coding Challenge #1
 *
 */
const redoCodingChallenge1 = function () {
  // Test DATA 1: [5, 2, 3]
  const data1 = {
    answers: [5, 2, 3],
  };
  // Test DATA 2: [1, 5, 3, 9, 6, 1]
  const data2 = {
    answers: [1, 5, 3, 9, 6, 1],
  };
  const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
    registerNewAnswer() {
      const answer = prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      );
      if (
        +answer <= 3 &&
        +answer >= 0 &&
        !answer.includes(' ') &&
        answer !== ''
      ) {
        this.answers[answer]++;
        const displayType = prompt(
          'Display type:\ns: string\nanything else: array'
        );
        if (displayType === 's') {
          this.displayResults(`string`);
          return;
        }
        this.displayResults();
        return;
      }
      this.registerNewAnswer();
    },
    displayResults(type = 'array') {
      if (type === 'string') {
        log(`Poll results are ${this.answers.join(', ')}`);
        return;
      }
      log(this.answers);
    },
  };
  document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));

  const data2Display = poll.displayResults.bind(data2);
  data2Display('string');
  poll.displayResults.call(data2, 'array');
  poll.displayResults.apply(
    {
      answers: [1, 5, 3, 9, 6, 1],
    },
    ['string']
  );
};
// redoCodingChallenge1();

/*
 *
 * Coding Challenge #1
 *
 */
const codingChallenge1 = function () {
  log('Coding Challenge 1 Starts Now!');

  // Test DATA 1: [5, 2, 3]
  const data1 = {
    answers: [5, 2, 3],
  };
  // Test DATA 2: [1, 5, 3, 9, 6, 1]
  const data2 = {
    answers: [1, 5, 3, 9, 6, 1],
  };

  /// The question and possible answers
  const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // Following line to be explained in other section
    answers: new Array(4).fill(0),
    registerNewAnswer() {
      const answer = prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      );
      if (answer >= 0 && answer <= 3) this.answers[answer]++;
      else {
        log('Invalid answer');
      }
      this.displayResults();
    },
    displayResults(type = 'string') {
      if (type === 'string') {
        log(`The results are ${this.answers.join(', ')}`);
      } else if (type === 'array') {
        log(this.answers);
      }
    },
  };

  document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));

  const displayAny = poll.displayResults;
  displayAny.call(data1);
  displayAny.apply(data2);

  const displayData2 = poll.displayResults.bind(data2);
  displayData2();

  poll.displayResults.call(data1, 'string');
  poll.displayResults.apply(data2, ['array']);
};
// codingChallenge1();

/*
 *
 * Functions: Immediately Invoked Function Expressions
 *
 */
const learnAboutIIFE = function () {
  log('Immediately Invoked Function Expressions');

  const runOnce = function () {
    log('This function can actually be called twice...');
  };
  runOnce();
  runOnce();

  // Wrap the whole function in parentheses, then add ();
  (function () {
    log('This will never run again.');
    const isPrivate = 23;
    var isItPrivate = 23;
  })();

  (() => log('Arrow functions can also be IIFEs'))();
  // IIFEs have the advantage of a scope that cannot be accessed again.
  // log(isPrivate); // ReferenceError: is not defined
  // log(isItPrivate); // ReferenceError: is not defined
};
// learnAboutIIFE();

/*
 *
 * Functions: Closures
 *
 *
 */
const learnAboutClosures = function () {
  log('Closures in JavaScript');

  /*
   * Example 1
   */
  const secureBooking = function () {
    let passengerCount = 0;

    return function () {
      passengerCount++;
      log(`${passengerCount} passengers`);
    };
  };

  const booker = secureBooking();
  booker(); // passengerCount === 1
  booker(); // passengerCount === 2
  booker(); // passengerCount === 3

  // A closure makes a function remember all the variables that existed
  // at the function's birthplace even after the parent function has returned
  console.dir(booker);

  /*
   * Example 2
   */
  let f;
  const g = function () {
    const a = 23;
    f = function () {
      log(a * 2);
    };
  };

  const h = function () {
    const b = 777;
    f = function () {
      log(b * 2);
    };
  };

  g(); // reassigns f from 'undefined' to a function
  f();
  console.dir(f);
  h(); // reassigns f AGAIN
  f();
  console.dir(f);

  /*
   * Example 3
   */
  const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    // Creating a closure
    setTimeout(function () {
      log(`We are now boarding all ${n} passengers`);
      log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    log(`Will start boarding in ${wait} seconds`);
  };

  const perGroup = 1000;
  // The closure has priority over other scopes. The proof is this variable
  // also called perGroup. Its value is not reached because JS finds a value
  // for perGroup in the closure. Therefore JS doesn't need to look further
  boardPassengers(180, 3);
};
// learnAboutClosures();

/*
 *
 * Coding Challenge #2
 *
 */
const codingChallenge2 = function () {
  log('Coding Challenge #2 Starts here');
  (function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', () => {
      header.style.color = 'blue';
    });
  })();

  // Objective: Attach an event listener that changes the header color to blue
  // Objective: Explain to yourself why this works
};
// codingChallenge2();
