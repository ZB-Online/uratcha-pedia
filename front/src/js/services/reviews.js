import fetch from '../utils/fetch';

const getReviewsByMovieId = async movieId => {
  try {
    const { resData } = await fetch.get(`/api/reviews/${movieId}`);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const getUserReview = async (movieId, userEmail) => {
  try {
    const { resData } = await fetch.get(`/api/reviews/movies/${movieId}/users/${userEmail}`);
    return resData;
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
    const { resData } = await fetch.post('/api/reviews', newReview);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const patchUserReview = async (id, userEmail, movieId, comment, originReview) => {
  try {
    const userReview = {
      id,
      userEmail,
      movieId,
      comment,
    };
    const response = await fetch.patch('/api/reviews', userReview);
    return response ? userReview : originReview;
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

const getScoredReviews = async reviewsByMovieId => {
  const scoredReviews = await Promise.all(
    reviewsByMovieId.map(async review => {
      const { resData } = await fetch.get(`/api/stars/movies/${review.movieId}/users/${review?.userEmail}`);
      return { ...review, score: resData.star.score };
    })
  );
  return scoredReviews;
};

export default {
  getReviewsByMovieId,
  getUserReview,
  postUserReview,
  patchUserReview,
  deleteMyReview,
  getScoredReviews,
};
