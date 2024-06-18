'use strict';
const log = console.log;

/*
 *
 * Navigation Fade Animation: Upon hover, fade other nav elements
 *
 */
const activateMenuFade = function () {
  const nav = document.querySelector('.nav');
  const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  // nav.addEventListener('mouseover', handleHover); // doesn't work, no args
  // nav.addEventListener('mouseover', function (e) { // works but is ugly
  //   handleHover(e, 0.5);
  // });
  // nav.addEventListener('mouseout', function (e) {
  //   handleHover(e, 1);
  // });

  // passing an "argument" into a handler function
  nav.addEventListener('mouseover', handleHover.bind(0.5));
  nav.addEventListener('mouseout', handleHover.bind(1));
};
activateMenuFade();

/*
 *
 * Navigation Sticky Effect: Upon scrolling down, nav sticks to top
 *
 */
const activateStickyNav = function () {
  const nav = document.querySelector('.nav');
  const section1 = document.querySelector('#section--1');
  const initialCoords = section1.getBoundingClientRect();
  log(initialCoords);
  window.addEventListener('scroll', () => {
    if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};
// activateStickyNav();

/*
 *
 * Intersection Observer API: efficient scroll event
 *
 */
const learnAboutIntersectionObserverAPI = function () {
  const section1 = document.querySelector('#section--1');

  // first argument of IntersectionObserver
  const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
      log(entry);
    });
  };

  // second argument of IntersectioObserver
  const obsOptions = {
    // root: what we want to intersect with (here it's section1)
    // null === entire viewport
    root: null,
    // threshold: percentage of intersection that triggers the callback
    // 0.1 === 10% within the root -> callback function is called
    // could be an array
    threshold: [0, 0.2],
  };

  // the IntersectionObserver with its 2 arguments
  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(section1);
};
// learnAboutIntersectionObserverAPI();

/*
 *
 * Navigation Sticky Effect: Upon observing, nav sticks to top
 *
 */
const activateStickyNavBetter = function () {
  const nav = document.querySelector('.nav');
  const navHeight = nav.getBoundingClientRect().height;
  const header = document.querySelector('.header');
  const stickyNav = function (entries) {
    const [entry] = entries; // const [entry] = entries[0]

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  headerObserver.observe(header);
};
activateStickyNavBetter();

/*
 *
 * Tab Component: Finding the elements and applying/removing styles
 *
 */
const activateTabComponent = function () {
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');

  // bad practice
  // tabs.forEach(tab => tab.addEventListener('click', () => log('tab')));
  tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    // Guard clause: if the container was clicked but none of the buttons were
    if (!clicked) return;

    log(clicked.dataset.tab);
    // Deactivate & Activate the tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    // Hide & Display the tab content
    document
      .querySelector('.operations__content--active')
      .classList.remove('operations__content--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });
};
activateTabComponent();

/*
 *
 * Modal Window: Opening and Closing the modal (buttons and escape key)
 *
 */
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

/*
 *
 * Smooth Scrolling: Old School & Modern Approches
 *
 */
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

/*
 *
 * Events & Handlers: Different ways of handling events
 *
 */
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

/*
 *
 * Event Delegation: How to create only one listerner for multiple targets
 *
 */
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

/*
 *
 * Selecting DOM Elements: Class, Tag, ID
 *
 */
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

/*
 *
 * Creating & Inserting Elements
 *
 */
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

/*
 *
 * Styling Elements: Reading and setting properties
 *
 */
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

/*
 *
 * Traversing the DOM: Moving from element to element
 *
 */
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
// learnAboutTraversing();
