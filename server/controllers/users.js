const userService = require('../service/users');

const login = (req, res) => {
  const loginUser = req.body;
  const userInfo = userService.findUserByEmail(loginUser.email);
  if (!userInfo) {
    res.status(400).send('잘못된 이메일');
  }
  if(userInfo.password !== loginUser.password){
    res.status(400).send('잘못된 비밀번호');
  }
  res.send(userInfo);
};

module.exports = {
  login,
};
