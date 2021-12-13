const $boxOffice = document.querySelector('.box-office');

import { getPopularMovies, getMoviesMainDetails } from './api.js';
import { config } from './config.js';
import '../../css/main.css';

async function getBoxOfficeMovies(movies) {
  let data = [];
  for (let movie of movies) {
    const additionalInfo = await getMoviesMainDetails(movie.id);
    data = [...data, { ...movie, ...additionalInfo }];
  }
  return data;
}

export async function renderMovies() {
  const movies = await getPopularMovies();
  const boxOfficeMovies = await getBoxOfficeMovies(movies);

  $boxOffice.innerHTML = boxOfficeMovies
    ?.map(movie => renderSingleMovie(movie))
    .slice(0, 6)
    .join('');
}

function renderSingleMovie(movie) {
  return `
        <li class="movie-item">
          <div class="movie-poster">
            <div class="movie-poster-num" data-num="1">1</div>
            <img src="${config.image_base_url + movie?.poster_path}" alt="movie-poster" />
          </div>
          <div class="movie-detail">
            <span class="movie-title">${movie?.title}</span>
            <div class="movie-info">
              <span class="movie-year">${movie?.release_date}</span>
              <span>ㆍ</span>
              <span class="movie-country">${movie?.country}</span>
            </div>
            <div>연령등급 : ${movie?.certification}</div>
            <span class="movie-score">평균★3.9</span>
          </div>
        </li>
        `;
}
