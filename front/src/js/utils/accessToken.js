const setAccessToken = token => localStorage.setItem('accessToken', token);

const getAccessToken = () => localStorage.getItem('accessToken');

const delAccessToken = () => localStorage.removeItem('accessToken');

export { getAccessToken, delAccessToken, setAccessToken };
