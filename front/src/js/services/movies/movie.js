import fetch from '../../utils/fetch';

const fetchMyScoredMovies = async userEmail => {
  try {
    const { resData } = await fetch.get(`/api/movies/users/${userEmail}`);
    return resData;
  } catch (e) {
    console.error('my scored movies api not fetched: ', e);
  }
};

const getSearchMovies = async keyword => {
  try {
    const { resData } = await fetch.get(`/api/movies/search/${keyword}`);
    return resData;
  } catch (e) {
    console.error('search-result api not fetched: ', e);
  }
};

export { fetchMyScoredMovies, getSearchMovies };
