export function createCard(
  cardTemplate,
  title,
  imageUrl,
  deletebuttonCallback,
  likeAddCallback,
  zoomImageCallback
) {
  const cardElement = cardTemplate.cloneNode(true).children[0];
  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  image.src = imageUrl;
  image.alt = title;
  const titleElement = cardElement.querySelector(".card__title");
  titleElement.innerText = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deletebuttonCallback);
  like.addEventListener("click", likeAddCallback);
  image.addEventListener("click", zoomImageCallback);
  return cardElement;
}

//лайк
export function likeClickCallback(evt) {
  const target = evt.target;
  target.classList.toggle("card__like-button_is-active");
}

//удаление карточке по кнопке
export function deleteCardCallback(evt) {
  const cardElement = evt.target.parentElement;
  cardElement.remove();
}