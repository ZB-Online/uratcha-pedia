const starService = require('../service/stars');
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
  res.status(200).json(resData.successTrue(resMessage.STARS_GET_SUCCESS, { averageStar }));
};

module.exports = {
  getStars,
  getStarsCount,
  getAverageStarByMovieId,
};
