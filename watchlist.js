import { renderFilmList } from "./utils.js";

const main = document.querySelector("main");

// Render content to main
render();

// Add event listener to remove button
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    remove(e.target.dataset.id);
  }
});

// Remove film from list
function remove(id) {
  const watchList = JSON.parse(localStorage.getItem("watchlist")).filter(
    (el) => el !== id
  );

  if (!watchList.length) {
    localStorage.removeItem("watchlist");
  } else {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }
  render();
}

function render() {
  // Check if there are films in the watchlist (only store ids - it's an array of id strings)
  if (localStorage.getItem("watchlist")) {
    // If there are films in the watchlist, render them
    renderFilmList(
      JSON.parse(localStorage.getItem("watchlist")),
      main,
      "remove"
    );
  } else {
    // If the watchlist is empty, disply the message below
    main.innerHTML = `
              <h3>Your watchlist is looking a little empty...</h3>
              <a href="index.html" class="watchlist-btn add-films">Let’s add some movies!</a>
          `;
  }
}
