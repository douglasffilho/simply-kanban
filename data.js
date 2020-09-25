var POSITION_FACTOR = 0.01;
var DEFAULT_NEW_CARD_TEXT = 'New Card';
var DEFAULT_NEW_COLUMN_TEXT = 'New Column';
var DEFAULT_NEW_BOARD_TEXT = 'New Board';

var boardsData = [
    {
        id: 'board1',
        title: 'Personal'
    },
    {
        id: 'board2',
        title: 'Working'
    }
];

var columnsData = [
    {
        id: 'board1-column1',
        title: 'Backolog'
    },
    {
        id: 'board1-column2',
        title: 'ToDo'
    },
    {
        id: 'board2-column1',
        title: 'Backolog'
    },
    {
        id: 'board2-column2',
        title: 'ToDo'
    }
];

var columnBoardRelations = [
    {
        boardId: 'board1',
        columnId: 'board1-column1',
        position: 1
    },
    {
        boardId: 'board1',
        columnId: 'board1-column2',
        position: 2
    },
    {
        boardId: 'board2',
        columnId: 'board2-column1',
        position: 1
    },
    {
        boardId: 'board2',
        columnId: 'board2-column2',
        position: 2
    }
];

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

var cardColumnRelations = [
    {
        columnId: 'board1-column1',
        cardId: 'board1-column1-card1',
        position: 1
    },
    {
        columnId: 'board1-column1',
        cardId: 'board1-column1-card2',
        position: 2
    },
    {
        columnId: 'board1-column2',
        cardId: 'board1-column2-card1',
        position: 1
    },
    {
        columnId: 'board2-column1',
        cardId: 'board2-column1-card1',
        position: 1
    },
    {
        columnId: 'board2-column1',
        cardId: 'board2-column1-card2',
        position: 2
    },
    {
        columnId: 'board2-column2',
        cardId: 'board2-column2-card1',
        position: 1
    },
    {
        columnId: 'board2-column2',
        cardId: 'board2-column2-card2',
        position: 2
    }
];

