import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // removes the recipe/error message previously displayed
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render the received object to the DOM
   * @param {Obect | Object[]} data The data to be rendered (eg: recipe)
   * @param {boolean} [render=true] If failse, create markup instead of rendering to DOM
   * @returns {undefined | string} A markup string is returned is render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Task 1 & Task 2
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update only the changes (the text) (not the whole View)
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // create a virtual DOM so we can compare to the actual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // convert to arrays to use forEach & [notation]
    const newElements = [...newDOM.querySelectorAll('*')];
    const curElements = [...this._parentElement.querySelectorAll('*')];

    // loop over virtual DOM
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      // updates changed attribute values
      if (!newEl.isEqualNode(curEl))
        [...newEl.attributes].forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // display a spinning icon to indicate loading/processing
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // display an error if recipe not found
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>  
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // will use this function later. not sure yet what it is for
  renderMessage(message = this._successMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>  
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
