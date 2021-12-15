const userDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
  res.send(userDao.getUsers());
};

const signin = (req, res) => {
  const signinUser = req.body;
  if (Object.values(signinUser).some(info => !info) || Object.values(signinUser).length !== 2)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  const userInfo = userDao.findUserByEmail(signinUser.email);
  if (!userInfo) {
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  }
  if (userInfo.password !== signinUser.password) {
    return res.status(400).json(resData.successFalse(resMessage.PW_MISMATCH));
  }
  const token = generateToken(signinUser.email);
  res.cookie('x_auth').status(200).json(resData.successTrue(resMessage.SIGNIN_SUCCESS, token));
};

const signup = (req, res) => {
  const signupUser = req.body;
  if (Object.values(signupUser).some(info => !info) || Object.values(signupUser).length !== 3)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));

  if (userDao.findUserByEmail(signupUser.email))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_ALREADY_EXIST));

  if (userDao.findUserByName(signupUser.username))
    return res.status(400).json(resData.successFalse(resMessage.USERNAME_ALREADY_EXIST));

  userDao.addUser(signupUser);
  res.status(200).json(resData.successTrue(resMessage.SIGNUP_SUCCESS, signupUser));
};

const generateToken = email => {
  const token = jwt.sign(email, 'secretToken');
  userDao.addToken(email, token);
  return token;
};

const auth = (req, res) => {
  res
    .status(200)
    .json(resData.successTrue(resMessage.AUTH_SUCCESS, { email: req.user.email, username: req.user.username }));
};

module.exports = {
  getUsers,
  signin,
  signup,
  generateToken,
  auth,
};
