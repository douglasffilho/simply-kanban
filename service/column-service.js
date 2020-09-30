var DEFAULT_NEW_COLUMN_TITLE = 'New Column';

function updateColumnPosition(originColumnId, destColumnId) {
    var originRelation = findBoardColumnRelationsByColumnId(originColumnId)[0];
    var destRelation = findBoardColumnRelationsByColumnId(destColumnId)[0];

    updateBoardColumnRelationsByColumnId(
        originColumnId,
        'position',
        destRelation.position
    );
    updateBoardColumnRelationsByColumnId(
        destColumnId,
        'position',
        originRelation.position
    );
}

function updateColumnTitleById(columnId, title) {
    updateColumnById(columnId, 'title', title);
}

function deleteColumnByColumnId(columnId) {
    deleteColumnById(columnId);

    findColumnCardRelationsByColumnId(columnId).forEach(function(columnCardRelation) {
        deleteCardById(columnCardRelation.cardId);
    });

    deleteColumnCardRelationsByColumnId(columnId);
    deleteBoardColumnRelationsByColumnId(columnId);
}

function createNewColumnOnBoard(boardId) {
    var newColumn = {
        title: DEFAULT_NEW_COLUMN_TITLE
    };

    var createdColumn = saveColumn(newColumn);
    var columnId = createdColumn.id;

    var newBoardColumnRelation = {
        boardId,
        columnId
    };

    saveBoardColumnRelation(newBoardColumnRelation);
}
