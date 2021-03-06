const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movies');

router.get('/all', movieCtrl.getMovies);
router.get('/', movieCtrl.getBoxoffices);
router.get('/:movieId', movieCtrl.getMovieDetailById);
router.get('/search/:keyword', movieCtrl.getSearchMovies);
router.get('/stars/rank', movieCtrl.getStarRankMovies);
router.get('/genre/:genre', movieCtrl.getSimilarWorks);
router.get('/users/:userEmail', movieCtrl.getMyScoredMovies);

module.exports = router;
