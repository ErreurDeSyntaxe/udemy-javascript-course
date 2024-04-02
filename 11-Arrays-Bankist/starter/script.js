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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // Not the same as containerMovements.textContent

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const expenses = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest + '€';
};
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
learnAboutMapsAndsSets();

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
learnAboutForEach();

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
learnBasicMethods();

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
  /*
   * Creates a new array. Loops over each element and uses a callback
   */
  const mapMethod = function () {
    // Convert the movements [] values from Euros to USD
    const eurToUsd = 1.1;
    // map's callback takes the current array element (like forEach)
    const movementsUSD = movements.map(function (mov) {
      return mov * eurToUsd;
    });
    const movementsUSDarrow = movements.map((mov) => mov * eurToUsd);
    log(movements);
    log(movementsUSD);
    log(movementsUSDarrow);

    // map has access to the same three arguments as forEach
    const movementDescription = movements.map(
      (mov, index, arr) =>
        `Transaction #${index}: ${
          mov > 0 ? 'You deposited ' : 'You withdrew'
        } ${Math.abs(mov)} `
    );
    log(movementDescription);

    const createUsernames = function (accs) {
      accs.forEach((acc, index, arr) => {
        // work on existing array
        acc.username = acc.owner
          .toLowerCase()
          .split(' ')
          .map((n) => n[0]) // make a new and temporary array
          .join('');
      });
    };
    createUsernames(accounts);
    log(accounts);
  };
  mapMethod();

  /*
   * Creates a new array. Loops over w/ callback, applies condition,
   * returns the elements for which the callback returned TRUTHY value
   */
  const filterMethod = function () {
    const deposits = movements.filter(function (movement, index, arr) {
      return movement > 0; // returns a Boolean, which is what filter needs
    });
    log(deposits);
    const withdrawals = movements.filter((movement) => movement < 0);
    log(withdrawals);
  };
  filterMethod();

  /*
   * Creates a SINGLE VALUE with the all the elements of the array
   */
  const reduceMethod = function () {
    log(movements);
    // Accumulator is like a snowball that goes downhill
    const balance = movements.reduce(function (
      accumulator,
      current,
      index,
      array
    ) {
      log(`Iteration ${index + 1}: ${accumulator}`);
      return accumulator + current;
    },
    0); // Initial value of accumulator
    log(balance);

    /*
     * Finding the maximum number with REDUCE
     */
    const findMax = function (movements) {
      const max = movements.reduce((acc, mov) => {
        if (acc > mov) return acc;
        else return mov;
      }, 0);
      log(max);
    };
    findMax(account1.movements);
  };
  reduceMethod();
};
dataTransformation();

/*
 * Coding Challenge #2
 */
const codingChallenge2 = function () {
  log('Coding Challenge #2 Starts!');
  //Test Data
  const data1 = [5, 2, 4, 1, 15, 8, 3];
  const data2 = [16, 6, 10, 5, 6, 1, 4];
  function calcAverageHumanAge(ages) {
    const averageAge = ages
      .map((age) => {
        if (age <= 2) return age * 2;
        else return 16 + age * 4;
      })
      .filter((age) => {
        return age >= 18;
      })
      .reduce((acc, curr, ind, arr) => {
        return acc + curr / arr.length;
      }, 0);
    log(`The average dog is ${Math.trunc(averageAge)} human-years old`);
  }
  calcAverageHumanAge(data1);
  calcAverageHumanAge(data2);
};
// codingChallenge2();

/*
 * Chaining Array Methods: it's best to not chain method that mutate the array
 */
const learnAboutChaining = function () {
  const eurToUsd = 1.1;
  const totalDepositsUSD = movements
    .filter((mov) => mov > 0)
    .map((mov, i, arr) => {
      return mov * eurToUsd;
    })
    .reduce((acc, mov) => acc + mov, 0);
  log(totalDepositsUSD);
};
// learnAboutChaining();

/*
 * Find: Retrieves the 1st element that meets a truthy value
 * Returns the first element. Doesn't return an array.
 */
