var DEFAULT_NEW_CARD_TEXT = 'New Card';

function updateCardColumnAndPosition(
    originCardId,
    destColumnId,
    destCardId,
    deliveryScreenPosition,
    destCardScreenPosition
) {
    if (originCardId == destCardId) return;

    var destColumnCardRelation = findColumnCardRelationsByCardId(destCardId)[0];

    var newPosition = destColumnCardRelation
        ? destColumnCardRelation.position
        : 1;

    if (
        destColumnCardRelation &&
        deliveryScreenPosition > destCardScreenPosition
    )
        newPosition += 1;

    var currentPosition = findColumnCardRelationsByCardId(originCardId)[0]
        .position;

    if (newPosition === currentPosition) return;

    var relations = findColumnCardRelationsByColumnId(destColumnId).sort(
        _sortByRelationPosition
    );

    if (relations.length > 0) {
        var elementAtPosition = relations.filter(function (relation) {
            return relation.position == newPosition;
        })[0];

        var index = relations.indexOf(elementAtPosition);

        if (index >= 0) {
            var relationsToUpdate = relations.splice(index);

            relationsToUpdate.forEach(function (relation) {
                updateColumnCardRelationsByCardId(
                    relation.cardId,
                    'position',
                    relation.position + 1
                );
            });
        }
    }

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
