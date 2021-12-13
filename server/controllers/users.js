const userService = require('../service/users');
const resData = require('../../utils/resData');
const resMessage = require('../../utils/resMessage');

const getUsers = (req, res) => {
  res.send(userService.getUsers());
};

const signin = (req, res) => {
  const signinUser = req.body;
  const userInfo = userService.findUserByEmail(signinUser.email);
  if (!userInfo) {
    res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
  }
  if (userInfo.password !== signinUser.password) {
    res.status(400).json(resData.successFalse(resMessage.PW_MISMATCH));
  }
  res.status(200).json(resData.successTrue(resMessage.LOGIN_SUCCESS));
};

const signup = (req, res) => {
  const signupUser = req.body;
  if (Object.values(signupUser).some(info => !info) || Object.values(signupUser).length !== 3)
    res.status(400).json(resData.successFalse(resMessage.VALUE_NULL));

  if (userService.findUserByEmail(signupUser.email))
    res.status(400).json(resData.successFalse(resMessage.EMAIL_ALREADY_EXIST));

  if (userService.findUserByName(signupUser.username))
    res.status(400).json(resData.successFalse(resMessage.NAME_ALREADY_EXIST));

  userService.addUser(signupUser);
  res.status(200).json(resData.successTrue(resMessage.JOIN_SUCCESS, signupUser));
};

module.exports = {
  getUsers,
  signin,
  signup,
};
