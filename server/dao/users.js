let userModel = require('../models/users');

const findUserByEmail = email => {
  const isUser = userModel.find(user => user.email === email);
  return isUser ?? false;
};

const findUserByName = username => {
  const isUser = userModel.find(user => user.username === username);
  return isUser ?? false;
};

const addUser = newUser => (userModel = [...userModel, {...newUser, token: null}]);

const getUsers = () => userModel;

const findToken = (email, token) => userModel.find(user => user.email === email && user.token === token);

const addToken = (email, token) => {
  userModel = userModel.map(user => (user.email === email ? { ...user, token } : user));
};

const removeToken = email => {
  userModel = userModel.map(user => (user.email === email ? { ...user, token: null } : user));
};

module.exports = {
  findUserByEmail,
  findUserByName,
  addUser,
  getUsers,
  findToken,
  addToken,
  removeToken,
};