const learnAboutFind = function () {
  const firstWithdrawal = movements.find((mov) => mov < 0);
  log(firstWithdrawal);

  const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
  log(account);
};
// learnAboutFind();

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;
let sorted = false;
const eventListeners = function () {
  btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI and display message
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 100;
      // Clear input fields
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      inputLoginPin.blur();
      updateUI(currentAccount);
    }
  });

  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
    );
    log(amount, receiverAcc);

    if (
      amount > 0 &&
      amount <= currentAccount.balance &&
      currentAccount.username !== receiverAcc?.username &&
      receiverAcc
    ) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount);
    }
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
    inputTransferTo.value = '';
    inputTransferTo.blur();
  });

  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (
      inputCloseUsername.value === currentAccount.username &&
      inputClosePin.value === currentAccount.pin + ''
    ) {
      const unwanted = accounts.findIndex(function (acc, i, arr) {
        return acc === currentAccount;
      });
      log(`Unwanted account at index ${unwanted}`);
      accounts.splice(unwanted, 1);
      containerApp.style.opacity = 0;
    }
    inputClosePin.value = '';
    inputCloseUsername.value = '';
  });

  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +inputLoanAmount.value;
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);
      updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
  });

  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
  });
};
eventListeners();

/*
 * Some & Every: like the includes method but allow a condition other than ===
 */
const learnAboutSomeEvery = function () {
  log(movements);
  log(movements.includes(-130));

  const anyDeposits = movements.some((mov) => mov > 1500);
  log(`There is at least one deposit above 1500: ${anyDeposits}`);

  log(
    'All deposits?',
    account4.movements.every((mov) => mov > 0)
  );

  // Separate Callback
  const deposit = (mov) => mov > 0;
  log(movements.some(deposit));
};
// learnAboutSomeEvery();

/*
 * flat: pull arrays out of arrays
 */
const learnAboutFlatMap = function () {
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  log(arr.flat());
  // flat goes one level deep into arrays by default (empty flat())

  const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
  log(arrDeep.flat(2)); // 2 levels deep

  const accountMovements = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
  log(accountMovements);

  // Because flat + map are so often used together, a new method (flatMap) was
  // introduced. But flatMap cannot flatten deeper than one level. If two or more
  // levels of depth are needed, use flat then map
  const accountMovements2 = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
  log(accountMovements2);
};
// learnAboutFlatMap();

/*
 * Sort: Sort alphabetically unless providing a callback function
 */
const learnAboutSort = function () {
  const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
  log(owners.sort());
  log(owners); // sort MUTATES the array

  log(movements);
  // log(movements.sort()); // sorts based on strings

  // return < 0 -> A, B (keep current order)
  // return > 0 -> B, A (switch current order)
  // movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  // });
  movements.sort((a, b) => a - b);
  log(movements);
};
// learnAboutSort();

/*
 * fill: create an empty array and fill it dynamically
 */
const learnAboutFillingArrays = function () {
  const arr1 = [1, 2, 3, 4, 5, 6, 7];
  const arr2 = new Array(1, 2, 3, 4, 5, 6, 7);

  const x = new Array(7);
  log(x); // An array with 7 empty slots, strange
  // x.map(() => 5); // Doesn't work
  x.fill(1, 3, 5); // fill array with '1' from '3' to '5-1'
  log(x);
  arr1.fill(17, 2); // works on filled arrays // works w/o last argument
  log(arr1);

  // Array.from
  const y = Array.from({ length: 7 }, () => 1);
  log(y);

  const z = Array.from({ length: 7 }, (throwaway, index) => index + 1);
  log(z);

  const hundredDice = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 6 + 1)
  );
  log(hundredDice);

  labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(
      document.querySelectorAll('.movements__value'),
      (elem) => elem.textContent.replace('€', '')
    );
    log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    log(movementsUI2);
    // This second way requires the mapping to be executed outside
  });
};
learnAboutFillingArrays();

/*
 * Practicing Array Methods
 */
