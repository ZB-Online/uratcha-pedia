// import fetch from "node-fetch"
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movies');

router.get('/', movieCtrl.getBoxoffices);
router.get('/:movieId', movieCtrl.getMovieDetailById);
router.get('/search/:keyword', movieCtrl.getSearchMovies);

module.exports = router;
