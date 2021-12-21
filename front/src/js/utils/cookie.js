const getCookieValue = () => {
  let cookieKey = 'x_auth=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

const delCookie = function delCookie_x_auth() {
  let date = new Date();
  date.setDate(date.getDate() - 100);
  let Cookie = `x_auth=;Expires=${date.toUTCString()}`;
  document.cookie = Cookie;
};

export { getCookieValue, delCookie };
