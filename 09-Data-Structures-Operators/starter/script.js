'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
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

const arr = [2, 3, 4];
// ES5 way of taking elements out of an array
const a = arr[0];
const b = arr[1];
const c = arr[2];

// ES6 destructuring
// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(typeof x, typeof y, typeof z);

// destructuring can skip elements in the array as show by 'premier' & 'troisieme'
// const [first, second] = restaurant.categories;
// console.log(first, second);
// const [premier, , troisieme] = restaurant.categories;
// console.log(premier, troisieme);

let [main, secondary] = restaurant.categories;
// console.log(main, secondary);

// ES5 way of switching variables
// const temp = main;
// main = secondary;
// secondary = main;
// console.log(main, secondary);

// SE6 way of switching variables: destructuring
[main, secondary] = [secondary, main];
// console.log(main, secondary);

// console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// Nested destructuring
const nestedArray = [2, 4, [5, 6]];
const [, , wantedArray] = nestedArray;
// console.log(wantedArray);

// destructuring within destructuring
const [firstValue, , [secondValue, thirdValue]] = nestedArray;
// console.log(firstValue, secondValue, thirdValue);

// Default values: if there's no value, the variables are set to 1
const [p = 1, q = 1, r = 1] = [420, 917];
// console.log(p, q, r);

/*
 *
 *
 *
 * Array practice
 *
 *
 */
const myCountry = 'Taiwan';
const neighbors = ['Japan', 'Korea', 'China'];

// Adds at the end of the array. Returns new length.
// console.log(neighbors.push('Utopia'));
// console.table(neighbors);

// Adds at the beginning of the array. Returns new length.
// console.log(neighbors.unshift('Canada'));
// console.table(neighbors);

// Removes the first item of the array. Returns item.
// console.log(neighbors.shift());
// console.table(neighbors);

// Removes the last item of the array. Returns item.
// console.log(neighbors.pop());
// console.table(neighbors);

// neighbors.push('Germany');

// console.log(
//   `Probably ${
//     neighbors.includes('Germany') ? '' : 'not '
//   }a central European country :D`
// );

function isJapan(country) {
  return country === 'Japan';
}

// Puts array items thru function. Returns index or -1.
const indexOfJapan = neighbors.findIndex(isJapan);
neighbors[indexOfJapan] = 'Empire of Japan';
// console.log(neighbors[indexOfJapan]);

// Finds index in array. Returns index or -1.
const japanIndex = neighbors.indexOf('Empire of Japan');
neighbors[japanIndex] = 'Republic of Japan';
// console.log(neighbors[japanIndex]);

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
// country.describeCountry();
// country.checkIsland();

country.capital = '台北';
country['population'] = 24;

const countrySentence = `${country.officialName} has a population of ${country.population} million people which speaks mainly ${country.languages[0]}. Its neighbors include ${country.neighbors[0]}, ${country.neighbors[1]}, and ${country.neighbors[2]}. Its capital is ${country.capital}.`;
// console.log(countrySentence);

const listOfNeighbors = [
  ['Canada', 'Mexico'],
  ['Spain'],
  ['Norway', 'Sweden', 'Russia'],
];
for (let i = 0; i < listOfNeighbors.length; i++) {
  for (let j = 0; j < listOfNeighbors[i].length; j++) {
    // console.log(listOfNeighbors[i][j]);
  }
}
