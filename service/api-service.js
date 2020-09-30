function readAllData() {
    boardsData = _readPersistedData('boardsData', boardsData);
    columnsData = _readPersistedData('columnsData', columnsData);
    cardsData = _readPersistedData('cardsData', cardsData);
    boardColumnRelations = _readPersistedData(
        'boardColumnRelations',
        boardColumnRelations
    );
    columnCardRelations = _readPersistedData(
        'columnCardRelations',
        columnCardRelations
    );
}

function renderSelectedBoard() {
    var boardId = window.location.hash;

    if (!boardId && (boardsData || []).length > 0) {
        boardId = boardsData[0].id;
        window.location.hash = `#${boardId}`;
    }
    boardId = boardId.replace('#', '');

    if (boardId) {
        var board = findBoardByBoardId(boardId);
        renderBoard(board);
        selectedBoard = boardId;
    }
}
