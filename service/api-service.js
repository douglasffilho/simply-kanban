var shouldAppendEvents = false;

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

function restoreBackup() {
    uploadData(function (data) {
        if (_dataIsInvalid(data)) {
            alert('Data is broken');
            return;
        }

        var {
            boardsData,
            columnsData,
            cardsData,
            boardColumnRelations,
            columnCardRelations
        } = data;

        restoreBoardsData(boardsData);
        restoreColumnsData(columnsData);
        restoreCardsData(cardsData);
        restoreBoardColumnRelations(boardColumnRelations);
        restoreColumnCardRelations(columnCardRelations);

        window.location.hash = '';
        renderSelectedBoard();
    });
}

function backupData() {
    var data = {
        boardsData: getAllBoardsData(),
        cardsData: getAllCardsData(),
        columnsData: getAllColumnsData(),
        boardColumnRelations: getAllBoardColumnRelations(),
        columnCardRelations: getAllColumnCardRelations()
    };

    var content = _serialize(data);

    download('backup.json', content);
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
    if (shouldAppendEvents) appendEvents();
}

function _dataIsInvalid(data) {
    return (
        !data ||
        !data.boardsData ||
        data.boardsData.length < 1 ||
        !data.cardsData ||
        data.cardsData.length < 1 ||
        !data.columnsData ||
        data.columnsData.length < 1
    );
}
