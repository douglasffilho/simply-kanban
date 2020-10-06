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

function saveBoard(newBoard) {
    var { newRepo, newItem } = _save(boardsData, newBoard, true, 'board');

    boardsData = newRepo;

    _persistData('boardsData', boardsData);

    return newItem;
}

function findBoardById(boardId) {
    return _findById(boardsData, boardId);
}

function deleteBoardById(boardId) {
    boardsData = _deleteById(boardsData, boardId);

    _persistData('boardsData', boardsData);

    return boardsData;
}

function updateBoardById(boardId, updateFieldName, updateFieldValue) {
    boardsData = _updateById(
        boardsData,
        boardId,
        updateFieldName,
        updateFieldValue
    );

    _persistData('boardsData', boardsData);

    return boardsData;
}
