const reviewDao = require('../dao/reviews');
const userDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

const getReviews = (req, res) => {
  res.send(reviewDao.getReviews());
};

const getReviewsByMovieId = (req, res) => {
  const { movieId } = req.params;
  if (!movieId) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  const reviews = reviewDao.getReviewsByMovieId(movieId);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_GET_SUCCESS, reviews));
};

const getReviewByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  if (!movieId || !userEmail) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!userDao.findUserByEmail(userEmail))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  const review = reviewDao.getReviewByMovieIdUserEmail(movieId, userEmail);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_GET_SUCCESS, review));
};

const addReview = (req, res) => {
  const newReview = req.body;
  if (Object.values(newReview).some(info => !info) || Object.values(newReview).length !== 4)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (reviewDao.findReviewById(newReview.id))
    return res.status(400).json(resData.successFalse(resMessage.ID_ALREADY_EXIST));
  if (!userDao.findUserByEmail(newReview.userEmail))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  if (reviewDao.getReviewByMovieIdUserEmail(newReview.movieId, newReview.userEmail))
    return res.status(400).json(resData.successFalse(resMessage.REVIEW_ALREADY_EXIST));
  // TODO : movieId validation
  reviewDao.addReview(newReview);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_CREATE_SUCCESS));
};

const updateReview = (req, res) => {
  const { id, comment } = req.body;
  if (!id || !comment) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!reviewDao.findReviewById(id)) return res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewDao.updateReview(id, comment);
  res.status(200).json(resData.successTrue(resMessage.REVIEW_UPDATE_SUCCESS));
};

const removeReview = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!reviewDao.findReviewById(id)) return res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  reviewDao.removeReview(id);
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
