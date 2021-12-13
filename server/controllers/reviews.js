const reviewService = require('../service/reviews');
const userService = require('../service/users');
const resData = require('../../utils/resData');
const resMessage = require('../../utils/resMessage');

const getReviews = (req, res) => {
  res.send(reviewService.getReviews());
};

const getReviewsByMovieId = (req, res) => {
  const { movieId } = req.params;
  const reviews = reviewService.getReviewsByMovieId(movieId);
  res.status(200).json(resData.successTrue(null, reviews));
};

const getReviewsByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  const review = reviewService.getReviewsByMovieIdUserEmail(movieId, userEmail);
  res.status(200).json(resData.successTrue(null, review));
};

const addReview = (req, res) => {
  const newReview = req.body;
  if (!userService.findUserByEmail(newReview.userEmail))
    res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  // TODO : moviewId validation
  // TODO : moviewId-email당 1개
  reviewService.addReview(newReview);
  res.status(200).json(resData.successTrue(null));
};

const updateReview = (req, res) => {
  const { id, comment } = req.body;
  if (!reviewService.findReviewById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewService.updateReview(id, comment);
  res.status(200).json(resData.successTrue(null));
};

const removeReview = (req, res) => {
  const { id } = req.body;
  if (!reviewService.findReviewById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewService.removeReview(id);
  res.status(200).json(resData.successTrue(null));
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewsByMovieIdUserEmail,
  addReview,
  updateReview,
  removeReview,
};
