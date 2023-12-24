import "./pages/index.css";

import { initialCards } from "./initialCards";
import {
  createCard,
  clientDeleteCard,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

//закрытие попапа картинки по кнопке
imagePopupClose.addEventListener("click", () => {
  closeModal(imagePopup);
});

//открытие попапа картинки
function zoomImage(evt) {
  const target = evt.target;
  const imageSrc = target.src;
  const imageAlt = target.alt;
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  openModal(imagePopup);
}

//тык оверлея
const popupEditProfile = document.querySelector(".popup_type_edit");

const profileTitleInput = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileInfoBlock = document.querySelector(".profile__info");

const setProfileId = (id) => {
  profileInfoBlock.dataset.id = id;
};

const getProfileId = (id) => {
  return profileInfoBlock.dataset.id;
};

//открытие по кнопке 
//сюда

const getProfile = (config, profileCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/users/me`, {
    headers: {
      authorization: config.authorizationHeader
    }
  })
  .then(r => r.json())
  .then(r => profileCallback(r));
};

const deleteCard = (config, id, deleteCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorizationHeader
    }
  })
    .then(() => deleteCallback());
};

function deleteCardCallback(evt) {
  const cardElement = evt.target.parentElement;
  const id = cardElement.dataset.id;
  deleteCard(apiConfig, id, () => {
    clientDeleteCard(evt);
  });
}

const deleteCardLike = (config, id, deleteCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorizationHeader
    }
  })
    .then(r => r.json())
    .then(r => deleteCallback(r));
};

const putCardLike = (config, id, putCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorizationHeader
    }
  })
    .then(r => r.json())
    .then(r => putCallback(r));
};

function likeClickCallback(evt) {
  const cardElement = evt.target.parentElement.parentElement.parentElement;
  const id = cardElement.dataset.id;
  const target = evt.target;
  if (target.classList.contains("card__like-button_is-active")) {
    deleteCardLike(apiConfig, id, (card) => {
      target.classList.remove("card__like-button_is-active");
      cardElement.querySelector('.card__like-count').textContent = card.likes.length;
    });
  } else {
    putCardLike(apiConfig, id, (card) => {
      target.classList.add("card__like-button_is-active");
      cardElement.querySelector('.card__like-count').textContent = card.likes.length;
    });
  }
}

const profileEdit = document.querySelector(".profile__edit-button");

profileEdit.addEventListener("click", () => {
  clearValidation(validationConfig, popupEditProfile);
  enableButton(validationConfig, popupEditProfile);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

//закрытие по крестику
const profileClose = popupEditProfile.querySelector(".popup__close");
profileClose.addEventListener("click", () => {
  closeModal(popupEditProfile);
});

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardButton = document.querySelector(".profile__add-button");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");
const popupAddCardNameInput = popupAddCard.querySelector(
  ".popup__input_type_card-name"
);
const popupAddCardUrlInput = popupAddCard.querySelector(
  ".popup__input_type_url"
);

//открытие по кнопке
popupAddCardButton.addEventListener("click", () => {
  clearValidation(validationConfig, popupAddCard);
  openModal(popupAddCard);
});

//закрытие по крестику
const popupAddCardClose = popupAddCard.querySelector(".popup__close");
popupAddCardClose.addEventListener("click", () => {
  closeModal(popupAddCard);
});

//сабмит для попапа картинки
popupAddCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(popupAddCard);
  const name = popupAddCardNameInput.value;
  const url = popupAddCardUrlInput.value;
  postCard(apiConfig, name, url, (card) => {
    placesList.prepend(
      createCard(
        cardTemplate,
        card._id,
        card.name,
        card.link,
        card.likes.length,
        !!card.likes.find(like => like._id === getProfileId()),
        deleteCardCallback,
        likeClickCallback,
        zoomImage
      )
    );
  });
});

const popupEditForm = popupEditProfile.querySelector(".popup__form");

popupEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newName = profileTitleInput.value;
  const newAbout = profileDescriptionInput.value;
  patchProfile(apiConfig, newName, newAbout, (profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.src = profile.avatar;
    closeModal(popupEditProfile);
  });0
});



const apiConfig = {
  authorizationHeader: '19f866a5-5150-48f0-9090-e0700a6bf9a7',
  cohort: 'wff-cohort-3'
};

const getCards = (config, cardsCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/cards`, {
    headers: {
      authorization: config.authorizationHeader
    }
  })
    .then(r => r.json())
    .then(r => cardsCallback(r));
};

getProfile(apiConfig, (profile) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.src = profile.avatar;
  setProfileId(profile._id);

  getCards(apiConfig, (cards) => {
    cards.forEach((card) => {
      placesList.appendChild(
        createCard(
          cardTemplate,
          card._id,
          card.name,
          card.link,
          card.likes.length,
          !!card.likes.find(like => like._id === getProfileId()),
          getProfileId() === card.owner._id ? deleteCardCallback : undefined,
          likeClickCallback,
          zoomImage
        )
      );
    });
  });
});

const patchProfile = (config, name, about, patchCallback) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorizationHeader,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(r => r.json())
    .then(r => patchCallback(r));
};

const postCard = (config, name, link, postCallbacK) => {
  fetch(`https://nomoreparties.co/v1/${config.cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.authorizationHeader,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(r => r.json())
  .then(r => postCallbacK(r));
};

/* to do:
Валидация формы «Редактировать профиль»:
  

*/

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const clearValidation = (config, form) => {
  disableButton(config, form);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.value = "";
    hideInputError(config, form, input);
  });
}

const hideInputError = (config, form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


const showInputError = (config, form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const disableButton = (config, form) => {
  const button = form.querySelector(config.submitButtonSelector);
  button.setAttribute("disabled", "");
}

const enableButton = (config, form) => {
  const button = form.querySelector(config.submitButtonSelector);
  button.removeAttribute("disabled", "");
}

const popupInputValidity = (config, form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(config, form, input, input.validationMessage);
    disableButton(config, form);
  } else {
    hideInputError(config, form, input);
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    let allValid = true;
    for (const input of inputList) {
      if (!input.validity.valid) {
        allValid = false;
      }
    }
    if (allValid) {
      enableButton(config, form);
    } else {
      disableButton(config, form);
    }
  }
};

const popupEventListener = (config, form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      popupInputValidity(config, form, input);
    });
  });
};

const ennableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    popupEventListener(config, form);
  });
};

ennableValidation(validationConfig);



//api

fetch('https://nomoreparties.co/v1/wff-cohort-3/users/me', {
  headers: {
    authorization: '19f866a5-5150-48f0-9090-e0700a6bf9a7'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
  
//аватарка

