let starModel = require('../models/stars');

const getStars = () => {
  return starModel;
};

const getStarsCount = () => {
  return starModel.length;
};

const getAverageStarByMovieId = movieId => {
  const averageStar = starModel
    .filter(star => star.movieId === +movieId)
    .reduce((acc, cur, i, { length }) => (i === length - 1 ? (acc + cur.score) / length : acc + cur.score), 0);
  return averageStar;
};

module.exports = {
  getStars,
  getStarsCount,
  getAverageStarByMovieId,
};
