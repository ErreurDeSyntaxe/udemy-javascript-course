'use strict';
const log = console.log;

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
learnAboutConstructors();
