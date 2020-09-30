var DEFAULT_NEW_BOARD_TITLE = 'New Board';

function findBoardByBoardId(boardId) {
    var board = findBoardById(boardId);

    var boardColumnsRelations = findBoardColumnRelationsByBoardId(boardId);
    var columns = boardColumnsRelations.map(function (boardColumnRelation) {
        var column = findColumnById(boardColumnRelation.columnId);

        var columnCardsRelations = findColumnCardRelationsByColumnId(column.id);
        var cards = columnCardsRelations.map(function (columnCardRelation) {
            return findCardById(columnCardRelation.cardId);
        });
        column.cards = cards;

        return column;
    });
    board.columns = columns;

    return board;
}

function updateBoardTitleById(boardId, title) {
    updateBoardById(boardId, 'title', title);
}

function deleteBoardByBoardId(boardId) {
    findBoardColumnRelationsByBoardId(boardId).forEach(function(boardColumnRelation) {
        deleteColumnByColumnId(boardColumnRelation.columnId);
    });

    deleteBoardById(boardId);
}

function createNewBoard() {
    var newBoard = {
        title: DEFAULT_NEW_BOARD_TITLE
    };

    var createdBoard = saveBoard(newBoard);
    var boardId = createdBoard.id;

    return boardId;
}
