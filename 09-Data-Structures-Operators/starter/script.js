'use strict';
const log = console.log;

// Data need for some exercises
const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    year: 2011,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

// Data needed for first part of the section

const wkdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Use destructuring in the parameters and assigning default
  // values in case there's nothing specified
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    // console.log(
    //   `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    // );
  },

  orderPasta: function (ing1, ing2, ing3) {
    log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    log(mainIngredient, otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
 *
 *
 *
 * Object Destructuring
 *
 *
 *
 */

// Destructuring by using the exact name of inside the object
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// Changing the name of the destructured variable
const {
  name: restaurantName,
  openingHours: hours,
  categories: categs,
} = restaurant;
// console.log(restaurantName, hours, categs);

// Setting a default value
const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
// console.log(a, b); // no longer 111 and 999

// Nested object: goal is retrieving Friday
const {
  openingHours: {
    fri: { open, close },
  },
} = restaurant;
// In the previous lines, only two variables are created: open and close
// openingHours and fri are NOT created variables. Instead, they are pipelines
// to the information I wanted to destructure.
// console.log(open, close);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: 'Taipei 101',
});
// restaurant.orderPizza('cheese', 'onions', 'mushroom', 'spinach');
// restaurant.orderPizza('cheese');

/*
 *
 *
 *
 * Array Destructuring
 *
 *
 *
 */

const learnAboutDestructuring = function () {
  const arr = [2, 3, 4];
  // ES5 way of taking elements out of an array
  const a = arr[0];
  const b = arr[1];
  const c = arr[2];

  // ES6 destructuring
  const [x, y, z] = arr;
  console.log(x, y, z);
  console.log(typeof x, typeof y, typeof z);

  // destructuring can skip elements in the array as show by 'premier' & 'troisieme'
  const [first, second] = restaurant.categories;
  console.log(first, second);
  const [premier, , troisieme] = restaurant.categories;
  console.log(premier, troisieme);

  let [main, secondary] = restaurant.categories;
  console.log(`ORIGINALLY main: ${main}, secondary: ${secondary}`);

  // ES5 way of switching variables
  const temp = main;
  main = secondary;
  secondary = temp;
  console.log(`ES5 SWITCH main: ${main}, secondary: ${secondary}`);

  // SE6 way of switching variables: destructuring
  [main, secondary] = [secondary, main];
  console.log(`ES6 SWITCH main: ${main}, secondary: ${secondary}`);

  console.log(restaurant.order(2, 0));
  const [starter, mainCourse] = restaurant.order(2, 0);
  console.log(`starter: ${starter}, mainCourse: ${mainCourse}`);

  // Nested destructuring
  const nestedArray = [2, 4, [5, 6]];
  const [, , wantedArray] = nestedArray;
  console.log(wantedArray);

  // destructuring within destructuring
  const [firstValue, , [secondValue, thirdValue]] = nestedArray;
  console.log(firstValue, secondValue, thirdValue);

  // Default values: if there's no value, the variables are set to 1
  const [p = 1, q = 1, r = 1] = [420, 917];
  console.log(`p: ${p}, q: ${q}, r: ${r}`);
};
learnAboutDestructuring();

/*
 *
 *
 * Array practice
 *
 *
 */

