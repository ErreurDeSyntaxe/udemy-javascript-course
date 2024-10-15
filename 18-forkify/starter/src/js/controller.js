import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';

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

    // 2) Loading Recipe
    await model.loadRecipe(id);

    // 3) Rendering Recipe
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
  if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);
};

// publisher-subscriber
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
