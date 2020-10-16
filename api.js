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

function _removeDraggingElement() {
    var ghost = document.getElementById('ghost');
    if (ghost) document.body.removeChild(ghost);
}

function _setDraggingElement(event) {
    var element = event.target;

    var ghost = element.cloneNode(true);
    ghost.id = 'ghost';
    ghost.style.maxWidth = '10rem';
    ghost.children[0].style.display = 'none';
    ghost.classList.add('face');

    document.body.appendChild(ghost);

    event.dataTransfer.setDragImage(ghost, 20, 20);

    element.classList.add('dragging');
}

function _getMouseYPosition(event) {
    return event.pageY;
}

function _getCardYPosition(cardId) {
    var element = document.getElementById(cardId);
    var position = element.getBoundingClientRect();
    var height = element.clientHeight;
    return position.y + height / 2;
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

        _setDraggingElement(event);
    }
}

function dragend(event) {
    event.stopPropagation();

    event.target.classList.remove('dragging');
    _removeDraggingElement();
}

function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    var toCard = _getParentCard(event);
    if (toCard) {
        var deliveryYPosition = _getMouseYPosition(event);
        var destCardScreenYPosition = _getCardYPosition(toCard);

        // if (deliveryYPosition <= destCardScreenYPosition) {
        //     console.log(`render box above card ${toCard}`);
        // } else {
        //     console.log(`render box below card ${toCard}`);
        // }
    }
}

function moveColumn(toColumn) {
    updateColumnPosition(fromColumn, toColumn);
    renderSelectedBoard();
}

function moveCard(destColumn, destCard, event) {
    var deliveryYPosition = _getMouseYPosition(event);
    var destCardScreenYPosition = destCard ? _getCardYPosition(destCard) : 0;
    updateCardColumnAndPosition(
        fromCard,
        destColumn,
        destCard,
        deliveryYPosition,
        destCardScreenYPosition
    );
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
                moveCard(toColumn, toCard, event);
            } else {
                moveColumn(toColumn);
            }
        }
    }
    _removeDraggingElement();
}

function selectText(event) {
    event.preventDefault();
    event.stopPropagation();

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
