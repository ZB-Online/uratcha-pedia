const userService = require('../service/users');

const getUsers = (req, res) => {
  res.send(userService.getUsers());
};

const signin = (req, res) => {
  const signinUser = req.body;
  const userInfo = userService.findUserByEmail(signinUser.email);
  if (!userInfo) {
    res.status(400).send('잘못된 이메일');
  }
  if (userInfo.password !== signinUser.password) {
    res.status(400).send('잘못된 비밀번호');
  }
  res.send(userInfo);
};

const signup = (req, res) => {
  const signupUser = req.body;
  if (Object.values(signupUser).some(info => !info) || Object.values(signupUser).length !== 3)
    res.status(400).send('잘못된 payload');

  if (userService.findUserByEmail(signupUser.email)) res.status(400).send('이미 존재하는 아이디');

  if (userService.findUserByName(signupUser.username)) res.status(400).send('이미 존재하는 닉네임');

  userService.addUser(signupUser);
  res.status(200).send(signupUser);
};

module.exports = {
  getUsers,
  signin,
  signup,
};
