const express = require('express');
const router = express.Router();
const starCtrl = require('../controllers/stars');

router.get('/all', starCtrl.getStars);
router.get('/', starCtrl.getStarsCount);
router.get('/:movieId', starCtrl.getAverageStarByMovieId);
router.post('/', starCtrl.addStar);
router.patch('/', starCtrl.updateStar);
router.delete('/:id', starCtrl.removeStar);
router.get('/movies/:movieId/users/:userEmail', starCtrl.getStarByMovieIdUserEmail);
router.get('/users/:userEmail', starCtrl.getStarsByUserEmail);

module.exports = router;
