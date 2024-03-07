'use strict';

/*
 *
 *
 *
 * The this keyword: How different types of function use 'this', the different
 * mistakes programmers make, and how to avoid them*
 *
 *
 *
 */

// console.log('global code');
// console.log('This:', this);
// console.log('window === this:', window === this);

function testingThis(message) {
  console.log(message);
  // this refers to undefined because there's no object in the function scope
  // the above statement is true only in strict mode. ALWAYS USE STRICT MODE
  console.log('This:', this);
  console.log('window === this:', window === this);
}

const arrowTestingThis = message => {
  console.log(message);
  // This refers to the window
  console.log('This:', this);
  console.log('window === this:', window === this);
};

const header = document.querySelector('h1');
header.addEventListener('click', function () {
  console.log('Event Handler Anonymous Function: the this keyword');
  // this refers to the header (the listener)
  console.log('This:', this);
  console.log('window === this:', window === this);
});

const body = document.querySelector('body');
body.addEventListener('click', () => {
  console.log('Event Handler Arrow Function: the this keyword');
  console.log('This:', this);
  console.log('window === this:', window === this);
});

const myObject = {
  firstName: 'Xavier',
  objectTestingThis: function (message) {
    console.log(message);
    // this refers to myObject
    console.log('This:', this);
    console.log('window === this:', window === this);
  },
  objectArrowTestingThis: message => {
    console.log(message);
    // this refers to the window
    console.log('This:', this);
    console.log('window === this:', window === this);
  },
  objectOutsideFunction: testingThis,
  // when calling testingThis from inside an object, the this keyword refers to
  // the object that calls instead of 'undefined' like in the first run
};

const copiedObjectFunction = myObject.objectTestingThis;

// testingThis('Function Declaration: the this keyword');
// arrowTestingThis('Arrow Function Expression: the this keyword');
// myObject.objectTestingThis('Object Anonymous Function: the this keyword');
// myObject.objectArrowTestingThis('Object Arrow Function: the this keyword');
// myObject.objectOutsideFunction(
//   'Object Using Function Declared Outside Object: the this keyword'
// );
// copiedObjectFunction('Object Function Assigned to a Variable (not an object)');

const justAnObject = {
  firstName: 'Xavier',
  birthYear: 1988,
  calcAge: function (currentYear) {
    // this refers to the object, in this case 'justAnObject'
    const age = currentYear - this.birthYear;
    console.log('this: ', this);
    console.log('age:', age);
    return age;
  },
  calcAgeArrow: currentYear => {
    const age = currentYear - this.birthYear;
    // this refers to the window object
    console.log('this: ', this);
    console.log('age:', age);
    return age;
  },
};

// justAnObject.calcAge(2024);
// justAnObject.calcAgeArrow(2024);

const anotherObject = {
  firstName: 'Maïté',
  writeNameFunc: function () {
    // this refers to anotherObject
    console.log(this.firstName);

    // PROBLEM
    // Function Expression inside a function
    // there's no "this"
    // const isMyDaughter = function () {
    //   console.log(this.firstName === 'Maïté');
    // };
    // isMyDaughter();

    // SOLUTION #1
    // const self = this;
    // // Assign this to a variable so it goes inside the function declaration
    // const isMyDaughter = function () {
    //   console.log(self.firstName === 'Maïté');
    // };
    // isMyDaughter();

    // SOLUTION #2
    const isMyDaughter = () => {
      // An arrow function inherits the this keyword from its parent scope
      console.log(this.firstName === 'Maïté');
    };
    isMyDaughter();
  },
  writeNameArrow: () => {
    //this refers to the window object
    console.log(this.firstName);
  },
};

// anotherObject.writeNameFunc();
// anotherObject.writeNameArrow();

/*
 *
 *
 *
 * The 'arguments' keyword: How it works
 *
 *
 *
 */

function addDecl(a, b) {
  console.log(arguments);
  return a + b;
}

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

// addExpr(7, 8);
// addExpr(1, 2, 3, 4, 5);

const addArrow = (a, b) => {
  // Arrow functions don't have an 'arguments' keyword
  // console.log(arguments); // throws reference error: not defined
  return a + b;
};

// addArrow(10, 4);

/*
 *
 *
 *
 * Primitives VS Objects (aka reference types)
 *
 *
 *
 */

// primitive types
let lastName = 'Chen';
let oldLastName = lastName;
lastName = 'Bertrand';
// console.log('before marriage:', oldLastName);
// console.log('after marriage:', lastName);

// reference types
const jeanne = {
  firstName: 'Jeanne',
  lastName: 'Chen',
  age: 34,
};

const marriedJeanne = jeanne;
marriedJeanne.lastName = 'Bertrand';

// console.log('before marriage:', jeanne);
// console.log('This is how reference types work');
// console.log('after marriage:', marriedJeanne);

// copying objects
const xavier = {
  firstName: 'Xavier',
  lastName: 'Bertrand',
  age: 36,
  daughter: {
    firstName: 'Maïté',
    age: 4,
  },
};

// Object.assign creates a shallow copy; inner objects will
// continue acting like references and will NOT be copied. Rather
// they will point to the same point in memory
const marriedXavier = Object.assign({}, xavier);
marriedXavier.lastName = 'Chen';
marriedXavier.daughter.firstName = 'Lucifer';

// xavier's and marriedXavier's last names are now different (as should be)
// but their daughters' names BOTH changed. The change should have happened
// only for marriedXavier. This behavior is due to the shallow copy of
// Object.assign
console.log('before marriage:', xavier);
console.log('after marriage:', marriedXavier);
