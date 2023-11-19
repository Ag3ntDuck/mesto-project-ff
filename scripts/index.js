// @todo: Темплейт карточки +

// @todo: DOM узлы +

// @todo: Функция создания карточки +

// @todo: Функция удаления карточки +

// @todo: Вывести карточки на страницу +

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const clickButton = document.querySelector(".profile__add-button");

const createCard = function (title, imageUrl, deletebuttonCallback) {
  const cardElement = cardTemplate.cloneNode(true).children[0];
  const image = cardElement.querySelector(".card__image");
  image.src = imageUrl;
  image.alt = title;
  const titleElement = cardElement.querySelector(".card__title");
  titleElement.innerText = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deletebuttonCallback);
  return cardElement;
};

const deleteButton = function (event) {
  const cardElement = event.target.parentElement;
  cardElement.remove();
};

initialCards.forEach(function (card) {
  placesList.appendChild(createCard(card.name, card.link, deleteButton));
});