const learnAboutArrays = function () {
  const myCountry = 'Taiwan';
  const neighbors = ['Japan', 'Korea', 'China'];

  // Adds at the end of the array. Returns new length.
  console.log(neighbors.push('Utopia'));
  console.table(neighbors);

  // Adds at the beginning of the array. Returns new length.
  console.log(neighbors.unshift('Canada'));
  console.table(neighbors);

  // Removes the first item of the array. Returns item.
  console.log(neighbors.shift());
  console.table(neighbors);

  // Removes the last item of the array. Returns item.
  console.log(neighbors.pop());
  console.table(neighbors);

  neighbors.push('Germany');

  console.log(
    `Probably ${
      neighbors.includes('Germany') ? '' : 'not '
    }a central European country :D`
  );

  function isJapan(country) {
    return country === 'Japan';
  }

  // Puts array items thru function. Returns index or -1.
  const indexOfJapan = neighbors.findIndex(isJapan);
  neighbors[indexOfJapan] = 'Empire of Japan';
  console.log(neighbors[indexOfJapan]);

  // Finds index in array. Returns index or -1.
  const japanIndex = neighbors.indexOf('Empire of Japan');
  neighbors[japanIndex] = 'Republic of Japan';
  console.log(neighbors[japanIndex]);

  const country = {
    officialName: 'Taiwan',
    capital: 'Taipei',
    population: 23,
    languages: ['Mandarin', 'Hokkien'],
    neighbors: ['Japan', 'Korea', 'China', 'Philippines', 'Vietnam', 'Ocean'],
    describeCountry: function () {
      let myString = `${this.officialName} has a population of ${this.population} million people which speaks mainly ${this.languages[0]}. Its neighbors include ${this.neighbors[0]}, ${this.neighbors[1]}, and ${this.neighbors[2]}. Its capital is ${this.capital}.`;
      console.log(myString);
    },
    checkIsland: function () {
      this.isIsland = this.neighbors.includes('Ocean') ? true : false;
      console.log(this.isIsland);
    },
  };
  country.describeCountry();
  country.checkIsland();

  country.capital = '台北';
  country['population'] = 24;

  const countrySentence = `${country.officialName} has a population of ${country.population} million people which speaks mainly ${country.languages[0]}. Its neighbors include ${country.neighbors[0]}, ${country.neighbors[1]}, and ${country.neighbors[2]}. Its capital is ${country.capital}.`;
  console.log(countrySentence);

  const listOfNeighbors = [
    ['Canada', 'Mexico'],
    ['Spain'],
    ['Norway', 'Sweden', 'Russia'],
  ];
  for (let i = 0; i < listOfNeighbors.length; i++) {
    for (let j = 0; j < listOfNeighbors[i].length; j++) {
      console.log(listOfNeighbors[i][j]);
    }
  }
};
// learnAboutArrays();

/*
 *
 *
 * Data Structure, Modern Operators and Strings
 *
 *
 */

const learnAboutModernJS = function () {
  const bookAuthors = [...books[0].author, ...books[1].author];
  log(bookAuthors);

  function spellWord(word) {
    log(...word);
  }
  spellWord('JavaScript');

  const [firstBook, secondBook] = books;
  const [, , thirdBook] = books;

  const ratings = [
    ['rating', 4.19],
    ['ratingsCount', 14454],
  ];
  const [[, rating], [, ratingsCount]] = ratings;

  const ratingStars = [63405, 1808];
  const [fiveStarRatings = 0, oneStarRatings = 0, threeStarRatings = 0] =
    ratingStars;

  // Two ways of achieving the same result
  let [{ title, author, ISBN }] = books;
  console.log(title, author, ISBN);

  // Resetting the values just to prove the 2nd way works too
  title = 1;
  author = 1;
  ISBN = 1;
  // 2nd way
  ({ title, author, ISBN } = firstBook);
  console.log(title, author, ISBN);

  const { keywords: tags } = books[0];
  console.log(tags);

  const [{ keywords: motsclef }] = books;
  console.log(motsclef);

  const { language = 'English', programmingLanguage = 'unknown' } = books[6];
  console.log(language, programmingLanguage);

  let bookTitle = 'unknown';
  let bookAuthor = 'unknown';

  ({ title: bookTitle, author: bookAuthor } = books[0]);
  log(bookTitle, bookAuthor);

  const {
    thirdParty: {
      goodreads: { rating: bookRating },
    },
  } = books[0];
  log(bookRating, books[0].thirdParty.goodreads.rating);

  function printBookInfo({ title, author, year = 'year unknown' }) {
    log(`${title} by ${author}, ${year}`);
  }

  printBookInfo(books[0]);
};
// learnAboutModernJS();

/*
 *
 *
 *The Rest Pattern and Parameters
 *
 *
 */

const learnAboutRest = function () {
  // 1) Destructuring

  // SPREAD because on the RIGHT side of =
  const unAutreTableau = [1, 2, ...[3, 4]];

  // REST because on the LEFT side of =
  const [monster, fantome, ...others] = [1, 2, 3, 4, 5];
  log(monster, fantome, others); // others is now an array

  // Rest
  const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu, // Spread
    ...restaurant.starterMenu, // Spread
  ];
  log(pizza, risotto, otherFood);

  // Objects
  // const { sat, ...weekdays } = restaurant.openingHours;
  // log(sat, weekdays);
  const {
    openingHours: { sat, ...weekdays },
  } = restaurant;
  log(sat, weekdays);

  // 2) Functions
  const add = function (...numbers) {
    let sumOfAll = 0;
    for (let i = 0; i < numbers.length; i++) {
      sumOfAll += numbers[i];
    }
    log(sumOfAll);
  };

  add(1, 2, 3, 4, 5, 6, 7, 8);

  const x = [23, 5, 7];
  add(...x);
};
// learnAboutRest();

/*
 *
 *
 * The Spread Operator: multiple values separated by commas
 *
 *
 */
