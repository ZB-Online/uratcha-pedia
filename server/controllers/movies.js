const theMovie = require('../utils/themovie');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

const getBoxoffices = async (req, res) => {
  try {
    const movies = await theMovie.getPopularMovies();
    const boxoffices = await theMovie.getMoviesWithCountry(movies);
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

module.exports = {
  getBoxoffices,
  getMovieDetailById,
  getSearchMovies,
};
