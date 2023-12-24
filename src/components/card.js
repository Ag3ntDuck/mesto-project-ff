export function createCard(
  cardTemplate,
  id,
  title,
  imageUrl,
  likesCount,
  isLiked,
  deletebuttonCallback,
  likeAddCallback,
  zoomImageCallback
) {
  const cardElement = cardTemplate.cloneNode(true).children[0];
  cardElement.dataset.id = id;
  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");
  image.src = imageUrl;
  image.alt = title;
  const titleElement = cardElement.querySelector(".card__title");
  titleElement.innerText = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  likeCount.textContent = likesCount;
  if (deletebuttonCallback) {
    deleteButton.addEventListener("click", deletebuttonCallback);
  } else {
    deleteButton.remove();
  }
  if (isLiked) {
    like.classList.add('card__like-button_is-active')
  }
  like.addEventListener("click", likeAddCallback);
  image.addEventListener("click", zoomImageCallback);
  return cardElement;
}

//удаление карточке по кнопке
export function clientDeleteCard(evt) {
  const cardElement = evt.target.parentElement;
  cardElement.remove();
}