const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  const limit = spendingLimits?.[user] ?? 0;

  if (value > limit) return; // guard clause
  budget.push({ value: -value, description, user });
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  budget.forEach(entry => {
    if (entry.value < -spendingLimits[entry.user])
      entry.flag = 'limit exceeded';
  });
};
checkExpenses();

console.log(budget);

const logBigExpenses = function (bigExpense) {
  let expensesList = '';
  budget.forEach(entry => {
    if (entry.value > -bigExpense) return;
    expensesList += entry.description.slice(-2) + ' / '; // emojis are 2 chars
  });
  expensesList = expensesList.slice(0, -2); // Remove last '/ '
  console.log(expensesList);
};
logBigExpenses(1000);