const learnAboutSpread = function () {
  const tableau = [7, 8, 9];
  const mauvaisTableau = [1, 2, tableau[0], tableau[1], tableau[2]];

  const bonTableau = [1, 2, ...tableau];
  log(bonTableau);

  tableau.unshift(1, 2); // Add
  log(tableau);

  log(...tableau);

  const newMenu = [...restaurant.mainMenu, 'Gnocci'];
  log(...newMenu);

  // Copying arrays with the spread operator
  const mainMenuCopy = [...restaurant.mainMenu];

  // Joining arrays
  const tableau1 = ['Xavier', 'Jeanne', 'Maïté'];
  const tableau2 = ['Alexandre', 'Magda', 'Zofia', 'Édouard'];
  const tableau3 = [...tableau1, ...tableau2];
  // log(tableau3);

  // Iterables: arrays, strings, maps, sets, NOT OBJECTS
  const myName = 'Xavier B';
  const letters = [...myName];
  // log(letters);

  const ingredients = [
    prompt("Let's make pasta! Ingredient 1?"),
    prompt('Ingredient 2?'),
    prompt('Ingredient 3?'),
  ];
  log(ingredients);

  restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
  restaurant.orderPasta(...ingredients);

  // Objects are not iterable, but ES2018 made ... work on objects too

  const newRestaurant = {
    foundedIn: '1998',
    ...restaurant,
    founder: 'Guiseppe',
  };

  const restaurantCopy = { ...restaurant };
  restaurantCopy.name = 'Ristorante Roma';
  log(restaurant.name, restaurantCopy.name);
};
// learnAboutSpread();

const myHomeworkSpread = function () {
  const aNiceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const aCopy = [...aNiceArray];
  log(aCopy);

  const testObject = {};

  const [mainKeyword, ...rest] = books[0].keywords;

  const { publisher: bookPublisher, ...restOfTheBook } = books[1];

  const printBookAuthorsCount = function (title, ...authors) {
    log(`The book ${title} has ${authors.length} authors.`);
  };
  printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');
};
// myHomeworkSpread();

/*
 *
 *
 * Boolean Operators: Short-Circuiting with || and &&
 *
 *
 */

const learnAboutBooleans = function () {
  // OR operator: Return the FIRST TRUTHY value encountered
  log(3 || 'Xavier'); // 3
  log('' || 'Xavier'); // 'Xavier'
  log(true || 0); // true
  log(undefined || null); // null
  log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

  restaurant.numGuests = 23;
  const guestCount1 = restaurant.numGuests ? restaurant.numGuests : 10; // 10
  log(guestCount1);
  const guestCount2 = restaurant.numGuests || 10; // 10
  log(guestCount2);

  // AND operator: Return the LAST TRUTHY value or the FIRST FALSY value
  log(0 && 'Xavier'); // 0
  log(7 && 'Xavier'); // 'Xavier'
  log('Hello' && 23 && null && 'Xavier'); // null
  log('HI' && 'How' && 'Are' && 'You?'); // 'You?'

  if (restaurant.orderPizza) {
    restaurant.orderPizza('Cheese', 'Mushrooms', 'Spinach');
  }

  restaurant.orderPizza &&
    restaurant.orderPizza('Cheese', 'Mushrooms', 'Spinach');

  /*
   *
   * Nullish Coalescing Operator
   *
   */

  // This code has a hidden bug: If the number of guests is 0,
  // the || operator considers it (0) falsy and assigns the value 10
  // rather than assigning the falsy (but correct) value 0.
  restaurant.numGuests = 0;
  const guestCount3 = restaurant.numGuests ? restaurant.numGuests : 10; // 10
  log(guestCount3);
  const guestCount4 = restaurant.numGuests || 10; // 10
  log(guestCount4);

  const guestCount5 = restaurant.numGuests ?? 10;
  log(guestCount5); // 0 guests, which is correct
  // This is because ?? considers null and undefined as the only falsy values
  // For ?? 0 and '' are NOT falsy

  function hasExamplesInJava(book) {
    log(book.programmingLanguage === 'Java' || 'no data available');
  }
  hasExamplesInJava(books[0]);
  hasExamplesInJava(books[1]);

  function checkOnlineContent(booksArray) {
    booksArray.forEach(
      book =>
        book.onlineContent && log(`"${book.title}" provides online content`)
    );
  }
  checkOnlineContent(books);

  function checkWithNullish(booksArray) {
    booksArray.forEach(book => {
      log(book.title, book.onlineContent);
      book.onlineContent ?? log(`${book.title} doesn't provide information`);
    });
  }
  checkWithNullish(books);

  log('Hi' ?? 0);
  log(0 ?? 'Hi');
  log(null ?? true);
  log(null ?? false);
  log(undefined ?? true);
  log(undefined ?? null);
  log(null ?? undefined);
  log(null ?? false);
  log(null ?? undefined ?? 'Xavier');

  /*
   *
   * OR ASSIGNMENT OPERATOR ||= assigns a value to a variable if variable si falsy
   * this causes a bug if the value is 0 because 0 is falsy
   *
   */
  const rest1 = {
    name: 'Capri',
    numGuests: 0,
  };

  const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni Rossi',
  };

  rest1.numGuests = rest1.numGuests || 10;
  rest2.numGuests = rest2.numGuests || 10;
  rest1.numGuests ||= 10;
  rest2.numGuests ||= 10;

  // nullish assignment operator: assigns value to variable if variable is nullish
  rest1.numGuests ??= 10;
  rest2.numGuests ??= 10;

  rest1.owner = rest1.owner && '<ANONYMOUS>';
  rest2.owner = rest2.owner && '<ANONYMOUS>';

  // AND assignment operator: assigns value to variable if variable is truthy
  rest1.owner &&= '<ANONYMOUS>';
  rest2.owner &&= '<ANONYMOUS>';

  log(rest1);
  log(rest2);

  function assignEdition(booksArray) {
    booksArray.forEach(book => {
      book.edition ||= 1;
      log(`${book.title} is currently on edition ${book.edition}`);
    });
  }
  assignEdition(books);

  // minimum value of rating for highlight is 4.2
  function checkHighlight(booksArray) {
    booksArray.forEach(book => {
      // if (book.thirdParty.goodreads.rating < 4.2) {
      //   book.highlighted &&= false;
      // }
      book.highlighted &&= !(book.thirdParty.goodreads.rating < 4.2);
      log(
        `${book.title}: ${book.highlighted}: ${book.thirdParty.goodreads.rating}`
      );
    });
  }
  checkHighlight(books); // is the value is truthy -> need to use &&=
};
// learnAboutBooleans();

