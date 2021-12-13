const express = require('express');
const router = express.Router();
const starCtrl = require('../controllers/stars');

router.get('/', starCtrl.getStars);

module.exports = router;
