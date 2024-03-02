'use strict';

let secretNumber;
let score = 20;
let highScore = 0;
const highScoreDisplay = document.querySelector('.highscore');
const scoreDisplay = document.querySelector('.score');
const messageDisplay = document.querySelector('.message');
const secretNumberDisplay = document.querySelector('.number');
const checkButton = document.querySelector('.check');
const pageBody = document.querySelector('body');
const againButton = document.querySelector('.again');

const generateNumber = function () {
  secretNumber = Math.floor(Math.random() * 20) + 1;
};

const displayMessage = function (string) {
  messageDisplay.textContent = string;
};

const resetGame = function () {
  score = 20;
  generateNumber();
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  pageBody.style.backgroundColor = '#222';
  secretNumberDisplay.style.width = '15rem';
  secretNumberDisplay.textContent = '?';
  displayMessage('Start guessing...');
};

const decreaseScore = function () {
  score--;
  scoreDisplay.textContent = score;
};

const checkHighScore = function () {
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
  }
};

const winGame = function () {
  secretNumberDisplay.textContent = secretNumber;
  pageBody.style.backgroundColor = '#60b347';
  secretNumberDisplay.style.width = '30rem';
};

const loseGame = function () {
  messageDisplay.textContent = 'You lost!';
  score = 0;
  scoreDisplay.textContent = score;
  pageBody.style.backgroundColor = 'red';
};

// Process the user input
checkButton.addEventListener('click', function () {
  const guess = +document.querySelector('.guess').value;

  // There is no input
  if (!guess) {
    displayMessage('Please input a number');

    // The user wins the game
  } else if (guess === secretNumber) {
    displayMessage("You're right!");
    checkHighScore();
    winGame();

    // The guess is incorrect
  } else if (guess !== secretNumber) {
    // The game is not yet lost
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
      decreaseScore();
    } else {
      loseGame();
    }
  }
});

// Process a rematch
againButton.addEventListener('click', () => resetGame());

// Initiate the game
window.addEventListener('load', () => generateNumber());