/*
 *
 *
 * Enhanced Objects
 *
 *
 */

const learnAboutObjects = function () {
  const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
    displayGoals() {
      for (const [goalNumber, goalScorer] of Object.entries(this.scored)) {
        log(`Goal ${+goalNumber + 1} scored by ${goalScorer}!`);
      }
    },
    calculateAverage() {
      let sum = 0;
      for (const [outcome, odds] of Object.entries(this.odds)) {
        sum += odds;
        // log(outcome, odds);
      }
      return sum / Object.entries(this.odds).length;
    },
    displayOdds() {
      for (const [outcome, odds] of Object.entries(this.odds)) {
        let sentence = `Odds of `;
        sentence += outcome === 'x' ? 'draw: ' : `victory ${game[outcome]}: `;
        sentence += `${odds}`;
        log(sentence);
      }
    },
    objectifyScorers() {
      this.scorers = {};
      for (const [, scorer] of this.scored.entries()) {
        this.scorers[scorer] && this.scorers[scorer];
        // Don't know how to make it work with && or ||
        if (this.scorers[scorer]) {
          this.scorers[scorer]++;
        } else {
          this.scorers[scorer] = 1;
        }
      }
      this.scorers2 = {};
      for (const player of this.scored) {
        this.scorers2[player]
          ? this.scorers2[player]++
          : (this.scorers2[player] = 1);
      }
      log(this.scorers);
      log(this.scorers2);
    },
  };
  game.displayOdds();
  game.objectifyScorers();
  game.displayGoals();
  log(`Average odds are: ${Math.floor(game.calculateAverage() * 100) / 100}`);

  const [players1, players2] = game.players;
  const [gk, ...fieldPlayers] = players1;
  const allPlayers = [...players1, ...players2];

  const players1Final = [...players1];
  players1Final.push('Thiago', 'Coutinho', 'Perisic');

  // const { team1, x: draw, team2 } = game.odds;
  const {
    odds: { team1, x: draw, team2 },
  } = game;

  const printGoals = function (...scorers) {
    scorers.forEach(scorer => {
      log(`${scorer} scored`);
    });
    log(`${scorers.length} goals were scored during the game`);
  };
  printGoals(...game.scored);

  const determineWinner = function () {
    team1 > team2 || log(`Team 1 wins`);
    team2 > team1 || log(`Team 2 wins`);
    team1 === team2 || log(`The teams draw`);
  };
  determineWinner();
};
// learnAboutObjects();

/*
 *
 *
 * Some Stuff
 *
 *
 */

