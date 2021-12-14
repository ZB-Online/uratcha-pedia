const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');

router.get('/', reviewCtrl.getReviews);
router.get('/:movieId', reviewCtrl.getReviewsByMovieId);
//TODO : FIX TO QUERY STRING
router.get('/:movieId/:userEmail', reviewCtrl.getReviewByMovieIdUserEmail);
router.post('/', reviewCtrl.addReview);
router.patch('/', reviewCtrl.updateReview);
router.delete('/:id', reviewCtrl.removeReview);

module.exports = router;
