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
  res.status(200).json(resData.successTrue(resMessage.REVIEW_GET_SUCCESS, reviews));
};

const getReviewByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  const review = reviewService.getReviewByMovieIdUserEmail(movieId, userEmail);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_GET_SUCCESS, review));
};

const addReview = (req, res) => {
  const newReview = req.body;
  if (!userService.findUserByEmail(newReview.userEmail))
    res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  // TODO : movieId validation
  // TODO : movieId-email당 1개
  reviewService.addReview(newReview);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_CREATE_SUCCESS));
};

const updateReview = (req, res) => {
  const { id, comment } = req.body;
  if (!reviewService.findReviewById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewService.updateReview(id, comment);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_UPDATE_SUCCESS));
};

const removeReview = (req, res) => {
  const { id } = req.body;
  if (!reviewService.findReviewById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewService.removeReview(id);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_DELETE_SUCCESS));
};

module.exports = {
  getReviews,
  getReviewsByMovieId,
  getReviewByMovieIdUserEmail,
  addReview,
  updateReview,
  removeReview,
};