const learnSomeStuff = function () {
  const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];

  // for (const item of menu1) log(item);

  // for (const item of menu1.entries()) {
  //   log(`${item[0] + 1}: ${item[1]}`);
  // }
  for (const [item, food] of menu1.entries()) {
    log(`${item + 1}: ${food}`);
  }
  log([...menu1.entries()]);

  let pageSum = 0;
  for (const { pages } of books) {
    pageSum += pages;
  }
  log(pageSum);

  const allAuthors = [];
  const collectAuthors = function (bookArray) {
    for (const { author } of bookArray) {
      if (typeof author === 'object') allAuthors.push(...author);
      else if (typeof author === 'string') allAuthors.push(author);
    }
    log(allAuthors);
  };
  collectAuthors(books);

  const printAuthors = function () {
    for (const [place, author] of allAuthors.entries()) {
      log(`${place + 1}: ${author}`);
    }
  };
  printAuthors(books);

  const bookData = [
    ['title', 'Computer Networking: A Top-Down Approach'],
    ['author', ['James F. Kurose', 'Keith W. Ross']],
    ['publisher', 'Addison Wesley'],
  ];

  // Do the rest
  const newBook = {
    [bookData[0][0]]: bookData[0][1],
    [bookData[1][0]]: bookData[1][1],
    [bookData[2][0]]: bookData[2][1],
  };
  // log(bookData);

  const pages = 880;

  const newBook2 = {
    title: 'The C Programming Language',
    author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
    pages,
  };
  log(newBook2);

  const maite = {
    names: {
      firstName: 'Maïté',
      lastName: 'Bertrand',
      chineseName: '陳楓圻',
    },
    info: {
      birthDate: {
        year: 2020,
        month: 3,
        day: 7,
      },
    },
  };

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    log(`On ${day}, we open at ${open}`);
  }

  const users = [{ name: 'Xavier', email: 'abc@gmail.com' }];

  // log(users[0]?.name ?? 'User array empty');
  // log(users[1]?.name ?? 'User array empty');

  const getFirstKeyword = function (bookObject) {
    log(bookObject?.keywords?.[0]);
  };
  getFirstKeyword(books[0]);
  getFirstKeyword(newBook2);

  const properties = Object.keys(openingHours);
  log(properties);

  let openStr = `We are open of ${properties.length} days: `;
  for (const day of Object.keys(openingHours)) {
    openStr += ` ${day}, `;
  }
  log(openStr);

  const values = Object.values(openingHours);
  log(values);

  const entries1 = Object.entries(openingHours);
  log(entries1);

  for (const [key, { open, close }] of entries1) {
    log(`On ${key} we open at ${open} and close at ${close}`);
  }

  const entries = [];
  const loopOverBook = function (book) {
    for (const key of Object.keys(book.thirdParty.goodreads)) {
      entries.push([key]);
    }
  };
  loopOverBook(books[0]);
  log(entries);

  const makeAnArray = function (book) {
    for (const [index, value] of Object.values(
      book.thirdParty.goodreads
    ).entries()) {
      log(index, value);
      entries[index].push(value);
    }
  };
  makeAnArray(books[0]);
  log(entries);

  const entries2 = Object.entries(books[0].thirdParty.goodreads);
  log(entries2);
};
// learnSomeStuff();

/*
 *
 *
 * Sets
 *
 *
 */

const learnAboutSets = function () {
  // Example #1
  const ordersSet = new Set([
    'Pasta',
    'Pizza',
    'Pizza',
    'Risotto',
    'Pasta',
    'Pizza',
  ]);
  log(ordersSet);
  log(`size of set: ${ordersSet.size}`);
  log(`The set contains the word 'Pizza':`, ordersSet.has('Pizza'));
  log(`The set contains the word 'Bread':`, ordersSet.has('Bread'));
  ordersSet.add('Garlic Bread');
  ordersSet.add('Garlic Bread');
  ordersSet.delete('Pasta');
  log(ordersSet[0]); // doesn't work because there is no index
  // ordersSet.clear(); // deletes all the contents
  log(ordersSet);

  // Sets are iterable
  for (const order of ordersSet) log(order);

  // Example #2
  const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
  const staffUnique = [...new Set(staff)];
  log(staffUnique);
  log(new Set(staff).size);

  // Example #3
  log(new Set('XavierBertrand'));
  log(
    `There are ${new Set('XavierBertrand').size} unique letters in that name`
  );
  log([...'XavierBertrand']);
  log(
    `There are ${new Array(...'XavierBertrand').length} letters in that name`
  );
};
// learnAboutSets();

