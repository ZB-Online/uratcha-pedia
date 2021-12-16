const { movieConfig } = require('../config/themovie');
const { apiKey, apiBaseUrl } = movieConfig;
const fetch = require('node-fetch');

const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`${apiBaseUrl}movie/popular?api_key=${apiKey}&page=${page}`);
    const responseData = await response.json();
    return responseData?.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movieConfig.imageBaseUrl + movie.poster_path,
      release_date: movie.release_date,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const findCertification = async (certificationData, country) => {
  const matchedReleaseDates = certificationData.find(item => item.iso_3166_1 === country);
  const result = matchedReleaseDates?.release_dates.find(date => date.certification !== '');
  return result ? result.certification : 'None';
};

const getMoviesDetailsById = async movieId => {
  try {
    const [responseData, responseCreditsData, responseCertificationData] = await Promise.all(
      await Promise.all([
        fetch(`${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`),
        fetch(`${apiBaseUrl}movie/${movieId}/credits?api_key=${apiKey}`),
        fetch(`${apiBaseUrl}movie/${movieId}/release_dates?api_key=${apiKey}`),
      ]).then(promises => promises.map(promise => promise.json()))
    );
    const country = responseData?.production_countries.map(country => country.iso_3166_1)[0];
    const certification = findCertification(responseCertificationData?.results, country);
    return {
      id: responseData?.id,
      title: responseData?.title,
      overview: responseData?.overview,
      poster_path: movieConfig.imageBaseUrl + responseData?.poster_path,
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
    throw new Error(error);
  }
};

const getMoviesWithCountry = async movieId => {
  try {
    const response = await fetch(`${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`);
    const responseData = await response.json();
    return {
      country: responseData?.production_countries.map(country => country.iso_3166_1)[0],
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getMoviesForBoxOffice = async movies =>
  await Promise.all(movies.map(async movie => ({ ...movie, ...(await getMoviesWithCountry(movie.id)) })));

const searchMoviesByKeyword = async keyword => {
  try {
    const response = await fetch(`${apiBaseUrl}search/movie?query=${keyword}&api_key=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getMyScoredMoviesInfo = async movieId => {
  try {
    const response = await fetch(`${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`);
    const responseData = await response.json();
    return {
      title: responseData?.title,
      release_date: responseData?.release_date,
      country: responseData?.production_countries?.map(country => country.iso_3166_1)[0],
      poster_path: movieConfig.imageBaseUrl + responseData?.poster_path,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getMoviesForStars = async movieRank =>
  await Promise.all(
    movieRank.map(async ({ movieId, average }) => ({
      id: movieId,
      average,
      ...(await getMyScoredMoviesInfo(movieId)),
    }))
  );

module.exports = {
  getPopularMovies,
  getMoviesDetailsById,
  getMoviesWithCountry,
  getMoviesForBoxOffice,
  getMoviesForStars,
  searchMoviesByKeyword,
};
