const starDao = require('../dao/stars');
const userDao = require('../dao/users');
const movieDao = require('../dao/movies');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

const getStars = (req, res) => {
  res.send(starDao.getStars());
};

const getStarsCount = (req, res) => {
  const starCount = starDao.getStarsCount();
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, { starCount }));
};

const getAverageStarByMovieId = (req, res) => {
  const { movieId } = req.params;
  if (!movieId) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  // TODO : movieId validation
  const averageStar = starDao.getAverageStarByMovieId(movieId);
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, { averageStar }));
};

const addStar = (req, res) => {
  const newStar = req.body;
  const movieId = newStar.movieId;
  if (Object.values(newStar).some(info => !info) || Object.values(newStar).length !== 4)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (starDao.findStarById(newStar.id)) return res.status(400).json(resData.successFalse(resMessage.ID_ALREADY_EXIST));
  if (!userDao.findUserByEmail(newStar.userEmail))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  // TODO : movieId validation
  if (starDao.getStarByMovieIdUserEmail(newStar.movieId, newStar.userEmail))
    return res.status(400).json(resData.successFalse(resMessage.STAR_ALREADY_EXIST));
  starDao.addStar(newStar);
  movieDao.findMovieByMovieId(movieId)
    ? movieDao.updateMovie(movieId, starDao.getAverageStarByMovieId(movieId))
    : movieDao.addMovie({ movieId, average: newStar.score });

  res.status(200).json(resData.successTrue(resMessage.STAR_CREATE_SUCCESS));
};

const updateStar = (req, res) => {
  const { id, movieId, score } = req.body;
  if (!id || !score) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!starDao.findStarById(id)) return res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  starDao.updateStar(id, score);
  movieDao.updateMovie(movieId, starDao.getAverageStarByMovieId(movieId));
  res.status(200).json(resData.successTrue(resMessage.STAR_UPDATE_SUCCESS));
};

const removeStar = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!starDao.findStarById(id)) return res.status(400).json(resData.successFalse(resMessage.ID_NOT_EXIST));
  const movieId = starDao.getMovieIdById(id);
  starDao.removeStar(id);
  movieDao.updateMovie(movieId, starDao.getAverageStarByMovieId({ movieId }));
  res.status(200).json(resData.successTrue(resMessage.STAR_DELETE_SUCCESS));
};

const getStarByMovieIdUserEmail = (req, res) => {
  const { movieId, userEmail } = req.params;
  if (!movieId || !userEmail) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!userDao.findUserByEmail(userEmail))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  const star = starDao.getStarByMovieIdUserEmail(movieId, userEmail);
  res.status(200).json(resData.successTrue(resMessage.STAR_GET_SUCCESS, { star }));
};

const getStarsByUserEmail = (req, res) => {
  const { userEmail } = req.params;
  if (!userEmail) return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  if (!userDao.findUserByEmail(userEmail))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  const stars = starDao.getStarsByUserEmail(userEmail);
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
