import fetch from '../utils/fetch';

const getMyScoredMovies = async userEmail => {
  try {
    const { resData } = await fetch.get(`/api/movies/users/${userEmail}`);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const getSearchMovies = async keyword => {
  try {
    const { resData } = await fetch.get(`/api/movies/search/${keyword}`);
    return resData;
  } catch (err) {
    onsole.log(err);
  }
};

const getMovieDetails = async movieId => {
  try {
    const data = await fetch.get(`/api/movies/${movieId}`);
    const movieDetailsData = await data?.resData;
    return movieDetailsData;
  } catch (err) {
    console.error(err);
  }
};

const getSimilarWorksByGenre = async genre => {
  try {
    if (!genre) return;
    const { resData } = await fetch.get(`/api/movies/genre/${genre}`);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

export { getMyScoredMovies, getSearchMovies, getMovieDetails, getSimilarWorksByGenre };
