const setCookieValue = (token) => {
  return localStorage.setItem('accessToken',token);
};

const getCookieValue = () => {
  return localStorage.getItem('accessToken');
};

const delCookie = () => {
  return localStorage.removeItem('accessToken');
};

export { getCookieValue, delCookie, setCookieValue };
