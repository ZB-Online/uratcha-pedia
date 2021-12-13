const express = require('express');
const router = express.Router();
const starCtrl = require('../controllers/stars');

router.get('/index', starCtrl.getStars);
router.get('/', starCtrl.getStarsCount);
router.get('/:movieId', starCtrl.getAverageStarByMovieId)

module.exports = router;
