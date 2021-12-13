const reviewService = require('../service/reviews');

const getReviews = (req, res) => {
  res.send(reviewService.getReviews());
};

const getReviewsByMovieId = (req, res) => {
  const { movieId } = req.params;
  res.send(reviewService.getReviewsByMovieId(movieId));
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
};
