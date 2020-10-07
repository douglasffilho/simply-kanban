function _appendAddCardButtonsClickEvent() {
    var addCardButtons = document.querySelectorAll('.add-card');
    addCardButtons.forEach(function (addCardButton) {
        var { columnId } = addCardButton.dataset;
        addCardButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            addCard(columnId);
        });
    });
}

function _appendCardsEvents() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        var { id } = card;

        card.addEventListener('dragstart', drag);
        card.addEventListener('dragover', allowDrop);
        card.addEventListener('drop', drop);
        Array.from(card.children).forEach(function (child) {
            if (child.className === 'card-delete') {
                child.addEventListener('click', function () {
                    deleteCard(id);
                });
            } else if (child.className === 'editable') {
                child.addEventListener('focusin', selectText);
                child.addEventListener('focusout', function (event) {
                    cardEdit(event, id);
                });
            }
        });
    });
}

function appendCardEvents() {
    _appendAddCardButtonsClickEvent();
    _appendCardsEvents();
}
