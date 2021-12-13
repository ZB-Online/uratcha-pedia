const reviewService = require('../service/reviews');

const getReviews = (req, res) => {
  res.send(reviewService.getReviews());
};

const getReviewsByMovieId = (req, res) => {
  const { movieId } = req.params;
  res.send(reviewService.getReviewsByMovieId(movieId));
};

const getReviewsByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  res.send(reviewService.getReviewsByMovieIdUserEmail(movieId, userEmail));
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewsByMovieIdUserEmail,
};
