'use strict';

// Selecting DOM elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0Div = document.querySelector('.player--0');
const player1Div = document.querySelector('.player--1');
const dieEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Setting initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
dieEl.classList.add('hidden');
let currentScore = 0;
let currentPlayer = 0;
let player0Score = 0;
let player1Score = 0;

// Game logic
const switchPlayer = function () {
  currentPlayer = !currentPlayer;
  currentScore = 0;
  player0Div.classList.toggle('player--active');
  player1Div.classList.toggle('player--active');
};

const tallyCurrentScore = function (score) {
  if (currentPlayer) {
    current1El.textContent = score;
  } else {
    current0El.textContent = score;
  }
};

const tallyPermanentScore = function () {
  if (currentPlayer) {
    player1Score += currentScore;
    score1El.textContent = player1Score;
    current1El.textContent = 0;
  } else {
    // Executes only if currentPlayer === 0
    player0Score += currentScore;
    score0El.textContent = player0Score;
    current0El.textContent = 0;
  }
};

const processNumber = function (number) {
  if (number !== 1) {
    currentScore += number;
    tallyCurrentScore(currentScore);
  } else {
    currentScore = 0;
    tallyCurrentScore(currentScore);
    switchPlayer();
  }
};

const rollTheDie = function () {
  let die = Math.floor(Math.random() * 6) + 1;
  dieEl.classList.remove('hidden');
  dieEl.src = `dice-${die}.png`;
  processNumber(die);
  console.log(die);
};

const toggleButtons = function () {
  btnRoll.disabled = !btnRoll.disabled;
  btnHold.disabled = !btnHold.disabled;
};

const checkWin = function () {
  if (player0Score >= 100) {
    player0Div.classList.add('player--winner');
    return 'Player 1';
  }
  if (player1Score >= 100) {
    player1Div.classList.add('player--winner');
    return 'Player 2';
  }
  return false;
};

// Setting event listeners
btnRoll.addEventListener('click', rollTheDie);
btnHold.addEventListener('click', () => {
  tallyPermanentScore();
  if (!checkWin())
    switchPlayer(); // There's no winner
  else {
    toggleButtons(); // There's a winner, stop the game
    dieEl.classList.add('hidden');
  }
});
btnNew.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  dieEl.classList.add('hidden');
  currentScore = 0;
  // currentPlayer = 0; doesn't work because it doesn't change the style
  if (currentPlayer) switchPlayer();
  player0Score = 0;
  player1Score = 0;
  // If the game ended thru a win, the buttons are disabled
  // Otherwise, they are still active and shouldn't be toggled
  if (btnRoll.disabled) toggleButtons();
  player0Div.classList.remove('player--winner');
  player1Div.classList.remove('player--winner');
});