const practiceArray = function () {
  // Total of deposits (not counting withdrawal)
  const bankDepositSum = accounts
    .map((account) => account.movements)
    .flat()
    .filter((movement) => movement > 0)
    .reduce((acc, curr) => acc + curr);
  log(bankDepositSum);
  const bankDepositSum2 = accounts
    .flatMap((account) => account.movements)
    .filter((movement) => movement > 0)
    .reduce((current, movement) => current + movement, 0);
  log(bankDepositSum2);

  // Number of deposits >= $1000
  const numDeposits1000 = accounts
    .flatMap((account) => account.movements)
    .filter((movement) => movement >= 1000).length;
  log(numDeposits1000);
  const numDeposits1000bis = accounts
    .flatMap((accounts) => accounts.movements)
    .reduce((count, curr, ind, arr) => (curr >= 1000 ? count + 1 : count), 0);
  log(numDeposits1000bis);

  // Create an object which contains 2 sums (deposits & withdrawals)
  // const objectSum = accounts
  //   .flatMap((accounts) => accounts.movements)
  //   .reduce(
  //     (acc, curr, ind, arr) => {
  //       if (curr > 0)
  //         (acc.deposits += curr);
  //       if (curr < 0)
  //         (acc.withdrawals += curr);
  //       log(curr);
  //       return acc;
  //     },
  //     { deposits: 0, withdrawals: 0 }
  //   );
  const objectSum = accounts
    .flatMap((account) => account.movements)
    .reduce((accumulator, current, index, array) => {
      if (!accumulator.deposits) accumulator.deposits = 0;
      if (!accumulator.withdrawals) accumulator.withdrawals = 0;

      current > 0
        ? (accumulator.deposits += current)
        : (accumulator.withdrawals += current);

      return accumulator;
    }, {});
  log(objectSum);

  // this is a nice title -> This Is a Nice Title
  const convertTitleCase = function (title) {
    const exceptions = [
      'a',
      'an',
      'the',
      'but',
      'or',
      'on',
      'in',
      'with',
      'and',
    ];
    // lowercase all without extra spaces
    // separate into array
    const newTitle = title
      .toLowerCase()
      .trim()
      .split(' ')
      .map((word) => {
        if (exceptions.includes(word)) return word;
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');
    // loop over array to check if a word is an exception -> capitalize if not
    // let newTitle = '';
    // separated.forEach((word) => {
    //   if (exceptions.includes(word)) newTitle += word + ' ';
    //   else newTitle += word[0].toUpperCase() + word.slice(1) + ' ';
    // });
    // return result: in case the first word is an exception
    return newTitle[0].toUpperCase() + newTitle.slice(1);
  };
  log(convertTitleCase('this is a long title'));
  log(convertTitleCase('this is a LONG title but not too long'));
  log(convertTitleCase('and here is another title with an EXAMPLE'));
  log(
    convertTitleCase(
      'there was once a boy who cried to a tree with an elf and a dwarf'
    )
  );
};
practiceArray();

/*
 * Coding Challenge #4: Checking if dogs eat just enough
 */
const codingChallenge4 = function () {
  // test data
  const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  // 1. Calculate the recommended amount of food and add it to the object
  dogs.forEach((dog) => {
    dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
    if (dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1)
      dog.healthy = true;
    else dog.healthy = false;

    // 2. Find Sarah's dog and log how it eats
    if (dog.owners.includes('Sarah'))
      log(
        `Your dog's eating habits are ${dog.healthy ? 'healthy' : 'unhealthy'}`
      );
  });

  // 3. Create two arrays: one for healthy, one for unhealthy
  const { ownersTooLittle, ownersTooMuch } = dogs.reduce(
    (acc, dog) => {
      if (dog.curFood > dog.recFood * 1.1) acc.ownersTooMuch.push(dog.owners);
      if (dog.curFood < dog.recFood * 0.9) acc.ownersTooLittle.push(dog.owners);
      return acc;
    },
    {
      ownersTooLittle: [],
      ownersTooMuch: [],
    }
  );

  // 4. Log #3's result as "Joe's and Ann's dog eats too little."
  log(ownersTooLittle.flat().join(' and ') + "'s dogs eat too little");
  log(ownersTooMuch.flat(2).join(' and ') + "'s dogs eat too much");

  // 5. Log if a dog eats exactly the recommended amount of food
  log(
    dogs.reduce((verdict, dog) => {
      if (dog.curFood === dog.recFood) verdict = true;
      return verdict;
    }, false)
  );

  // 6. Log if any dog eats a healthy amount of food
  log(dogs.some((dog) => dog.healthy));

  // 7. Create an array of the healthy eating habits dogs
  const healthyDogs = dogs.filter((dog) => {
    if (dog.healthy) return dog;
  });
  log(healthyDogs);

  // 8. Create an array and sort it by ascending order of recommended food
  const sortedArray = dogs.slice().sort((a, b) => a.recFood - b.recFood);
  log(sortedArray);
  
  log(dogs);
};
codingChallenge4();
