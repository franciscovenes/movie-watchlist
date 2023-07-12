async function renderFilmList(idList, element, action = "add") {
  // Prepare html in a string literal
  let html = `<ul class="film-list">`;
  for (let id of idList) {
    // Request each film details from the API
    const res = await fetch(`https://www.omdbapi.com/?apikey=86c0a346&i=${id}`);
    const data = await res.json();

    const { Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot } = data;

    // Add film details to string
    html += `
                    <li class="film">
                        ${
                          Poster !== "N/A"
                            ? `<img
                        class="film-poster"
                        src=${Poster}
                        alt="The film's poster"
                        />`
                            : `<p class="film-poster unavailable">Not available</p>`
                        } 
                        <div class="first-row">
                        <h3 class="film-title">${Title}</h3>
                        <p class="film-classification">${imdbRating}</p>
                        <p class="message" id=${imdbID}></p>
                        </div>
                        <div class="second-row">
                        <p class="film-duration">${Runtime}</p>
                        <p class="film-genres">${Genre}</p>
                        <button 
                          class="${
                            action === "remove"
                              ? "watchlist-btn remove"
                              : "watchlist-btn"
                          }" 
                          data-id=${imdbID}
                        >${
                          action === "remove" ? "Remove" : "Watchlist"
                        }</button>
                        </div>
    
                        <p class="film-plot">${Plot}</p>
                    </li>
                `;
  }

  html += "</ul>";

  // Add html content in string literal to the DOM.
  element.innerHTML = html;
}

export { renderFilmList };
