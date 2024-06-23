'use strict';
const log = console.log;

/*
 *
 *
 * Constructors: Object Return Functions
 *
 *
 */

const learnAboutConstructors = function () {
  const Person = function (firstName, birthYear) {
    // this = {}

    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // instance methods BAD PRACTICE!
    this.calcAge = function () {
      log(2024 - this.birthYear);
    };
    // instance methods BAD PRACTICE!
    // instead, the methods should be on the prototype

    // this = { firstName, birthYear }
  };

  // 1. New {} (empty object) is created
  // 2. function is called, this = {}
  // 3. {} is linked to prototype
  // 4. constructor function returns {}
  const xavier = new Person('Xavier', 1988);
  const jeanne = new Person('Jeanne', 1990);
  const maite = new Person('Maïté', 2020);
  const johanne = { firstName: 'Johanne', birthYear: 1961 };

  log(johanne, xavier, jeanne, maite);
  log('xavier instanceof Person:', xavier instanceof Person);
  log('johanne instanceof Person:', johanne instanceof Person);
};
// learnAboutConstructors();

/*
 *
 *
 * Prototypes: Object Blueprints
 *
 *
 */
const learnAboutPrototypes = function () {
  // Constructor
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  // Add methods only on prototypes to benefit from inheritance
  Person.prototype.calcAge = function () {
    log(`${this.firstName} is ${2024 - this.birthYear} years old`);
  };

  const xavier = new Person('Xavier', 1988);
  const jeanne = new Person('Jeanne', 1990);
  xavier.calcAge(); // has access through prototypal inheritance
  jeanne.calcAge(); // same

  log(
    'xavier.__proto__ === Person.prototype:',
    xavier.__proto__ === Person.prototype
  ); // true
  log(
    'Person.prototype.isPrototypeOf(xavier):',
    Person.prototype.isPrototypeOf(xavier)
  ); // true
  log(
    'Person.prototype.isPrototypeOf(Person):',
    Person.prototype.isPrototypeOf(Person)
  ); // false

  Person.prototype.species = 'Homo Sapiens';
  log(xavier.species); // accessible thru prototype, not the object itself
  log(
    'xavier.hasOwnProperty("firstName"):',
    xavier.hasOwnProperty('firstName')
  ); // true
  log('xavier.hasOwnProperty("species"):', xavier.hasOwnProperty('species')); // false
};
// learnAboutPrototypes();

const learnAboutInheritance = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.calcAge = function () {
    this.age = 2024 - this.birthYear;
    return this.age;
  };

  const xavier = new Person('Xavier', 1988);

  // prototype of all Person {}
  log('xavier.__proto__:', xavier.__proto__);
  // prototype of the Person constructor
  log('xavier.__proto__^2:', xavier.__proto__.__proto__);
  // null
  log('xavier.__proto__^3:', xavier.__proto__.__proto__.__proto__);
  // Person
  console.dir(Person.prototype.constructor);

  const arr = [2, 4, 2, 1, 3, 2, 1, 3, 4];
  log(arr.__proto__);
  log(arr);

  Array.prototype.unique = function () {
    return [...new Set(this)];
  };
  log(arr.unique()); // Not a great idea of modifying a built-in Objects

  const h1 = document.querySelector('h1');
  console.dir(h1);
  console.dir(log);
};
learnAboutInheritance();
