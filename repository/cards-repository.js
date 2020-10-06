var DEFAULT_NEW_CARD_TEXT = 'New Card';

var cardsData = [
    {
        id: 'board1-column1-card1',
        text:
            'This is a card, you can type anything inside by clicking over text'
    },
    {
        id: 'board1-column1-card2',
        text:
            'You can move cards from down to up just by holding mouse left click over card to drag and dropping over card above'
    },
    {
        id: 'board1-column2-card1',
        text: 'You can move cards between columns'
    },
    {
        id: 'board2-column1-card1',
        text: 'This cards can only be manageable from this board'
    },
    {
        id: 'board2-column1-card2',
        text: 'You can create new cards by clicking over column outside a card'
    },
    {
        id: 'board2-column2-card1',
        text:
            'You can create other columns by clicking the plus sign on right top of last board'
    },
    {
        id: 'board2-column2-card2',
        text: 'You can move columns like cards'
    }
];

function saveCard(newCard) {
    var { newRepo, newItem } = _save(cardsData, newCard, true);

    cardsData = newRepo;

    _persistData('cardsData', cardsData);

    return newItem;
}

function findCardById(cardId) {
    return _findById(cardsData, cardId);
}

function deleteCardById(cardId) {
    cardsData = _deleteById(cardsData, cardId);

    _persistData('cardsData', cardsData);

    return cardsData;
}

function updateCardById(cardId, updateFieldName, updateFieldValue) {
    cardsData = _updateById(
        cardsData,
        cardId,
        updateFieldName,
        updateFieldValue
    );

    _persistData('cardsData', cardsData);

    return cardsData;
}

function restoreCardsData(data) {
    _persistData('cardsData', data);
    cardsData = _readPersistedData('cardsData', cardsData);
}

function getAllCardsData() {
    return _readPersistedData('cardsData', cardsData);
}
