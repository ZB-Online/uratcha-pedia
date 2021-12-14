import { mainCarousel, myScoredCarousel } from './carousel.js';

async function getBoxOfficeMovies() {
  const res = await fetch('http://localhost:7979/api/movies/');
  const data = await res.json();
  return data;
}

async function getMyScoredMovies() {
  const res = await fetch('http://localhost:7979/api/movies/');
  const data = await res.json();
  return data;
}

export async function renderMovies() {
  const boxOfficeMovies = await getBoxOfficeMovies();

  mainCarousel(document.querySelector('.carousel.box-office'), boxOfficeMovies);
  mainCarousel(document.querySelector('.carousel.highest-rates'), boxOfficeMovies);
}

export async function renderMyScoredMovies() {
  const boxOfficeMovies = await getBoxOfficeMovies();

  myScoredCarousel(document.querySelector('.my-scored-movies-container__inner'), boxOfficeMovies);
}
