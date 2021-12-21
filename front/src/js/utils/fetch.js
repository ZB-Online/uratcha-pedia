const get = async url => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const authGet = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const post = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const patch = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const remove = async url => {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export default {
  get,
  authGet,
  post,
  patch,
  delete: remove,
};
