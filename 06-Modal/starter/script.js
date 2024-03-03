'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const toggleHidden = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

const activatePage = function () {
  btnOpenModal.forEach(button =>
    button.addEventListener('click', toggleHidden)
  );

  btnCloseModal.addEventListener('click', toggleHidden);
  overlay.addEventListener('click', toggleHidden);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden'))
      toggleHidden();
  });
};

window.addEventListener('load', activatePage);
