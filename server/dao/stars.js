let starModel = require('../models/stars');

const getStars = () => starModel;

const getStarsCount = () => starModel.length;

const findStarById = id => starModel.some(star => star.id === +id);

const getAverageStarByMovieId = movieId =>
  starModel
    .filter(star => star.movieId === +movieId)
    .reduce((acc, cur, i, { length }) => (i === length - 1 ? (acc + cur.score) / length : acc + cur.score), 0).toFixed(2);

const addStar = newStar => (starModel = [...starModel, newStar]);

const updateStar = (id, score) => (starModel = starModel.map(star => (star.id === +id ? { ...star, score } : star)));

const removeStar = id => {(starModel = starModel.filter(star => star.id !== +id));}

const getStarByMovieIdUserEmail = (movieId, userEmail) => {
  const isStar = starModel.find(star => star.movieId === +movieId && star.userEmail === userEmail);
  return isStar ?? false;
};

const getStarsByUserEmail = userEmail => starModel.filter(star => star.userEmail === userEmail);

const getMovieIdById = id => starModel.find(star => star.id === +id).movieId;

module.exports = {
  getStars,
  getStarsCount,
  findStarById,
  getAverageStarByMovieId,
  addStar,
  updateStar,
  removeStar,
  getStarByMovieIdUserEmail,
  getStarsByUserEmail,
  getMovieIdById
};
