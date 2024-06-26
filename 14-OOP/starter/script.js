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

/*
 *
 *
 * Object.create: the least used way, but the "truest" object inheritance?
 *
 *
 */
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
// learnAboutObjectCreate();

/*
 *
 *
 * Coding Challenge #2: Redo #1 using a class & adding get/set methods
 *
 *
 */
const codingChallenge2 = function () {
  class Car {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
    accelerate() {
      this.speed += 10;
    }
    brake() {
      this.speed -= 5;
    }

    get speedUS() {
      return this.speed / 1.6;
    }
    set speedUS(newSpeed) {
      this.speed = newSpeed * 1.6;
    }
  }

  const ford = new Car('Ford', 100);
  log(ford);
  ford.speedUS = 100;
  log(ford.speed);
  log(ford.speedUS);
};
// codingChallenge2();

/*
 *
 *
 * Class Inheritance: Constructors, ES6 Classes & Object.create
 *
 *
 */
const learnAboutClassInheritance = function () {
  /*
   * Inheritance Through Constructors
   */
  const thruConstructors = function () {
    // The parent object
    const Person = function (firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    };
    Person.prototype.calcAge = function () {
      this.age = 2024 - this.birthYear;
      log(this.age);
    };
    const jeanne = new Person('Jeanne', 1990);
    jeanne.calcAge();

    // The child object
    const Student = function (firstName, birthYear, course) {
      Person.call(this, firstName, birthYear);
      this.course = course;
    };

    // Link the parent and child Objects' prototypes
    // Has to be done before adding methods to child prototype
    // otherwise Object.create returns an empty prototype, overwriting stuff
    Student.prototype = Object.create(Person.prototype);
    // Student.prototype = Person.prototype; // Doesn't work
    Student.prototype.constructor = Student; // Reassign to correct value

    Student.prototype.introduce = function () {
      log(`My name is ${this.firstName}, and I study ${this.course}.`);
    };

    const xavier = new Student('Xavier', 1988, 'JS');
    log(xavier);
    xavier.introduce();
    xavier.calcAge(); // doesn't work w/o Student.prototype = Object.create

    log('xavier.__proto__:', xavier.__proto__);
    log('xavier.__proto__^2:', xavier.__proto__.__proto__);

    console.dir(Student.prototype.constructor);
  };
  // thruConstructors();

  /*
   * Coding Challenge #3: Inheritance through Constructuors
   */
  const codingChallenge3 = function () {
    // Parent {}
    const Car = function (make, speed) {
      this.make = make;
      this.speed = speed;
    };
    Car.prototype.accelerate = function () {
      this.speed += 10;
      log(`${this.make} now driving ${this.speed} km/h`);
    };
    Car.prototype.brake = function () {
      this.speed -= 5;
      log(`${this.make} now driving ${this.speed} km/h`);
    };

    // Child {}
    const ElectricCar = function (make, speed, charge) {
      Car.call(this, make, speed);
      this.charge = charge;
    };

    // Linking parent and child {}
    ElectricCar.prototype = Object.create(Car.prototype);

    ElectricCar.prototype.chargeBattery = function (chargeTo) {
      this.charge = chargeTo;
      log(`${this.make} now has a charge of ${this.charge}%`);
    };
    ElectricCar.prototype.accelerate = function () {
      this.speed += 20;
      this.charge -= 1;
      log(
        `${this.make} now driving ${this.speed} km/h and ${this.charge}% charge`
      );
    };

    const honda = new Car('Honda', 40);
    const tesla = new ElectricCar('Tesla', 50, 60);

    honda.accelerate();
    tesla.accelerate();
    tesla.chargeBattery(100);
  };
  // codingChallenge3();

  /*
   * Inheritance Through ES6 Classes
   */
  const thruES6Classes = function () {
    class Person {
      constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
      }
      calcAge() {
        log(`${2024 - this.birthYear} years old`);
      }
      set fullName(userName) {
        if (userName.includes(' ')) this._fullName = userName;
        else alert(`${userName} is not a full name`);
      }
      static clone() {
        log('Clone produced!');
      }
    }

    class Student extends Person {
      constructor(fullName, birthYear, program) {
        // Always the first thing in the constructor bc super() creates
        // the this keyword
        super(fullName, birthYear);
        this.program = program;
      }
      study() {
        log(`I'm actively learning ${this.program}`);
      }
      calcAge() {
        log(`I'm ${2024 - this.birthYear} years old!`);
      }
    }

    const marc = new Student('Marc Dinosaur', 1959, 'Computer Science');
    log(marc);
    marc.study();
    marc.calcAge();
  };
  // thruES6Classes();

  /*
   * Inheritance Through Object.create
   */
  const thruObjectDotCreate = function () {
    const Person = {
      calcAge() {
        log(2024 - this.birthYear);
      },
      init(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
      },
    };
    const johanne = Object.create(Person);

    const Student = Object.create(Person);
    Student.init = function (fullName, birthYear, program) {
      Person.init.call(this, fullName, birthYear);
      this.program = program;
    };
    Student.introduce = function () {
      log(`Hi! I'm ${this.fullName}. I study ${this.program}.`);
    };

    const jay = Object.create(Student);
    jay.init('Jay Kay', 1001, 'Egyptology');
    log(jay);
    jay.introduce();
    jay.calcAge();

    // Why is Object.create so ugly? My vote goes to ES6 classes.
  };
  // thruObjectDotCreate();
};
// learnAboutClassInheritance();

/*
 *
 *
 * Encapsulation: Make methods & properties private to avoid bugs/hacks
 *
 *
 */
const learnEncapsulation = function () {
  // 1. Public fields (public properties)
  // 2. Private fields
  // 3. Public methods
  // 4. Private methods
  // all of them have a static version

  class Account {
    // 1. Public fields (on instances)
    locale = navigator.language;

    // 2. Private fields (on instances)
    #movements = [];
    #pin; // must be declared outside the constructor

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      // this._movements = []; // _ in front to make protected (semi private)
      this.#pin = pin;
      // this.locale = navigator.language;

      log(`Thank you for opening an account, ${this.owner}.`);
    }

    // 3. Public methods
    // Public Interface (API) (on the prototype)
    getMovements() {
      return this.#movements;
    }
    deposit(value) {
      this.#movements.push(value);
    }
    withdraw(value) {
      this.deposit(-value);
    }
    requestLoan(value) {
      if (this.#approveLoan(1)) {
        this.deposit(value);
        log(`Loan approved`);
      }
    }
    static helper() {
      log('A (static) helper method is available on the class itself');
      log('In the case of this class (Account) and this method (helper)');
      log('It must be called through this syntax: Account.helper()');
    }

    // 4. Private methods
    #approveLoan(value) {
      // _ to protect the method
      if (this.#pin !== value) return true;
    }
  }

  const acc1 = new Account('Xavier', 'EUR', 1111);
  log(acc1);

  // not great to interact with properties directly
  // better write methods to do it
  // acc1._movements.push(250);
  // acc1._movements.push(-100);

  // this is better
  acc1.deposit(1000);
  acc1.withdraw(200);
  acc1.requestLoan(10_000);
  acc1.getMovements();

  log(acc1);
  // log(acc1.#movements); // doesn't work bc private (with the #)
  log(acc1.getMovements());
  Account.helper();
};
// learnEncapsulation();
