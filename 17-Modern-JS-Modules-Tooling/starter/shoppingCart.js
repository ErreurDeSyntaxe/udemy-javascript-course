// exporting module: no need to link in the html
console.log('Exporting Module');

const shippingCost = 10;
const cart = [];
const totalPrice = 237;
const totalQuantity = 23;

// default export (limited to one per module)
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

// named export (can rename with 'as' keyword)
// export { totalPrice, totalQuantity as tq, shippingCost };
export { cart };

// blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching users');
// console.log('All this happens before any of the importing module code');