const myHomeworkSets = function () {
  const bookKeywords = new Set();
  for (const book of books) {
    for (const keyword of book.keywords) {
      bookKeywords.add(keyword);
    }
  }
  const allKeywords = [...bookKeywords];
  log(bookKeywords);
  log(allKeywords);
};
// myHomeworkSets();

/*
 *
 *
 * Maps
 *
 *
 */

const learnAboutMaps = function () {
  const restMap = new Map();
  restMap.set('name', 'Classico Italiano');
  restMap.set(1, 'Firenze, Italy');
  log(restMap.set(2, 'Lisbon, Portugal')); // the set method returns the map
  log(typeof restMap);
  restMap
    .set('categories', ['Italian', 'Pizzeria'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :('); // can chain the set method

  const time = 21;
  log(restMap.get(time > restMap.get('open') && time < restMap.get('close')));

  log(restMap.has('categories'));
  log(restMap.delete(2));
  log(restMap);
  log(restMap.size);
  restMap.clear();
  log(restMap);

  restMap.set([1, 2], 'test');
  log(restMap);
  log(restMap.get([1, 2])); // doesn't work because each array is diff in the heap
  const mapArray = [1, 2];
  restMap.set(mapArray, 'test12');
  log(restMap.get(mapArray));

  log(restMap.set(document.querySelector('h1'), 'Heading'));
  const header = document.querySelector('h1');
  log(restMap.get(header)); // This works

  /*
   * Map: Iteration
   */

  // Populating a Map using an Array of Arrays
  // Which is the same data structure obtained when using the Object.entries()
  // method, meaning there is an easy way to convert Objects to Maps
  const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct!'],
    [false, 'Try Again!'],
  ]);
  log(question);

  /*
   * Convert Objects to Maps
   */
  const hoursMap = new Map(Object.entries(restaurant.openingHours));
  log(hoursMap);

  /*
   * Maps are iterable (Objects are not)
   */

  let result = true;
  while (!result) {
    log('++++++++++++++++++++++++++++');
    log(question.get('question'));
    for (const [key, value] of question) {
      if (typeof key === 'number') log(`Answer ${key}: ${value}`);
    }
    log('++++++++++++++++++++++++++++');
    const answer = Number(prompt('Your answer'));
    log(`Your answer was:`, question.get(answer));

    result = question.get('correct') === answer;
    log(question.get(result));
    if (answer === 4) break; // Just to get out of the loop
  }

  /*
   * Convert Maps to Arrays
   */
  const aTestArray = [...question];
  log(aTestArray);
  log(question.entries());
  log([...question.keys()]);
  log([...question.values()]);
};
// learnAboutMaps();

const myHomeworkMaps = function () {
  /*
   * How to populate Maps
   */
  // const bookMap = new Map([
  //   ['title', 'Clean Code'],
  //   ['author', 'Robert C. Martin'],
  // ]);
  const bookMap = new Map([
    ['author', 'Robert C. Martin'],
    ['pages', 464],
  ]);
  // bookMap.set('author', 'Robert C. Martin');
  bookMap.set('title', 'Clean Code');

  // bookMap.set('pages', 464);
  log(
    `${bookMap.get('title')}, by ${bookMap.get('author')}, has ${bookMap.get(
      'pages'
    )} pages.`
  );

  const firstBookMap = new Map(Object.entries(books[0]));
  log(firstBookMap);
  for (const [key, value] of firstBookMap) {
    if (typeof value === 'number') log(key);
  }

  /*
   * Coding Challenge #3
   */
  const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
  ]);

  // TODO: Create an Array with no repetition
  const events = [...new Set(gameEvents.values())];
  log(events);
  // TODO: Remove event at minute 64
  gameEvents.delete(64);
  log(gameEvents);
  // TODO: Log the average time between events
  const average = 90 / gameEvents.size;
  log(`An event occurred, on average, every ${average} minutes.`);
  // TODO: Display [FIRST HALF] 17 : Goal for all events
  for (const [key, value] of gameEvents) {
    log(`${key <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`);
  }
};
// myHomeworkMaps();

