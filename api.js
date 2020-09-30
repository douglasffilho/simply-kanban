var selectedBoard = undefined;

function deletionMessage(obj) {
    return `Really want to delete this ${obj}?`;
}

var COLUMN_DELETION_TEXT = deletionMessage`column`;
var CARD_DELETION_TEXT = deletionMessage`card`;
var BOARD_DELETION_TEXT = deletionMessage`board`;

var fromColumn = undefined;
var fromCard = undefined;

function _isColumn(id) {
    return id.indexOf('card') < 0;
}

function _getElementIdFromTree(event, elementClass) {
    return (
        event.path.filter(
            (element) =>
                element.classList && element.classList.contains(elementClass)
        )[0] || {}
    ).id;
}

function _getParentColumn(event) {
    return _getElementIdFromTree(event, 'board-column');
}

function _getParentCard(event) {
    return _getElementIdFromTree(event, 'card');
}

function drag(event) {
    event.stopPropagation();

    var id = event.target.id;
    if (_isColumn(id)) {
        fromColumn = id;
        fromCard = undefined;
    } else {
        fromColumn = _getParentColumn(event);
        fromCard = id;
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function moveColumn(toColumn) {
    updateColumnPosition(fromColumn, toColumn);
    renderSelectedBoard();
}

function moveCard(destColumn, destCard) {
    updateCardColumnAndPosition(fromCard, destColumn, destCard);
    renderSelectedBoard();
}

function drop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (fromColumn) {
        var toColumn = _getParentColumn(event);
        if (toColumn) {
            if (fromCard) {
                var toCard = _getParentCard(event);
                moveCard(toColumn, toCard);
            } else {
                moveColumn(toColumn);
            }
        }
    }
}

function selectText(event) {
    var element = event.target;

    var range = document.createRange();
    range.selectNodeContents(element);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function updateCard(cardId, text) {
    updateCardTextById(cardId, text);
    renderSelectedBoard();
}

function updateColumn(columnId, title) {
    updateColumnTitleById(columnId, title);
    renderSelectedBoard();
}

function updateBoard(boardId, title) {
    updateBoardTitleById(boardId, title);
    renderNavBar();
    renderSelectedBoard();
}

function cardEdit(event, cardId) {
    event.preventDefault();
    event.stopPropagation();

    var text = event.target.textContent.trim();

    if (!text) {
        var previousText = getCardContentByCardId(cardId);
        var nextContent = deleteOnEmptyOrReturnPreviousContent(
            cardId,
            previousText
        );
        event.target.textContent = nextContent;
    } else {
        updateCard(cardId, text);
    }
}

function updateColumnTitle(event, columnId) {
    event.preventDefault();
    event.stopPropagation();

    var title = event.target.textContent.trim();

    if (!title) {
        var previousTitle = getColumnTitleByColumnId(columnId);
        event.target.textContent = previousTitle;
    } else {
        updateColumn(columnId, title);
    }
}

function updateBoardTitle(event) {
    event.preventDefault();
    event.stopPropagation();

    var title = event.target.textContent.trim();

    if (!title) {
        var previousTitle = getBoardTitleByBoardId(selectedBoard);
        event.target.textContent = previousTitle;
    } else {
        updateBoard(selectedBoard, title);
    }
}

function deleteCard(cardId) {
    var shouldDelete = confirm(CARD_DELETION_TEXT);
    if (shouldDelete) {
        deleteCardByCardId(cardId);
        renderSelectedBoard();
    }
    return shouldDelete;
}

function deleteColumn(columnId) {
    var shouldDelete = confirm(COLUMN_DELETION_TEXT);
    if (shouldDelete) {
        deleteColumnByColumnId(columnId);
        renderSelectedBoard();
    }
    return shouldDelete;
}

function deleteBoard(boardId) {
    var shouldDelete = confirm(BOARD_DELETION_TEXT);
    if (shouldDelete) {
        deleteBoardByBoardId(boardId);

        window.location.hash = '';

        renderNavBar();
        renderSelectedBoard();
    }
    return shouldDelete;
}

function deleteOnEmptyOrReturnPreviousContent(cardId, previousContent) {
    if (deleteCard(cardId)) return null;
    return previousContent;
}

function addBoard() {
    var boardId = createNewBoard();

    window.location.hash = boardId;

    renderNavBar();
    renderSelectedBoard();
}

function addColumn() {
    createNewColumnOnBoard(selectedBoard);

    renderSelectedBoard();
    scrollRightSelectedBoard();
}

function addCard(columnId) {
    var cardId = createNewCardOnColumn(columnId);

    renderSelectedBoard();

    document.getElementById(cardId).children[1].focus();
}

readAllData();
renderNavBar();
renderSelectedBoard();
