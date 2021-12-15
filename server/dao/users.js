let userModel = require('../models/users');

const findUserByEmail = email => {
  const isUser = userModel.find(user => user.email === email);
  return isUser ?? false;
};

const findUserByName = username => {
  const isUser = userModel.find(user => user.username === username);
  return isUser ?? false;
};

const addUser = newUser => (userModel = [...userModel, newUser]);

const getUsers = () => userModel;

const addToken = (email, token) => {
  userModel = userModel.map(user => (user.email === email ? { ...user, token } : user));
};

module.exports = {
  findUserByEmail,
  findUserByName,
  addUser,
  getUsers,
  addToken,
};
