import noImage from 'Images/no_image.png';

export default function MyScoredMoviesCarousel({ $target, initialState }) {
  const $myScoredMoviesCarousel = document.createElement('div');
  $target.appendChild($myScoredMoviesCarousel);

  this.state = {
    movies: initialState.myScoredMovies,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
    this.bindEvents();
  };

  this.render = () => {
    if (!this.state) return;

    const { movies } = this.state;

    $myScoredMoviesCarousel.innerHTML = `<ul class="my-scored-movies-container__list carousel-slides">
    ${movies
      .map(
        ({ id, poster_path, title, score }) => `
        <li class="my-scored-movies-item" data-movie-id="${id}">
          <a href="javascript:void(0);">
            <img src="${poster_path ? poster_path : noImage}" alt="poster" />
            <div class="my-scored-movies-item__info">
              <div class="my-scored-movies-item__title">
                ${title}
              </div>
              <div class="my-scored-movies-item__score">
                Rated ★ ${score}
              </div>
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
  };

  this.bindEvents = () => {};

  this.render();
  this.bindEvents();
}
