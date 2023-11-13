// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const userTemplate = document.querySelector('#card-template').content;
const usersOnline = document.querySelector('.places__list');
const clickButton = document.querySelector('.profile__add-button');




/*clickButton.addEventListener('click', function (event) {
    console.log(123);
    const userElement = document.querySelector('#card-template').content;
    const usersOnline = document.querySelector('.card');
    return usersOnline.append(usersOnline);

}); */




const addCard = function (title, imageUrl) {
    const userElement = userTemplate.cloneNode(true).querySelector('div');
    const image = userElement.querySelector('.card__image');
   image.src = imageUrl;
    const titleElement = userElement.querySelector('.card__title');
    titleElement.innerText = title;
    const deleteButton = userElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(event) {
        userElement.remove();
    });
   usersOnline.appendChild(userElement);
   

}


initialCards.forEach(function (card) {
   return addCard(card.name, card.link);
    
}); 

clickButton.addEventListener('click', addCard);

const deleteButton = function() {
    const userElement = userTemplate.cloneNode(true);
    const deleteButton = document.querySelector('.card__delete-button');
    const deleteCard = deleteButton.closest('.card');
    deleteCard.remove();
};
    
