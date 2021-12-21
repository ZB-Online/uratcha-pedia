import fetch from '../../utils/fetch';

const getMyScoredMovies = async userEmail => {
  try {
    const { resData } = await fetch.get(`/api/movies/users/${userEmail}`);
    return resData;
  } catch (err) {
    console.log(err);
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

export { getMyScoredMovies, getSearchMovies };
