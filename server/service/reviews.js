let reviewModel = require('../models/reviews');

const getReviews = () => {
  return reviewModel;
};

const getReviewsByMovieId = movieId => {
  return reviewModel.filter(review => review.movieId === +movieId);
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
};
