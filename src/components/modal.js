//закрытие по Esc
export function closeOnEscape(e) {
  if (e.key !== "Escape") {
    return;
  }
  closePopup(document.querySelector(".popup_is-opened"));
}

function closeOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

//закрытие функция
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", closeOnEscape);
  popup.addEventListener("click", closeOnOverlayClick);
}

//открытие функция
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeOnOverlayClick);
  window.removeEventListener("keydown", closeOnEscape);
}