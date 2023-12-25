export const putCardLike = (config, id, putCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: config.authorizationHeader,
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => putCallback(r))
    .catch((err) => {
      console.log(err);
    });
};

export const getProfile = (config, profileCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/users/me`, {
    headers: {
      authorization: config.authorizationHeader,
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => profileCallback(r))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (config, id, deleteCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationHeader,
    },
  }).then(() => deleteCallback());
};

export const deleteCardLike = (config, id, deleteCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.authorizationHeader,
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => deleteCallback(r))
    .catch((err) => {
      console.log(err);
    });
};

export const getCards = (config, cardsCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/cards`, {
    headers: {
      authorization: config.authorizationHeader,
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => cardsCallback(r))
    .catch((err) => {
      console.log(err);
    });
};

export const patchProfile = (config, name, about, patchCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => patchCallback(r))
    .catch((err) => {
      console.log(err);
    });
};

export const postCard = (config, name, link, postCallbacK) => {
  fetch(`${config.baseUrl}/${config.cohort}/cards`, {
    method: "POST",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => postCallbacK(r))
    .catch((err) => {
      console.log(err);
    });
};

export const patchAvatar = (config, avatar, patchCallback) => {
  fetch(`${config.baseUrl}/${config.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.authorizationHeader,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(`Ошибка: ${r.status}`);
    })
    .then((r) => patchCallback(r))
    .catch((err) => {
      console.log(err);
    });
};
