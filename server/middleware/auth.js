const useDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
  // TODO: client 와 test 해보기
  // const token = req.cookies.x_auth
  const token = req.headers.authorization.split('Bearer ')[1];
  try {
    const decoded = jwt.verify(token, 'secretToken');
    const user = useDao.findUserByEmail(decoded);
    if (!user) return res.status(400).json(resData.successFalse(resMessage.EMAIL_NOT_EXIST));
    req.user = user;
    req.token = decoded;
  } catch (error) {
    return res.status(400).json(resData.successFalse(resMessage.AUTH_FAIL));
  }
  next();
};

module.exports = { auth };
