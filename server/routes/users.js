const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.get('/all', userCtrl.getUsers);
router.post('/signin', userCtrl.signin);
router.post('/signup', userCtrl.signup);

module.exports = router;
