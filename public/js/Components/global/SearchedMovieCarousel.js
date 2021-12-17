export default function SearchedMovieCarousel({ $target, initialState }) {
  const $searchedMovieCarousel = document.createElement('div');
  $searchedMovieCarousel.classList.add('search-result-container__inner');
  $target.appendChild($searchedMovieCarousel);

  this.state = {
    movies: initialState.searchResult,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    const { movies } = this.state;

    $searchedMovieCarousel.innerHTML = `<ul class="search-result-container__list carousel-slides">
    ${movies
      .map(
        movie => `
        <li class="search-result-item" data-movie-id="${movie.id}">
          <a href="javascript:void(0);">
            <img src="${movie.poster_path}" alt="movie-poster" />
            <div class="search-result-item__info">
              <div class="search-result-item__title">${movie.title}</div>
              <div class="search-result-item__subtitle">
                <span>${movie.release_date.split('-')[0]} ・ ${movie.country}</span>
              </div>
              <div class="search-result-item__category"><span>영화</span></div>
            </div>
          </a> 
        </li>`
      )
      .join('')}
      </ul>
      <button class="carousel-control prev">
        <img
          class="carousel-control-image prev"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
          alt="backward"
        />
      </button>
      <button class="carousel-control next">
        <img
          class="carousel-control-image next"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
          alt="forward"
        />
      </button>`;

    return $searchedMovieCarousel;
  };

  this.bindEvents = () => {};

  this.render();
  this.bindEvents();
}
