import { config } from './config.js';

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;

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

export async function getMoviesMainDetails(movieId) {
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
