import fetch from '../utils/fetch';

const isAuth = async () => {
  try {
    const { resData } = await fetch.get('/api/users/auth');
    return resData;
  } catch (err) {
    console.error(err);
  }
};

const postSignin = async (email, password) => {
  try {
    const response = await fetch.post('/api/users/signin', {
      email,
      password,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const postSignup = async (email, password, username) => {
  try {
    const response = await fetch.post('/api/users/signup', {
      email,
      password,
      username,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const postUserLogout = () => {
  try {
    fetch.get('/api/users/logout');
  } catch (err) {
    console.error(err);
  }
};

export default {
  isAuth,
  postSignin,
  postSignup,
  postUserLogout,
};
