//закрытие по Esc
export function closeOnEscape(e) {
  if (e.key !== "Escape") {
    return;
  }
  closePopup(document.querySelector(".popup_is-opened"));
}

//закрытие функция
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", closeOnEscape);
}

//открытие функция
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", closeOnEscape);
}
