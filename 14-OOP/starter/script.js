'use strict';
const log = console.log;

/*
 *
 *
 * Constructors: Functions that return objects
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
 * Prototypes: Blueprints of objects
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
  );
  log(
    'Person.prototype.isPrototypeOf(xavier):',
    Person.prototype.isPrototypeOf(xavier)
  );
  log(
    'Person.prototype.isPrototypeOf(Person):',
    Person.prototype.isPrototypeOf(Person)
  );

  Person.prototype.species = 'Homo Sapiens';
  log(xavier.species);
  log('xavier.hasOwnProperty("firstName"):', xavier.hasOwnProperty('firstName'));
  log('xavier.hasOwnProperty("species"):', xavier.hasOwnProperty('species'));
};
learnAboutPrototypes();
