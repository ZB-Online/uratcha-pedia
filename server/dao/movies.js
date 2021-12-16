let movieModel = require('../models/movies');

const getMovies = () => movieModel;

const findMovieByMovieId = movieId => movieModel.some(movie => movie.movieId === +movieId);

const addMovie = newMovie => (movieModel = [...movieModel, newMovie]);

const updateMovie = (movieId, average) =>
  (movieModel = movieModel.map(movie => (movie.movieId === +movieId ? { ...movie, average } : movie)));

const getStarRankMovies = () => movieModel.sort((x, y) => y.average - x.average).slice(0, 20);

module.exports = {
  getMovies,
  findMovieByMovieId,
  addMovie,
  updateMovie,
  getStarRankMovies,
};
