const userDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = (req, res) => {
  res.send(userDao.getUsers());
};

const signin = async (req, res) => {
  const signinUser = req.body;
  if (Object.values(signinUser).some(info => !info) || Object.values(signinUser).length !== 2)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));
  const userInfo = userDao.findUserByEmail(signinUser.email);
  if (!userInfo) {
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  }

  const passwordMatch = await bcrypt.compare(signinUser.password, userInfo.password);
  if (!passwordMatch) {
    return res.status(400).json(resData.successFalse(resMessage.PW_MISMATCH));
  }
  const token = generateToken(signinUser.email);
  // TODO: client에서 확인하면 resData 지우기
  res.cookie('x_auth').status(200).json(resData.successTrue(resMessage.SIGNIN_SUCCESS, token));
};

const signup = async (req, res) => {
  const signupUser = req.body;
  if (Object.values(signupUser).some(info => !info) || Object.values(signupUser).length !== 3)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));

  if (userDao.findUserByEmail(signupUser.email))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_ALREADY_EXIST));

  if (userDao.findUserByName(signupUser.username))
    return res.status(400).json(resData.successFalse(resMessage.USERNAME_ALREADY_EXIST));

  try {
    signupUser.password = await hashPassword(signupUser.password);
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.INTERNAL_SERVER_ERROR));
  }

  userDao.addUser(signupUser);
  res.status(200).json(resData.successTrue(resMessage.SIGNUP_SUCCESS));
};

const generateToken = email => {
  const token = jwt.sign(email, process.env.JWT_ACCESS_SECRET);
  userDao.addToken(email, token);
  return token;
};

const auth = (req, res) => {
  res
    .status(200)
    .json(resData.successTrue(resMessage.AUTH_SUCCESS, { email: req.user.email, username: req.user.username }));
};

const logout = (req, res) => {
  userDao.removeToken(req.user.email);
  res.status(200).json(resData.successTrue(resMessage.LOGOUT_SUCCESS));
};

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) reject(error);
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) reject(error);
        resolve(hash);
      });
    });
  });
};

module.exports = {
  getUsers,
  signin,
  signup,
  generateToken,
  auth,
  logout,
};
