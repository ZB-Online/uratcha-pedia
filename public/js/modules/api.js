import { config } from './config.js';
const movieConfig = require('../');

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;

// 1.
export async function getPopularMovies(page = 1) {
  let data = [];
  try {
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`);
    const responseData = await response.json();
    data = responseData?.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    }));
  } catch (error) {}
  return data;
}

function findCertification(certificationData, country) {
  const matchedReleaseDates = certificationData.find(item => item.iso_3166_1 === country);
  const result = matchedReleaseDates?.release_dates.find(date => date.certification !== '');
  return result ? result.certification : 'None';
}

export async function getMoviesDetailsById(movieId) {
  let data = {};
  try {
    const response = await fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
    const responseData = await response.json();
    const responseCredits = await fetch(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
    const responseCreditsData = await responseCredits.json();
    const responseCertification = await fetch(`${BASE_URL}movie/${movieId}/release_dates?api_key=${API_KEY}`);
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
  } catch (error) {}
  return data;
}

// 국가 가져오기
export async function getMoviesBoxOfficeInfo(movieId) {
  let data = {};
  try {
    const response = await fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
    const responseData = await response.json();
    data = {
      country: responseData?.production_countries.map(country => country.iso_3166_1)[0],
    };
  } catch (error) {}
  return data;
}

export async function getMoviesWithCountry(movies) {
  let data = [];
  for (let movie of movies) {
    const additionalInfo = await getMoviesBoxOfficeInfo(movie.id);
    data = [...data, { ...movie, ...additionalInfo }];
  }
  return data;
}
