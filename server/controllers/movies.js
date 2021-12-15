const theMovie = require('../utils/themovie');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

const getBoxoffices = async (req, res) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${apiBaseUrl}movie/popular?api_key=${apiKey}&page=${page}`);
    const responseData = await response.json();
    data = responseData?.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movieConfig.imageBaseUrl + movie.poster_path,
      release_date: movie.release_date,
    }));
  } catch (error) {}
  return data;
};

const findCertification = async (certificationData, country) => {
  const matchedReleaseDates = certificationData.find(item => item.iso_3166_1 === country);
  const result = matchedReleaseDates?.release_dates.find(date => date.certification !== '');
  return result ? result.certification : 'None';
};

const getMoviesDetailsById = async movieId => {
  let data = {};
  try {
    const response = await fetch(`${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`);
    const responseData = await response.json();
    const responseCredits = await fetch(`${apiBaseUrl}movie/${movieId}/credits?api_key=${apiKey}`);
    const responseCreditsData = await responseCredits.json();
    const responseCertification = await fetch(`${apiBaseUrl}movie/${movieId}/release_dates?api_key=${apiKey}`);
    const responseCertificationData = await responseCertification.json();
    const country = responseData?.production_countries.map(country => country.iso_3166_1)[0];
    const certification = findCertification(responseCertificationData?.results, country);

    data = {
      id: responseData?.id,
      title: responseData?.title,
      overview: responseData?.overview,
      poster_path: responseData?.poster_path,
      release_date: responseData?.release_date,
      genres: responseData?.genres.map(genre => genre.name),
      country,
      runtime: responseData?.runtime,
      certification,
      cast: responseCreditsData?.cast.slice(0, 6).map(cast => ({
        name: cast.name,
        character: cast.character,
      })),
    };
=======
    const movies = await theMovie.getPopularMovies();
    const boxoffices = await theMovie.getMoviesWithCountry(movies);
    res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, boxoffices));
>>>>>>> bb91af3f797a266de0d7fcbfe7b4d209666b3231
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
<<<<<<< HEAD
    const response = await fetch(`${apiBaseUrl}search/movie?query=${keyword}&api_key=${apiKey}`);
    const responseData = await response.json();
    data = responseData;
=======
    const searchMovies = await theMovie.searchMoviesByKeyword(keyword);
    res.status(200).json(resData.successTrue(resMessage.MOVIE_GET_SUCCESS, searchMovies));
>>>>>>> bb91af3f797a266de0d7fcbfe7b4d209666b3231
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
<<<<<<< HEAD
  getPopularMovies,
  getMoviesDetailsById,
  getMoviesMainDetails,
  getMoviesWithCountry,
  searchMoviesById,
=======
  getBoxoffices,
  getMovieDetailById,
  getSearchMovies,
>>>>>>> bb91af3f797a266de0d7fcbfe7b4d209666b3231
};
