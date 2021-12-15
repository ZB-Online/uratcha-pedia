const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const { auth } = require('../middleware/auth');

router.get('/all', userCtrl.getUsers);
router.post('/signin', userCtrl.signin);
router.post('/signup', userCtrl.signup);
router.get('/auth', auth, userCtrl.auth);
router.get('/logout', auth, userCtrl.logout);

module.exports = router;
