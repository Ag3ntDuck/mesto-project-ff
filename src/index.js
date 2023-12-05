import "./pages/index.css";

import { initialCards } from "./initialCards";
import { createCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

//лайк
function likeAdd(evt) {
  const target = evt.target;
  target.classList.toggle("card__like-button_is-active");
}

//удаление карточке по кнопке
function deleteButton(evt) {
  const cardElement = evt.target.parentElement;
  cardElement.remove();
}

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

//закрытие попапа картинки по кнопке
imagePopupClose.addEventListener("click", () => {
  closeModal(imagePopup);
});

//закрытие попапа картинки по оверлею
imagePopup.addEventListener("click", (evt) => {
  if (evt.target === imagePopup) {
    closeModal(imagePopup);
  }
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

//код работы добавляения в профиль

//тык оверлея
const popupEditProfile = document.querySelector(".popup_type_edit");
popupEditProfile.addEventListener("click", (evt) => {
  if (evt.target === popupEditProfile) {
    closeModal(popupEditProfile);
  }
});

//открытие по кнопке
const profileEdit = document.querySelector(".profile__edit-button");
profileEdit.addEventListener("click", () => {
  openModal(popupEditProfile);
});

//закрытие по крестику
const profileClose = popupEditProfile.querySelector(".popup__close");
profileClose.addEventListener("click", () => {
  closeModal(popupEditProfile);
});

//код добавления карточки

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
popupAddCardClose.addEventListener("click", (evt) => {
  closeModal(popupAddCard);
});

//тык оверлея
popupAddCard.addEventListener("click", (evt) => {
  if (evt.target === popupAddCard) {
    closeModal(popupAddCard);
  }
});

//сабмит для попапа картинки
popupAddCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(popupAddCard);
  const name = popupAddCardNameInput.value;
  const url = popupAddCardUrlInput.value;
  placesList.prepend(
    createCard(cardTemplate, name, url, deleteButton, likeAdd, zoomImage)
  );
});

const popupEditForm = popupEditProfile.querySelector(".popup__form");
const profileTitleInput = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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
      deleteButton,
      likeAdd,
      zoomImage
    )
  );
});
