import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// parcel's way of avoiding to re-trigger a state
// if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    // 0) get the url
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2) Update Bookmarks
    bookmarksView.update(model.state.bookmarks);

    // 3) Loading Recipe
    await model.loadRecipe(id);

    // 4) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render search results
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (targetPage) {
  console.log(targetPage);
  resultsView.render(model.getSearchResultsPage(targetPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in the state)
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe); // this renders the whole page anew
  recipeView.update(model.state.recipe); // this renders the changed elements
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);

  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render the recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // Render boomark view
    bookmarksView.render(model.state.bookmarks);

    // Change url ID
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

// publisher-subscriber
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