const learningAboutStrings = function () {
  const airline = 'TAP Air Portugal';
  const plane = 'A320';

  const playWithStrings = function () {
    log(plane[0]);
    log('B737'[0]);
    log(airline.length, 'characters long');
    log('Xavier'.length, 'characters long');

    log(airline.indexOf('r'));
    log(airline.lastIndexOf('i'));
    log(airline.indexOf('Portugal'), 'Portugal starting position'); // case-sensitive
    log(airline.indexOf('portugal'), 'portugal not found'); // case-sensitive

    log(airline.slice(4)); // Doesn't change the original string
    log(airline);
    log(airline.slice(4, 6)); // Doesn't include the last number/character

    log(airline.slice(0, airline.indexOf(' ')));
    log(airline.slice(airline.lastIndexOf(' ') + 1));
    log(airline.slice(-2)); // The last 2 characters
    log(airline.slice(2, -1));
    log(new String('Xavier'));
  };
  // playWithStrings();

  const checkMiddleSeat = function (seat) {
    // B and E are middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') {
      log('You have the middle seat :(');
    } else {
      log('You got lucky :)');
    }
  };
  // checkMiddleSeat('11B');
  // checkMiddleSeat('23C');
  // checkMiddleSeat('3E');

  const stringMethods = function () {
    const airline = 'TAP Air Portugal';

    log(airline.toLowerCase()); // string methods don't change the original
    log(airline);

    // Fix capitalization
    const passenger = 'xAviER';
    const passengerLower = passenger.toLowerCase();
    const passengerCorrect =
      passengerLower[0].toUpperCase() + passengerLower.slice(1);
    log(passenger);
    log(passengerCorrect);

    // Comparing emails
    const email = 'xavier@gmail.com';
    const loginEmail = ' xaVier@gmaiL.cOM \n';

    const lowerEmail = loginEmail.toLowerCase();
    const trimmedEmail = lowerEmail.trim();
    log('Two-Step Process:', trimmedEmail);

    const normalizedEmail = loginEmail.toLowerCase().trim();
    log('One-Step Process:', normalizedEmail);

    log(loginEmail.trimStart());
    log(loginEmail.trimEnd());

    // Replace characters
    const priceGB = '£232,12';
    const priceUS = priceGB.replace('£', '$').replace(',', '.');
    log(priceUS);

    const announcement =
      'All passengers come to boarding door 23. Boarding door 23.';
    log(announcement.replace('door', 'gate')); // Only replaces the first hit
    log(announcement.replaceAll('door', 'gate')); // Relatively new JS

    // Regular Expressions
    log(announcement.replace(/door/g, 'gate'));

    // Boolean methods
    const plane = 'A320neo';
    log(plane.includes('neo'));
    log(plane.includes('Boeing'));
    log(plane.startsWith('A'));

    if (plane.startsWith('A') && plane.endsWith('neo')) log('New Airbus plane');

    // Practice
    const checkBaggage = function (items) {
      const baggage = items.toLowerCase();
      if (baggage.includes('lighter') || baggage.includes('water')) {
        log("This person's baggage must be purged!");
      } else {
        log("This person's baggage is acceptable.x");
      }
    };
    checkBaggage('I have a laptop, some food, and a Lighter');
    checkBaggage('Socks and a camera');
    checkBaggage('I have Water and a phone');
  };
  // stringMethods();

  const moreStrings = function () {
    log('a+very+nice+string'.split('+')); // Splits a string into an array
    log('Xavier Bertrand'.split(' '));
    const [firstName, lastName] = 'Xavier Bertrand'.split(' ');
    log(firstName, lastName);

    const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
    log(newName);

    const capitalizeName = function (name) {
      const names = name.split(' ');
      const namesUpper = [];
      for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
      }
      return namesUpper.join(' ');
    };
    const passenger = 'Jessica ann smith davis';
    log(capitalizeName('xavier bertrand'));
    log(capitalizeName('maïté johanne bertrand'));
    log(capitalizeName(passenger));

    // Padding
    const message = 'Go to gate 23!';
    log(message.padStart(20, '+').padEnd(25, '-'));
    log('Xavier'.padStart(20, '+'));
    log(message.padEnd(20, '+').padEnd(25, '-'));

    const maskCreditCard = function (number) {
      const str = number + '';
      const lastFour = str.slice(-4);
      return lastFour.padStart(str.length, 'X');
    };
    log(maskCreditCard(1234567812345678));
    log(maskCreditCard('1234567887654321'));

    // Repeat
    const repeatString = function (string, times) {
      return string.repeat(times);
    };
    log(repeatString('Hi\n', 10));
  };
  // moreStrings();
};
// learningAboutStrings();

