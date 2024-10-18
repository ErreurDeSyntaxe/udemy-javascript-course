import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successufully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this._addHandlerToggleModal();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Jonas' way of activating the modal
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }
  // My way of activating the modal
  // _addHandlerToggleModal() {
  //   [this._btnOpen, this._btnClose].forEach(btn =>
  //     btn.addEventListener('click', this.toggleWindow.bind(this))
  //   );
  // }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(document.querySelector('.upload'))];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
