import { titleFormat } from '../../utils/carousel';

export default function HighestRankingCarousel({ $target, initialState }) {
  const $highestRankingCarousel = document.createElement('div');
  $highestRankingCarousel.classList.add('carousel', 'highest-ranking');
  $target.appendChild($highestRankingCarousel);

  this.state = {
    movies: initialState,
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    const { movies } = this.state;

    $highestRankingCarousel.innerHTML = `<ul class="movie-score carousel-slides">
      ${movies
        .map(
          (movie, i) => `
            <li class="movie-item" data-movie-id="${movie?.id}">
            <div class="movie-poster">
                <div class="movie-poster-num" data-num='${i}'>${i + 1}</div>
                <img src="${movie.poster_path ? movie.poster_path : '../../../img/no_image.png'}" alt="movie-poster" />
            </div>
            <div class="movie-detail">
                <span class="movie-title">${movie?.title ? titleFormat(movie.title) : ''}</span>
                <div class="movie-info">
                <span class="movie-year">${movie?.release_date}</span>
                <span>ㆍ</span>
                <span class="movie-country">${movie?.country}</span>
                </div>
                <span class="movie-score">평균★${movie?.averageStar}</span>
            </div>
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

    return $highestRankingCarousel;
  };

  this.render();
}
