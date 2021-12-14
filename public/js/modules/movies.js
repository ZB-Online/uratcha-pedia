import { getPopularMovies, getMoviesMainDetails } from './api.js';
import { carousel } from './carousel.js';
import '../../css/main.css';

async function getMoviesWithCountry(movies) {
  let data = [];
  for (let movie of movies) {
    const additionalInfo = await getMoviesMainDetails(movie.id);
    data = [...data, { ...movie, ...additionalInfo }];
  }
  return data;
}

export async function renderMovies() {
  const movies = await getPopularMovies();
  const moviesWithCountry = await getMoviesWithCountry(movies);

  carousel(document.querySelector('.carousel'), moviesWithCountry);
}
