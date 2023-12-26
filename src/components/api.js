export const putCardLike = (config, id) => {
  return fetch(`${config.baseUrl}/${config.cohort}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(verifyResponse);
};

const verifyResponse = (r) => {
  if (r.ok) {
    return r.json();
  }
  return Promise.reject(`Ошибка: ${r.status}`);
};

export const getProfile = (config) => {
  return fetch(`${config.baseUrl}/${config.cohort}/users/me`, {
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(verifyResponse);
};

export const deleteCard = (config, id) => {
  return fetch(`${config.baseUrl}/${config.cohort}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(verifyResponse);
};

export const deleteCardLike = (config, id) => {
  return fetch(`${config.baseUrl}/${config.cohort}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(verifyResponse);
};

export const getCards = (config) => {
  return fetch(`${config.baseUrl}/${config.cohort}/cards`, {
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(verifyResponse);
};

export const patchProfile = (config, name, about) => {
  return fetch(`${config.baseUrl}/${config.cohort}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(verifyResponse);
};

export const postCard = (config, name, link) => {
  return fetch(`${config.baseUrl}/${config.cohort}/cards`, {
    method: "POST",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(verifyResponse);
};

export const patchAvatar = (config, avatar) => {
  return fetch(`${config.baseUrl}/${config.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(verifyResponse);
};
