'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// console.log(document.getElementsByTagName('button'));
// console.log(document.getElementsByClassName('btn'));

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
header.append(message); // element itself can only exist once. It's moved
// header.append(message.cloneNode(true));

header.before(message);

// DELETING ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// STYLING ELEMENTS
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.width); // can read only if we wrote it inline
console.log(getComputedStyle(message).width);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
logo.alt += '. Beautiful, init?';
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo);

console.log(logo.dataset.versionNumber);
