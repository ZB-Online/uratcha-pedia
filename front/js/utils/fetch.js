const parseToJSON = res => {
  if (!res.ok) {
    // throw new Error(res.status);
  }
  return res.json();
};

export default {
  get(url) {
    return fetch(url).then(parseToJSON);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(parseToJSON);
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(parseToJSON);
  },
  delete(url) {
    return fetch(url, { method: 'DELETE' }).then(parseToJSON);
  },
};