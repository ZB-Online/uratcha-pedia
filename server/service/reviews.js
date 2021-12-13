let reviewModel = require('../models/reviews');

const getReviews = () => {
  return reviewModel;
};

const getReviewsByMovieId = movieId => {
  return reviewModel.filter(review => review.movieId === +movieId);
};

const getReviewByMovieIdUserEmail = (movieId, userEmail) => {
  const [isReview] = reviewModel.filter(review => review.movieId === +movieId && review.userEmail === userEmail);
  return isReview ? isReview : false;
};

const addReview = newReview => {
  reviewModel = [...reviewModel, newReview];
};

const findReviewById = id => {
  return reviewModel.some(review => review.id === +id);
};

const updateReview = (id, comment) => {
  reviewModel = reviewModel.map(review => (review.id === +id ? { ...review, comment } : review));
};

const removeReview = id => {
  reviewModel = reviewModel.filter(review => review.id !== +id);
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewByMovieIdUserEmail,
  addReview,
  findReviewById,
  updateReview,
  removeReview,
};
