import fetch from '../utils/fetch.js';

const isAuth = async () => {
  try {
    const { resData } = await fetch.get('/api/users/auth');
    return resData;
  } catch (err) {
    console.error(err);
  }
};

export default isAuth;
