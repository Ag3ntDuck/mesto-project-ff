import "./pages/index.css";

import { initialCards } from "./initialCards";
import {
  createCard,
  likeClickCallback,
  deleteCardCallback,
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

//открытие по кнопке
const profileEdit = document.querySelector(".profile__edit-button");
profileEdit.addEventListener("click", () => {
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
  placesList.prepend(
    createCard(
      cardTemplate,
      name,
      url,
      deleteCardCallback,
      likeClickCallback,
      zoomImage
    )
  );
});

const popupEditForm = popupEditProfile.querySelector(".popup__form");

popupEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(popupEditProfile);
});

initialCards.forEach((card) => {
  placesList.appendChild(
    createCard(
      cardTemplate,
      card.name,
      card.link,
      deleteCardCallback,
      likeClickCallback,
      zoomImage
    )
  );
});
