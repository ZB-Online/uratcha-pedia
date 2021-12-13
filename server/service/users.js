let userModel = require('../models/users');

const findUserByEmail = email => {
  const [isUser] = userModel.filter(user => user.email === email);
  return isUser ? isUser : false;
};

const findUserByName = username => {
  const [isUser] = userModel.filter(user => user.username === username);
  return isUser ? isUser : false;
};

const addUser = newUser => (userModel = [...userModel, newUser]);

const getUsers = () => userModel;

module.exports = {
  findUserByEmail,
  findUserByName,
  addUser,
  getUsers,
};
