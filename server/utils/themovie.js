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
    const certification = await findCertification(responseCertificationData?.results, country);
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

const getMoviesForAdditionalInfo = async movies =>
  await Promise.all(
    movies.map(async movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movieConfig.imageBaseUrl + movie.poster_path,
      release_date: movie.release_date,
      ...(await getMoviesWithCountry(movie.id)),
    }))
  );

const searchMoviesByKeyword = async keyword => {
  try {
    const response = await fetch(`${apiBaseUrl}search/movie?query=${keyword}&api_key=${apiKey}`);
    const movies = await response.json();
    return await getMoviesForAdditionalInfo(movies.results);
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

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const getSimilarWorksByGenreId = async genre => {
  try {
    const response = await fetch(
      `${apiBaseUrl}discover/movie?api_key=${apiKey}&with_genres=${genres.find(item => item.name === genre).id}`
    );
    const { results } = await response.json();
    return results.map(result => ({
      ...result,
      poster_path: movieConfig.imageBaseUrl + result.poster_path,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getPopularMovies,
  getMoviesDetailsById,
  getMoviesWithCountry,
  getMoviesForBoxOffice,
  getMoviesForStars,
  searchMoviesByKeyword,
  getSimilarWorksByGenreId,
};
