import fetch from '../utils/fetch';

const getStarsByMovieId = async movieId => {
  try {
    const { resData } = await fetch.get(`/api/stars/movies/${movieId}`);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const getAverageStarsByMovieId = async movieId => {
  try {
    const { resData } = await fetch.get(`/api/stars/${movieId}`);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const getUserScore = async (movieId, userEmail) => {
  try {
    const response = await fetch.get(`/api/stars/movies/${movieId}/users/${userEmail}`);
    return response.resData?.star;
  } catch (err) {
    console.error(err);
  }
};

const postUserScore = async (userEmail, movieId, score) => {
  try {
    const response = await fetch.post('/api/stars', {
      userEmail,
      movieId,
      score,
    });
    return response.resData;
  } catch (err) {
    console.error(err);
  }
};

const patchUserScore = (id, movieId, score) => {
  try {
    fetch.patch('/api/stars', {
      id,
      movieId,
      score,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteUserScore = id => {
  try {
    fetch.delete(`/api/stars/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export { getStarsByMovieId, getAverageStarsByMovieId, getUserScore, postUserScore, patchUserScore, deleteUserScore };