function _createUUID() {
    var dt = new Date().getTime();
    return 'xxxxxxx-xxxyxxx-xxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

function _readData(name, repository) {
    var serializedData = localStorage.getItem(name);
    if (!serializedData) serializedData = JSON.stringify(repository, null, 0);

    return JSON.parse(serializedData);
}

function readBoardsData() {
    boardsData = _readData('boardsData', boardsData);
}

function readColumnsData() {
    columnsData = _readData('columnsData', columnsData);
}

function readCardsData() {
    cardsData = _readData('cardsData', cardsData);
}

function readColumnBoardRelations() {
    columnBoardRelations = _readData(
        'columnBoardRelations',
        columnBoardRelations
    );
}

function readCardColumnRelations() {
    cardColumnRelations = _readData('cardColumnRelations', cardColumnRelations);
}

function readAllData() {
    readBoardsData();
    readColumnsData();
    readCardsData();

    readColumnBoardRelations();
    readCardColumnRelations();
}

function _saveLocalData(name, data) {
    var serializedData = JSON.stringify(data, null, 0);
    localStorage.setItem(name, serializedData);
}

function saveBoardsData() {
    _saveLocalData('boardsData', boardsData);
}

function saveColumnsData() {
    _saveLocalData('columnsData', columnsData);
}

function saveCardsData() {
    _saveLocalData('cardsData', cardsData);
}

function saveColumnBoardRelations() {
    _saveLocalData('columnBoardRelations', columnBoardRelations);
}

function saveCardColumnRelations() {
    _saveLocalData('cardColumnRelations', cardColumnRelations);
}

function saveAllData() {
    saveBoardsData();
    saveColumnsData();
    saveCardsData();

    saveColumnBoardRelations();
    saveCardColumnRelations();
}

function _copyObject(object) {
    return JSON.parse(JSON.stringify(object, null, 0));
}

function _findBoardById(boardId) {
    return boardsData.filter((board) => board.id === boardId)[0];
}

function findBoardById(boardId) {
    return _copyObject(_findBoardById(boardId));
}

function _findColumnById(columnId) {
    return columnsData.filter((column) => column.id === columnId)[0];
}

function findColumnById(columnId) {
    return _copyObject(_findColumnById(columnId));
}

function findBoardColumnsByBoardId(boardId) {
    return _copyObject(
        columnBoardRelations
            .filter((relation) => relation.boardId === boardId)
            .sort(
                (relation1, relation2) =>
                    relation1.position - relation2.position
            )
            .map((relation) => findColumnById(relation.columnId))
    );
}

function findCardById(cardId) {
    return _copyObject(cardsData.filter((card) => card.id === cardId)[0]);
}

function _findCardColumnRelationsByColumnId(columnId) {
    return cardColumnRelations
        .filter((relation) => relation.columnId === columnId)
        .sort(
            (relation1, relation2) => relation1.position - relation2.position
        );
}

function findCardColumnRelationsByColumnId(columnId) {
    return _copyObject(_findCardColumnRelationsByColumnId(columnId));
}

function _findColumnBoardRelationsByBoardId(boardId) {
    return columnBoardRelations
        .filter((relation) => relation.boardId === boardId)
        .sort(
            (relation1, relation2) => relation1.position - relation2.position
        );
}

function findColumnBoardRelationsByBoardId(boardId) {
    return _copyObject(_findColumnBoardRelationsByBoardId(boardId));
}

function findColumnCardsByColumnId(columnId) {
    return _copyObject(
        findCardColumnRelationsByColumnId(columnId).map((relation) =>
            findCardById(relation.cardId)
        )
    );
}

function _findFirstBoardColumnRelationsByColumnId(columnId) {
    return columnBoardRelations.filter(
        (relation) => relation.columnId === columnId
    )[0];
}

function findFirstBoardColumnRelationsByColumnId(columnId) {
    return _copyObject(_findFirstBoardColumnRelationsByColumnId(columnId));
}

function _findFirstCardColumnRelationsByCardId(cardId) {
    if (!cardId)
        return cardColumnRelations.filter(
            (relation) => relation.position === 1
        )[0];
    return cardColumnRelations.filter(
        (relation) => relation.cardId === cardId
    )[0];
}

function findFirstCardColumnRelationsByCardId(cardId) {
    return _copyObject(_findFirstCardColumnRelationsByCardId(cardId));
}

function updateColumnRelationPosition(columnId, newPosition) {
    _findFirstBoardColumnRelationsByColumnId(columnId).position =
        newPosition - POSITION_FACTOR;

    saveColumnBoardRelations();
}

function updateCardRelationAndPosition(cardId, newColumn, newPosition) {
    var relation = _findFirstCardColumnRelationsByCardId(cardId);
    relation.columnId = newColumn;
    relation.position = newPosition - POSITION_FACTOR;
    saveCardColumnRelations();
}

function updateColumnPosition(fromColumn, destColumn) {
    var originRelation = findFirstBoardColumnRelationsByColumnId(fromColumn);
    var destRelation = findFirstBoardColumnRelationsByColumnId(destColumn);

    updateColumnRelationPosition(fromColumn, destRelation.position);
    updateColumnRelationPosition(destColumn, originRelation.position);
}

function updateCardColumnAndPosition(fromCard, destColumn, destCard) {
    var destRelation = findFirstCardColumnRelationsByCardId(destCard);
    updateCardRelationAndPosition(fromCard, destColumn, destRelation.position);
}

function _findCardById(cardId) {
    return cardsData.filter((card) => card.id === cardId)[0];
}

function findCardById(cardId) {
    return _copyObject(_findCardById(cardId));
}

function getCardContentByCardId(cardId) {
    return findCardById(cardId).text;
}

function getColumnTitleByColumnId(columnId) {
    return findColumnById(columnId).title;
}

function getBoardTitleByBoardId(boardId) {
    return findBoardById(boardId).title;
}

function _deleteCardColumnRelationByCardId(cardId) {
    var relation = cardColumnRelations.filter(
        (relation) => relation.cardId === cardId
    )[0];
    var relationIndex = cardColumnRelations.indexOf(relation);
    cardColumnRelations[relationIndex] = null;
    cardColumnRelations = cardColumnRelations.filter((rel) => !!rel);
}

function _deleteCardDataByCardId(cardId) {
    var data = _findCardById(cardId);
    var dataIndex = cardsData.indexOf(data);
    cardsData[dataIndex] = null;
    cardsData = cardsData.filter((rel) => !!rel);
}

function _deleteColumnBoardRelationByColumnId(columnId) {
    var relation = columnBoardRelations.filter(
        (relation) => relation.columnId === columnId
    )[0];
    var relationIndex = columnBoardRelations.indexOf(relation);
    columnBoardRelations[relationIndex] = null;
    columnBoardRelations = columnBoardRelations.filter((rel) => !!rel);
}

function _deleteColumnDataByColumnId(columnId) {
    var data = _findColumnById(columnId);
    var dataIndex = columnsData.indexOf(data);
    columnsData[dataIndex] = null;
    columnsData = columnsData.filter((rel) => !!rel);
}

function deleteCardById(cardId) {
    _deleteCardColumnRelationByCardId(cardId);
    _deleteCardDataByCardId(cardId);

    saveCardColumnRelations();
    saveCardsData();
}

function _deleteCardsByColumnId(columnId) {
    findColumnCardsByColumnId(columnId).forEach((card) =>
        deleteCardById(card.id)
    );
}

function deleteColumnById(columnId) {
    _deleteColumnBoardRelationByColumnId(columnId);
    _deleteColumnDataByColumnId(columnId);

    _deleteCardsByColumnId(columnId);

    saveAllData();
}

function updateCardTextById(cardId, text) {
    var card = _findCardById(cardId);
    card.text = text;

    saveCardsData();
}

function updateColumnTitleById(columnId, title) {
    var column = _findColumnById(columnId);
    column.title = title;

    saveColumnsData();
}

function updateBoardTitleById(boardId, title) {
    var board = _findBoardById(boardId);
    board.title = title;

    saveBoardsData();
}

function getNextCardColumnRelationsPositionByColumnId(columnId) {
    var relations = findCardColumnRelationsByColumnId(columnId);

    if (relations.length < 1) return 1;

    return relations[relations.length - 1].position + 1;
}

function getNextColumnBoardRelationsPositionByBoardId(boardId) {
    var relations = findColumnBoardRelationsByBoardId(boardId);

    if (relations.length < 1) return 1;

    return relations[relations.length - 1].position + 1;
}

function createNewCard(columnId) {
    var newCardId = `card-${_createUUID()}`;

    var newCard = {
        id: newCardId,
        text: DEFAULT_NEW_CARD_TEXT
    };

    var newCardColumnRelation = {
        columnId,
        cardId: newCardId,
        position: getNextCardColumnRelationsPositionByColumnId(columnId)
    };

    cardsData.push(newCard);
    cardColumnRelations.push(newCardColumnRelation);

    saveCardsData();
    saveCardColumnRelations();

    return newCardId;
}

function createNewColumn() {
    var newColumnId = `column-${_createUUID()}`;

    var newColumn = {
        id: newColumnId,
        title: DEFAULT_NEW_COLUMN_TEXT
    };

    var newColumnBoardRelation = {
        boardId: selectedBoard,
        columnId: newColumnId,
        position: getNextColumnBoardRelationsPositionByBoardId(selectedBoard)
    };

    columnsData.push(newColumn);
    columnBoardRelations.push(newColumnBoardRelation);

    saveColumnsData();
    saveColumnBoardRelations();
}

function createNewBoard() {
    var newBoardId = `board-${_createUUID()}`;

    var newBoard = {
        id: newBoardId,
        title: DEFAULT_NEW_BOARD_TEXT
    };

    boardsData.push(newBoard);

    saveBoardsData();

    return newBoardId;
}

readAllData();
