const theMovie = require('../utils/themovie');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

const getBoxoffices = async (req, res) => {
  let boxoffices;
  try {
    const movies = await theMovie.getPopularMovies();
    boxoffices = await theMovie.getMoviesWithCountry(movies);
  } catch {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
  res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, boxoffices));
};

const getMovieDetailById = async (req, res) => {
  const { movieId } = req.params;
  let movieDetail;
  try {
    movieDetail = await theMovie.getMoviesDetailsById(movieId);
  } catch {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
  res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, movieDetail));
};

const getSearchMovies = async (req, res) => {
  const { keyword } = req.params;
  let searchMovies;
  try {
    searchMovies = await theMovie.searchMoviesById(keyword);
  } catch {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
  res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, searchMovies));
};

module.exports = {
  getBoxoffices,
  getMovieDetailById,
  getSearchMovies,
};
