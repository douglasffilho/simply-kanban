var DEFAULT_NEW_CARD_TEXT = 'New Card';

function updateCardColumnAndPosition(originCardId, destColumnId, destCardId) {
    var destColumnCardRelation = findColumnCardRelationsByCardId(destCardId)[0];

    var newPosition = destColumnCardRelation
        ? destColumnCardRelation.position
        : 1;
    newPosition += POSITION_FACTOR;

    updateColumnCardRelationsByCardId(originCardId, 'columnId', destColumnId);
    updateColumnCardRelationsByCardId(originCardId, 'position', newPosition);
}

function updateCardTextById(cardId, text) {
    updateCardById(cardId, 'text', text);
}

function deleteCardByCardId(cardId) {
    deleteCardById(cardId);
    deleteColumnCardRelationsByCardId(cardId);
}

function createNewCardOnColumn(columnId) {
    var newCard = {
        text: DEFAULT_NEW_CARD_TEXT
    };

    var createdCard = saveCard(newCard);
    var cardId = createdCard.id;

    var newColumnCardRelation = {
        columnId,
        cardId
    };

    saveColumnCardRelation(newColumnCardRelation);

    return cardId;
}
