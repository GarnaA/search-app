import { 
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener
 } from "./searchBar.js";

import {
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
  deleteSearchResults
} from "./searchResults.js";

import { 
  getSearchTerm,
  retrieveSearchResults
 } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
  if(event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);
  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
}

const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if(searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if(resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};