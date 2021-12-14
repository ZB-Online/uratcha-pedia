// import fetch from "node-fetch"
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movies');

router.get('/', async(req, res) => {
  const data = await movieCtrl.getPopularMovies()
  console.log(data)
  res.send('hello movies');
});

module.exports = router;
