const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');

router.get('/', reviewCtrl.getReviews);
router.get('/:movieId', reviewCtrl.getReviewsByMovieId)

module.exports = router;
