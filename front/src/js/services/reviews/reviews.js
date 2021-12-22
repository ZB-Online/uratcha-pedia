import fetch from '../../utils/fetch';

const getReviewsByMovieId = async movieId => {
  try {
    const data = await fetch.get(`/api/reviews/${movieId}`);
    const reviewsByMovieId = await data?.resData;
    return reviewsByMovieId;
  } catch (err) {
    console.error(err);
  }
};

const getUserReview = async (movieId, userEmail) => {
  try {
    const response = await fetch.get(`/api/reviews/movies/${movieId}/users/${userEmail}`);
    return response?.resData;
  } catch (err) {
    console.error(err);
  }
};

const postUserReview = async (userEmail, movieId, comment) => {
  try {
    const newReview = {
      userEmail,
      movieId,
      comment,
    };
    const response = await fetch.post('/api/reviews', newReview);
    return response.resData;
  } catch (err) {
    console.error(err);
  }
};

const patchUserReview = async (id, userEmail, movieId, comment) => {
  try {
    const userReview = {
      id,
      userEmail,
      movieId,
      comment,
    };
    const response = await fetch.patch('/api/reviews', userReview);
    return response ? userReview : this.state.userReview;
  } catch (err) {
    console.error(err);
  }
};

const deleteMyReview = async id => {
  try {
    const response = await fetch.delete(`/api/reviews/${id}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export { getReviewsByMovieId, getUserReview, postUserReview, patchUserReview, deleteMyReview };
