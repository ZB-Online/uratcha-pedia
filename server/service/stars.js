let starModel = require('../models/stars');

const getStars = () => {
  return starModel;
};

const getStarsCount = () => {
  return starModel.length;
};

const findStarById = id => {
  return starModel.some(star => star.id === +id);
};

const getAverageStarByMovieId = movieId => {
  const averageStar = starModel
    .filter(star => star.movieId === +movieId)
    .reduce((acc, cur, i, { length }) => (i === length - 1 ? (acc + cur.score) / length : acc + cur.score), 0);
  return averageStar;
};

const addStar = newStar => {
  starModel = [...starModel, newStar];
};

const updateStar = (id, score) => {
  starModel = starModel.map(star => (star.id === +id ? { ...star, score } : star));
};

const removeStar = id => {
  starModel = starModel.filter(star => star.id !== +id);
};

const getStarByMovieIdUserEmail = (movieId, userEmail) => {
  const [isStar] = starModel.filter(star => star.movieId === +movieId && star.userEmail === userEmail);
  return isStar ? isStar.score : false;
};

const getStarsByUserEmail = userEmail => {
  return starModel.filter(star => star.userEmail === userEmail);
};

module.exports = {
  getStars,
  getStarsCount,
  findStarById,
  getAverageStarByMovieId,
  addStar,
  updateStar,
  removeStar,
  getStarByMovieIdUserEmail,
  getStarsByUserEmail
};
