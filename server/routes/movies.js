// import fetch from "node-fetch"
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movies');

router.get('/', async (req, res) => {
  const data = await movieCtrl.getPopularMovies();
  const data2 = await movieCtrl.getMoviesWithCountry(data);
  res.send(data2);
});

router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const data = await movieCtrl.getMoviesDetailsById(movieId);
  res.send(data);
});

router.get('/search/:keyword', async (req, res) => {
  const { keyword } = req.params;
  const data = await movieCtrl.searchMoviesById(keyword);
  res.send(data);
});

module.exports = router;
