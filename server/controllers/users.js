const userDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');

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
  res.status(200).json(resData.successTrue(resMessage.LOGIN_SUCCESS));
};

const signup = (req, res) => {
  const signupUser = req.body;
  if (Object.values(signupUser).some(info => !info) || Object.values(signupUser).length !== 3)
    return res.status(400).json(resData.successFalse(resMessage.VALUE_INVALID));

  if (userDao.findUserByEmail(signupUser.email))
    return res.status(400).json(resData.successFalse(resMessage.EMAIL_ALREADY_EXIST));

  if (userDao.findUserByName(signupUser.username))
    return res.status(400).json(resData.successFalse(resMessage.NAME_ALREADY_EXIST));

  userDao.addUser(signupUser);
  res.status(200).json(resData.successTrue(resMessage.JOIN_SUCCESS, signupUser));
};

module.exports = {
  getUsers,
  signin,
  signup,
};
