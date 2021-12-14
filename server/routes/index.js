const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/movies', require('./movies'));
router.use('/api/reviews', require('./reviews'));
router.use('/api/stars', require('./stars'));

module.exports = router;
