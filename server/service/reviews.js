let reviewModel = require('../models/reviews');

const getReviews = () => {
  return reviewModel;
};

const getReviewsByMovieId = movieId => {
  return reviewModel.filter(review => review.movieId === +movieId);
};

const getReviewsByMovieIdUserEmail = (movieId, userEmail) => {
  const [isReview] = reviewModel.filter(review => review.movieId === +movieId && review.userEmail === userEmail);
  return isReview ? isReview : false
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewsByMovieIdUserEmail,
};
