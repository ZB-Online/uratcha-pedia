let reviewModel = require('../models/reviews');

const getReviews = () => reviewModel;

const getReviewsByMovieId = movieId => reviewModel.filter(review => review.movieId === +movieId);

const getReviewByMovieIdUserEmail = (movieId, userEmail) => {
  const isReview = reviewModel.find(review => review.movieId === +movieId && review.userEmail === userEmail);
  return isReview ?? false;
};

const addReview = newReview => (reviewModel = [...reviewModel, newReview]);

const findReviewById = id => reviewModel.some(review => review.id === +id);

const updateReview = (id, comment) =>
  (reviewModel = reviewModel.map(review => (review.id === +id ? { ...review, comment } : review)));

const removeReview = id => (reviewModel = reviewModel.filter(review => review.id !== +id));

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewByMovieIdUserEmail,
  addReview,
  findReviewById,
  updateReview,
  removeReview,
};
