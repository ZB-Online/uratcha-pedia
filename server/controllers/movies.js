const { movieConfig } = require('../config/themovie');
const { apiKey, apiBaseUrl } = movieConfig;
const fetch = require('node-fetch');

const getPopularMovies = async (page = 1) => {
  let data = [];
  try {
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
  } catch (error) {
    console.log(error);
  }
  return data;
};

const getMoviesMainDetails = async movieId => {
  let data = {};
  try {
    const response = await fetch(`${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`);
    const responseData = await response.json();
    data = {
      country: responseData?.production_countries.map(country => country.iso_3166_1)[0],
    };
  } catch (error) {}
  return data;
};

const getMoviesWithCountry = async movies => {
  let data = [];
  for (let movie of movies) {
    const additionalInfo = await getMoviesMainDetails(movie.id);
    data = [...data, { ...movie, ...additionalInfo }];
  }
  return data;
};

const searchMoviesById = async keyword => {
  let data = {};
  try {
    const response = await fetch(`${apiBaseUrl}search/movie?query=${keyword}&api_key=${apiKey}`);
    const responseData = await response.json();
    data = responseData
  } catch (error) {
    console.log(error);
  }
  return data;
};

module.exports = {
  getPopularMovies,
  getMoviesDetailsById,
  getMoviesMainDetails,
  getMoviesWithCountry,
  searchMoviesById
};
