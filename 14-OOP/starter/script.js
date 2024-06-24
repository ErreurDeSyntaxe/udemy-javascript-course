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

/*
 *
 *
 * Prototypal Inheritance: The Protoype Chain
 *
 *
 */
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
// learnAboutInheritance();

/*
 *
 *
 * Coding Challenge #1: Objects and Inherited Methods
 *
 *
 */
const codingChallenge1 = function () {
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };
  Car.prototype.accelerate = function () {
    this.speed += 10;
  };
  Car.prototype.brake = function () {
    this.speed -= 5;
  };

  const mercedes = new Car('Mercedes', 95);
  const bmw = new Car('BMW', 120);

  log(bmw, mercedes);
  bmw.accelerate();
  mercedes.brake();
  log(bmw, mercedes);
};
// codingChallenge1();

/*
 *
 *
 * JavaScript Classes: Syntactic Sugar and we love candy
 *
 *
 */
const learnAboutClasses = function () {
  // const ClassExpression = class {};
  // class ClassDeclaration {}

  class PersonCl {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }
    // 1st way of adding methods
    calcAge() {
      this.age = 2024 - this.birthYear;
      log(`${this.firstName} is ${this.age}`);
    }
  }

  const jeanne = new PersonCl('Jeanne', 1990);
  jeanne.calcAge();

  // 2nd way of adding methods
  PersonCl.prototype.greet = function () {
    log(`Hey ${this.firstName}`);
  };
  jeanne.greet();
};
// learnAboutClasses();

/*
 *
 *
 * Get & Set: Getters and Setters act much like properties
 *
 *
 */
const learnAboutGetSet = function () {
  const account = {
    owner: 'Xavier',
    movements: [200, 300, 400, 500],

    get latest() {
      return this.movements.slice(-1);
    },

    set latest(mov) {
      this.movements.push(mov);
    },
  };
  log(account.latest);
  account.latest = 50;
  log(account.latest);

  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
    get age() {
      return 2024 - this.birthYear;
    }
    set fullName(userName) {
      // added the underscore because there was conflict
      // the constructor already creates a property called 'fullName'
      // so the setter causes a conflict. convention === add _ to variable name
      if (userName.includes(' ')) this._fullName = userName;
      else alert(`${userName} is not a full name`);
    }
    static clone() {
      // this method is not avaiable to PersonCl objects
      // rather, it is avaible on PersonCl (a name space)
      log('Clone produced!');
    }
  }
  const jeanne = new PersonCl('Jeanne Chen', 1990);
  log(jeanne.age);
  // jeanne.clone(); // TypeError
  PersonCl.clone();
};
// learnAboutGetSet();

const learnAboutObjectCreate = function () {
  const PersonProto = {
    calcAge() {
      this.age = 2024 - this.birthYear;
    },

    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const stupidWay = function () {
    // create the object based on the prototype provided in parentheses
    const steven = Object.create(PersonProto);
    log(steven); // empty {}
    steven.name = 'Steve';
    steven.birthYear = 2020;
    log(steven); // {} has 2 properties
    steven.calcAge();
    log(steven);
  };
  // stupidWay();

  const rightWay = function () {
    const stevo = Object.create(PersonProto);
    stevo.init('Stevo', 2020);
    log(stevo);
  };
  rightWay();
};
learnAboutObjectCreate();
