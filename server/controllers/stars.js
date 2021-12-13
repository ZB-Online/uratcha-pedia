const starService = require('../service/stars');
const userService = require('../service/users');
const resData = require('../../utils/resData');
const resMessage = require('../../utils/resMessage');

const getStars = (req, res) => {
  res.send(starService.getStars());
};

const getStarsCount = (req, res) => {
  const starCount = starService.getStarsCount();
  res.status(200).json(resData.successTrue(resMessage.STARS_GET_SUCCESS, { starCount }));
};

const getAverageStarByMovieId = (req, res) => {
  const { movieId } = req.params;
  // TODO : movieId validation
  const averageStar = starService.getAverageStarByMovieId(movieId);
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, { averageStar }));
};

const addStar = (req, res) => {
  const newStar = req.body;
  // TODO : starId validation
  if (!userService.findUserByEmail(newStar.userEmail))
    res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  // TODO : movieId validation
  // TODO : movieId-email당 1개
  starService.addStar(newStar);
  res.status(200).json(resData.successTrue(resMessage.STAR_CREATE_SUCCESS));
};

const updateStar = (req, res) => {
  const { id, score } = req.body;
  if (!starService.findStarById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  starService.updateStar(id, score);
  res.status(200).json(resData.successTrue(resMessage.STAR_UPDATE_SUCCESS));
};

const removeStar = (req, res) => {
  const { id } = req.body;
  if (!starService.findStarById(id)) res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  starService.removeStar(id);
  res.status(200).json(resData.successTrue(resMessage.STAR_DELETE_SUCCESS));
};

const getStarByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  const star = starService.getStarByMovieIdUserEmail(movieId, userEmail);
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, { star }));
};

const getStarsByUserEmail = (req, res) => {
  const { userEmail } = req.params;
  const stars = starService.getStarsByUserEmail(userEmail);
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, stars));
};

module.exports = {
  getStars,
  getStarsCount,
  getAverageStarByMovieId,
  addStar,
  updateStar,
  removeStar,
  getStarByMovieIdUserEmail,
  getStarsByUserEmail,
};
