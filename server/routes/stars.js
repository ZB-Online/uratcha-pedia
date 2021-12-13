const express = require('express');
const router = express.Router();
const starCtrl = require('../controllers/stars');

router.get('/index', starCtrl.getStars);
router.get('/', starCtrl.getStarsCount);
router.get('/:movieId', starCtrl.getAverageStarByMovieId);
router.post('/', starCtrl.addStar);
router.patch('/', starCtrl.updateStar);
router.delete('/', starCtrl.removeStar);
router.get('/movies/users/:movieId/:userEmail', starCtrl.getStarByMovieIdUserEmail);
router.get('/users/:userEmail', starCtrl.getStarsByUserEmail);

module.exports = router;
