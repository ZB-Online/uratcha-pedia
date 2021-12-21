const useDao = require('../dao/users');
const resData = require('../utils/resData');
const resMessage = require('../utils/resMessage');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    // console.log("token",token)
    if (!token) return res.status(200).json(resData.successTrue(resMessage.AUTH_FAIL, { isAuth: false }));
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!useDao.findToken(decoded, token))
      return res.status(200).json(resData.successTrue(resMessage.AUTH_FAIL, { isAuth: false }));
    const user = useDao.findUserByEmail(decoded);
    req.user = user;
    req.token = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json(resData.successFalse(resMessage.AUTH_FAIL));
  }
};

module.exports = { auth };
