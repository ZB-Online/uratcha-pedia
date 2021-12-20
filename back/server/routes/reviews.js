const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');

router.get('/all', reviewCtrl.getReviews);
router.get('/:movieId', reviewCtrl.getReviewsByMovieId);
router.get('/movies/:movieId/users/:userEmail', reviewCtrl.getReviewByMovieIdUserEmail);
router.post('/', reviewCtrl.addReview);
router.patch('/', reviewCtrl.updateReview);
router.delete('/:id', reviewCtrl.removeReview);

module.exports = router;