const myHomeworkStrings = function () {
  log(books[0].ISBN[6], books[0].ISBN[4], books[0].ISBN[9], books[0].ISBN[8]);
  const quote =
    'A computer once beat me at chess, but it was no match for me at kick boxing';
  log(quote.indexOf('chess'));
  log(
    quote.slice(
      quote.indexOf('boxing'),
      'boxing'.length + quote.indexOf('boxing')
    )
  );
  const isContributor = function (string) {
    return string.includes('Contributor');
  };
  log(isContributor('Julie Sussman (Contributor)'));
  log(isContributor('Robert Sedgewick'));

  const normalizeAuthorName = function (string) {
    const cleanName = string.replace('(Contributor)', '').toLowerCase().trim();
    const names = cleanName.split(' ');
    const capitalizedNames = [];
    for (const part of names) {
      capitalizedNames.push(part[0].toUpperCase() + part.slice(1));
    }
    return capitalizedNames.join(' ');
  };
  log(normalizeAuthorName('  JuliE sussMan (Contributor)'));
  log(normalizeAuthorName('  jean-marc romeo bertrand (Contributor)'));
  log(normalizeAuthorName('Xavier bertrand (Contributor)'));
  log(normalizeAuthorName('  JuliE sussMan'));

  const replaceTitle = function () {
    const newBookTitle = books[1].title.replace('Programs', 'Software');
    log(newBookTitle);
  };
  replaceTitle();

  const checkTitles = function () {
    for (const book of books) {
      const title = book.title.toLowerCase();
      // log(title);
      if (title.startsWith('computer')) {
        log('This book is about computers');
      } else if (title.includes('algorithms') && title.includes('structures')) {
        log('This book is about algorithms and data structures');
      } else if (
        title.includes('system') &&
        title.includes('operating') === -1
      ) {
        log('This book is about something, but not OSs');
      }
    }
  };
  checkTitles();

  const logBookCategories = function (stringOfCategories) {
    const categories = stringOfCategories.split(';');
    for (const category of categories) {
      log(category);
    }
  };
  const bookCategories =
    'science;computing;computer science;algorithms;business;operating systems;networking;electronics';
  logBookCategories(bookCategories);

  const getKeywordsAsString = function (bookArray) {
    const keywordSet = new Set();
    for (const book of books) {
      if (typeof book.keywords === 'string') {
        keywordSet.add(book.keywords);
      } else {
        for (const keyword of book.keywords) {
          keywordSet.add(keyword);
        }
      }
    }
    const keywordList = [...keywordSet];
    log(keywordList.join(';'));
  };
  getKeywordsAsString(books);

  const logBookChapters = function (chapters) {
    for (const [chapterTitle, pageCount] of chapters) {
      log(chapterTitle.padEnd(20, '_'), pageCount + '');
    }
  };

  const bookChapters = [
    ['The Basics', 14],
    ['Sorting', 254],
    ['Searching', 372],
    ['Graphs', 526],
    ['Strings', 706],
  ];
  logBookChapters(bookChapters);
};
// myHomeworkStrings();

/*
 * Coding Challenge #4
 */
const codingChallenge4 = function () {
  /*
underscore_case
 first_name 
Some_Variable
 calculate_AGE
delayed_departure
*/
  log('Coding Challenge #4 Starts!');
  document.body.append(document.createElement('textarea'));
  document.body.append(document.createElement('button'));

  const textarea = document.querySelector('textarea');
  const btnSubmit = document.querySelector('button');

  const cleanVariables = function (variables) {
    const cleaned = [];
    for (const variable of variables) {
      cleaned.push(variable.trim().toLowerCase());
    }
    return cleaned;
  };

  const removeUnder = function (variables) {
    const camelCase = [];
    for (const variable of variables) {
      const [first, second] = variable.split('_'); // Remove underscore
      // Push the 1st word + the capital letter + the rest of the 2nd word
      camelCase.push(first + second[0].toUpperCase() + second.slice(1));
    }
    return camelCase;
  };

  const displayVariables = function (variables) {
    for (let i = 0; i < variables.length; i++) {
      log(variables[i].padEnd(20, ' '), '✅'.repeat(i + 1));
    }
  };

  const rewriteVariables = function () {
    // const cleaned = cleanVariables(textarea.value.split('\n'));
    // const camelCase = removeUnder(cleaned);
    // displayVariables(camelCase);
    displayVariables(removeUnder(cleanVariables(textarea.value.split('\n'))));
  };

  btnSubmit.addEventListener('click', rewriteVariables);
};
// codingChallenge4();

const anotherStringExercise = function () {
  const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
  log(flights.split('+'));

  for (const flight of flights.split('+')) {
    let [status, departure, arrival, time] = flight.split(';');

    if (status.includes('Delayed')) status = 'XD ' + status;
    status = status.replaceAll('_', ' ').padStart(22);
    departure = departure.slice(0, 3).toUpperCase();
    arrival = arrival.slice(0, 3).toUpperCase();
    time = `(${time.replace(':', 'h')})`;

    log(`${status} from ${departure} to ${arrival} ${time}`);
  }
};
// anotherStringExercise();
