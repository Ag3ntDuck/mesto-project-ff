import "./pages/index.css";

import { createCard, clientDeleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import {
  putCardLike,
  getProfile,
  deleteCard,
  deleteCardLike,
  getCards,
  patchProfile,
  postCard,
  patchAvatar,
} from "./components/api";
import { ennableValidation, clearValidation, enableButton } from "./components/validation";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const apiConfig = {
  authorizationHeader: "19f866a5-5150-48f0-9090-e0700a6bf9a7",
  cohort: "wff-cohort-3",
  baseUrl: "https://nomoreparties.co/v1"
};

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const setLoading = (button) => {
  button.innerText = "Сохранение...";
};

const setNotLoading = (button) => {
  button.innerText = "Сохранить";
};

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

function deleteCardCallback(evt) {
  const cardElement = evt.target.parentElement;
  const id = cardElement.dataset.id;
  deleteCard(apiConfig, id, () => {
    clientDeleteCard(evt);
  });
}

function likeClickCallback(evt) {
  const cardElement = evt.target.parentElement.parentElement.parentElement;
  const id = cardElement.dataset.id;
  const target = evt.target;
  if (target.classList.contains("card__like-button_is-active")) {
    deleteCardLike(apiConfig, id, (card) => {
      target.classList.remove("card__like-button_is-active");
      cardElement.querySelector(".card__like-count").textContent =
        card.likes.length;
    });
  } else {
    putCardLike(apiConfig, id, (card) => {
      target.classList.add("card__like-button_is-active");
      cardElement.querySelector(".card__like-count").textContent =
        card.likes.length;
    });
  }
}

const profileEdit = document.querySelector(".profile__edit-button");

profileEdit.addEventListener("click", () => {
  clearValidation(validationConfig, popupEditProfile);
  setNotLoading(popupEditProfile.querySelector(validationConfig.submitButtonSelector));
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
  setNotLoading(popupAddCard.querySelector(validationConfig.submitButtonSelector));
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
  setLoading(popupAddCard.querySelector(".popup__button"));
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
        !!card.likes.find((like) => like._id === getProfileId()),
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
  setLoading(popupEditForm.querySelector(".popup__button"));
  patchProfile(apiConfig, newName, newAbout, (profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    closeModal(popupEditProfile);
  });
  0;
});

getProfile(apiConfig, (profile) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.style.backgroundImage = `url(${profile.avatar})`;
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
          !!card.likes.find((like) => like._id === getProfileId()),
          getProfileId() === card.owner._id ? deleteCardCallback : undefined,
          likeClickCallback,
          zoomImage
        )
      );
    });
  });
});

ennableValidation(validationConfig);

const popupEditProfileAvatar = document.querySelector(
  ".popup_type_edit_avatar"
);
const profileAvatarEdit = document.querySelector(".profile_edit");
const avatarTitleInput = popupEditProfileAvatar.querySelector(
  ".popup__input_type_avatar"
);

profileAvatarEdit.addEventListener("click", () => {
  clearValidation(validationConfig, popupEditProfileAvatar);
  setNotLoading(popupEditProfileAvatar.querySelector(validationConfig.submitButtonSelector));
  openModal(popupEditProfileAvatar);
});

const avatarClose = popupEditProfileAvatar.querySelector(".popup__close");
avatarClose.addEventListener("click", () => {
  closeModal(popupEditProfileAvatar);
});

const popupEditFormAvatar =
  popupEditProfileAvatar.querySelector(".popup__form");

popupEditFormAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatar = avatarTitleInput.value;
  setLoading(popupEditFormAvatar.querySelector(".popup__button"));
  patchAvatar(apiConfig, avatar, (profile) => {
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    closeModal(popupEditProfileAvatar);
  });
});
