const theMovie = require('../utils/themovie');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');
const movieDao = require('../dao/movies');

const getMovies = (req, res) => {
  res.send(movieDao.getMovies());
};

const getBoxoffices = async (req, res) => {
  try {
    const movies = await theMovie.getPopularMovies();
    const boxoffices = await theMovie.getMoviesForBoxOffice(movies);
    res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, boxoffices));
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
};

const getMovieDetailById = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieDetail = await theMovie.getMoviesDetailsById(movieId);
    res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, movieDetail));
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
};

const getSearchMovies = async (req, res) => {
  const { keyword } = req.params;
  try {
    const searchMovies = await theMovie.searchMoviesByKeyword(keyword);
    res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, searchMovies));
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
};

const getStarRankMovies = async (req, res) => {
  const movieRank = movieDao.getStarRankMovies();
  const movies = await theMovie.getMoviesForStars(movieRank);
  res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, movies));
};

module.exports = {
  getMovies,
  getBoxoffices,
  getMovieDetailById,
  getSearchMovies,
  getStarRankMovies,
};
