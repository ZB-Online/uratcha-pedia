import fetch from '../utils/fetch';

const getBoxOffice = async () => {
  try {
    const { resData } = await fetch.get('/api/movies');
    const boxOffice = await Promise.all(
      resData.map(async movie => {
        const { resData } = await fetch.get(`/api/stars/${movie.id}`);
        return { ...movie, averageStar: resData.averageStar };
      })
    );
    return boxOffice;
  } catch (e) {
    console.error('movie api not fetched: ', e);
  }
};

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

export default { getBoxOffice, getMyScoredMovies, getSearchMovies, getMovieDetails, getSimilarWorksByGenre };
