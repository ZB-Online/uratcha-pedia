import { getAccessToken } from '../utils/accessToken';
import fetch from '../utils/fetch.js';

const isAuth = async () => {
  try {
    const token = getAccessToken();
    const { resData } = await fetch.authGet('/api/users/auth', token);
    return resData;
  } catch (err) {
    console.error(err);
  }
};

export default isAuth;
