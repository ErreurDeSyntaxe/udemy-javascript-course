'use strict';
const log = console.log;

const activateModal = function () {
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

  // for (let i = 0; i < btnsOpenModal.length; i++) {
  //   btnsOpenModal[i].addEventListener('click', openModal);
  // }
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
};
activateModal();

const learnAboutScrolling = function () {
  const btnScrollTo = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');
  btnScrollTo.addEventListener('click', e => {
    const s1coords = section1.getBoundingClientRect();
    // log(s1coords);
    // log(e.target.getBoundingClientRect());

    // log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
    // log('Current scroll (x/y)', window.scrollX, window.scrollY);
    // log(
    //   'height/width viewport',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // );

    // Scrolling 1
    // window.scrollTo(
    //   s1coords.left + window.scrollX,
    //   s1coords.top + window.scrollY
    // );

    // Scrolling 2
    // window.scrollTo({
    //   left: s1coords.left + window.scrollX,
    //   top: s1coords.top + window.scrollY,
    //   behavior: 'smooth',
    // });

    // Scrolling 3
    section1.scrollIntoView({ behavior: 'smooth' });
  });
};
// learnAboutScrolling();

const learnAboutEvents = function () {
  const h1 = document.querySelector('h1');
  // creating named function cuz anonymous func cant be removed
  const alertH1 = function (e) {
    alert('addEventListener: Great! You are reading the heading :D');
  };

  h1.addEventListener('mouseenter', alertH1);
  setTimeout(() => {
    h1.removeEventListener('mouseenter', alertH1);
  }, 3000); // wait three seconds after loading

  // old school way of handling events
  h1.onmouseenter = e => {
    alert('OnMouseEnter');
  };

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomColor = () =>
    `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
  document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    log('Link\n', e.target, e.currentTarget);
    // stop event propagation
    // e.stopPropagation();
  });
  document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    log('Container\n', e.target, e.currentTarget);
  });
  document.querySelector('.nav').addEventListener(
    'click',
    function (e) {
      this.style.backgroundColor = randomColor();
      log('Navigation\n', e.target, e.currentTarget);
    },
    true
  );
};
// learnAboutEvents();

const learnAboutDelegation = function () {
  // METHOD 1: ADD EVENT LISTENER TO EACH LINK: CREATES USELESS COPIES
  // document.querySelectorAll('.nav__link').forEach(function (el) {
  //   el.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     const id = this.getAttribute('href');
  //     log(id);
  //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  //   });
  // });

  // METHOD 2: ADD EVENT LISTENER TO PARENT ELEMENT (EVENT DELEGATION)
  // step 1: add event listener
  // step 2: determine which element cause the event
  document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
};
learnAboutDelegation();

// SELECTING ELEMENTS
const learnAboutSelecting = function () {
  log(document.documentElement); // outputs the whole document
  log(document.head);
  log(document.body);

  const header = document.querySelector('.header');
  const allSections = document.querySelectorAll('.section');
  const tagName = document.getElementsByTagName('button');
  const className = document.getElementsByClassName('btn');

  log(header); // an element
  log(allSections); // NodeList
  log(tagName); // HTML live collection
  log(className); // HTML live collection
};
// learnAboutSelecting();

// CREATING AND INSERTING ELEMENTS
const learnAboutInsertingDeleting = function () {
  // .insertAdjacentHTML is cool, but there's better (?)

  const header = document.querySelector('.header');
  const message = document.createElement('div');
  message.classList.add('cookie-message');
  message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
  header.prepend(message);
  header.append(message); // element was not copied and added. was moved.
  // header.append(message.cloneNode(true)); // element was copied
  header.before(message); // OG element was moved

  // DELETING ELEMENTS
  const learnAboutDeleting = function () {
    document
      .querySelector('.btn--close-cookie')
      .addEventListener('click', () => message.remove());
    // message.parentElement.removeChild(message); // same thing
  };
  learnAboutDeleting();
};
// learnAboutInsertingDeleting();

// STYLING ELEMENTS
const learnAboutStyling = function () {
  const message = document.querySelector('.cookie-message');
  message.style.backgroundColor = '#37383d';
  message.style.width = '120%'; // include the unit

  log(message.style.height); // can read only if we wrote it inline
  log(getComputedStyle(message).height); // can read everything

  message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

  // CSS variables are located on the ::root AKA document.documentElement
  document.documentElement.style.setProperty('--color-primary', 'orangered');

  // Read Attributes
  const logo = document.querySelector('.nav__logo');
  const link = document.querySelector('.nav__link--btn');
  logo.alt += '. Beautiful, init?';
  log('Logo Alt Text', logo.alt);
  log('Logo Src (dot notation)', logo.src);
  log('Logo Src (getAttribute)', logo.getAttribute('src'));
  log('Logo Designer (dot)', logo.designer); // JS cant find cuz non-standard
  log('Logo Designer (get)', logo.getAttribute('designer'));
  log('Link href (dot)', link.href);
  log('Link href (get)', link.getAttribute('href'));
  // Data Attributes
  log('Logo Data Attribute', logo.dataset.versionNumber); // 'data-' 開頭的attributes

  // Write Attributes
  logo.setAttribute('company', 'Bankist');
  log(logo);

  // Classes
  logo.classList.add('xavier', 'bertrand');
  logo.classList.remove('xavier');
  logo.classList.toggle('vacation');
  logo.classList.contains('something');
};
// learnAboutStyling();

const learnAboutTraversing = function () {
  const h1 = document.querySelector('h1');
  // Going downwards: Child
  log(h1.querySelectorAll('.highlight')); // Will look deep inside h1
  log(h1.childNodes); // every DIRECT child (comments, text, all of it)
  log(h1.children); // live collection of elements (no text, no comment)
  log(h1.firstChild); // When
  log(h1.firstElementChild); // <span class="highlight">banking</span>
  // h1.firstChild.style.color = 'white'; // typeError
  h1.firstElementChild.style.color = 'white';
  h1.lastElementChild.style.color = 'orangered';

  // Going upwards: parents
  log(h1.parentNode);
  log(h1.parentElement); // usually the one we want

  log(h1.closest('div')); // returns closest 'div' parent
  log(h1.closest('.header')); // returns closest '.header' parent
  h1.closest('.header').style.backgroundColor = 'var(--color-secondary-darker)';

  // Going sideways: siblings
  log(h1.previousElementSibling); // null because h1 is first child
  log(h1.nextElementSibling); // not null because h1 has siblings
  log(h1.previousSibling); // can return comments and text
  log(h1.nextSibling); // so we usually want ElementSibling

  log(h1.parentElement.children);
  [...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) {
      el.style.transform = 'scale(0.5)';
    }
  });
};
learnAboutTraversing();
