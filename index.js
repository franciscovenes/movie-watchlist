import { renderFilmList } from "./utils.js";

// Store DOM elements in variables

const searchInput = document.getElementById("search-input");
const main = document.querySelector("main");

// Event listeners

document.addEventListener("click", (e) => {
  if (e.target.id === "search-btn") {
    handleClick();
  } else if (e.target.dataset.id) {
    const watchList = localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [];

    if (!watchList.includes(e.target.dataset.id)) {
      watchList.push(e.target.dataset.id);
      localStorage.setItem("watchlist", JSON.stringify(watchList));
    } else {
      // Display warning saying the film is already in the watchlist

      document.getElementById(
        e.target.dataset.id
      ).textContent = `Already in your watchlist!`;

      setTimeout(() => {
        document.getElementById(e.target.dataset.id).textContent = "";
      }, 2000);
    }
  }
});

async function handleClick() {
  // Display message while the API request is being processed

  main.innerHTML = `<h3>Searching OMDb database...<h3>`;

  // API request
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=86c0a346&s=${searchInput.value}&type=movie`
  );

  const data = await res.json();

  if (data.Response === "False") {
    // If the search returns no results, display the message below
    main.innerHTML =
      "<h3>Unable to find what your're looking for. Please try another search.</h3>";
  } else {
    // If it returns any results, only display the first six (to accelerate the process)
    const idList = data.Search.slice(0, 6).map((film) => film.imdbID);

    // Render the films
    renderFilmList(idList, main);
  }
  // Clear input field
  searchInput.value = "";
}
