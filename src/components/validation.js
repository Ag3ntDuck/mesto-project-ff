export const clearValidation = (config, form) => {
  disableButton(config, form);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.value = "";
    hideInputError(config, form, input);
  });
};

const hideInputError = (config, form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const showInputError = (config, form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

export const disableButton = (config, form) => {
  const button = form.querySelector(config.submitButtonSelector);
  button.setAttribute("disabled", "");
};

export const enableButton = (config, form) => {
  const button = form.querySelector(config.submitButtonSelector);
  button.removeAttribute("disabled", "");
};

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
    input.addEventListener("input", () => {
      popupInputValidity(config, form, input);
    });
  });
};

export const ennableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    popupEventListener(config, form);
  });
};
