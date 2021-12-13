const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');

router.get('/', reviewCtrl.getReviews);
router.get('/:movieId', reviewCtrl.getReviewsByMovieId);
router.get('/:movieId/:userEmail', reviewCtrl.getReviewByMovieIdUserEmail);
router.post('/', reviewCtrl.addReview);
router.patch('/', reviewCtrl.updateReview);
router.delete('/', reviewCtrl.removeReview);

module.exports = router;
