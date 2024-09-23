// importing module
console.log('Importing Module');

// default import (unnamed)
// import toCart from './shoppingCart.js';
// toCart('bread', 2);

// named import (can rename with 'as' keyword)
// import shoppingCart, { totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);
// console.log(shoppingCart);

// import everything: importing things twice does NOT cause issues
// import * as Cart from './shoppingCart.js';
// console.log(Cart.shippingCost);

// // Top-Level Await is possible in module (because they are already async?)
// console.log('Start fetching');
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// // but it blocks the execution of the whole module
// console.log('Finished fetching');

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// not very clean because it mixes aync/await with then/catch
// const lastPost = getLastPost();
// lastPost.then(last => console.log(last));

// const last = await getLastPost();
// console.log(last);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apple', 4);
console.log(cart);

// quick intro to lodash
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from '/lodash-es/';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log('state Object:');
console.log(state.user.loggedIn);
console.log('stateClone Object:');
console.log(stateClone.user.loggedIn);
console.log('state.user.loggedIn = false; (affects both state and stateClone)');
state.user.loggedIn = false; // modifies both state and stateClone

console.log('stateDeepClone Object (remains unaffected):');
console.log(stateDeepClone.user.loggedIn);

// allows the state on the webpage to be maintained (like login info)
// so we don't have to redo some steps everytime we change a line
if (module.hot) {
  module.hot.accept();
}
// npx parcel index.html
