var boardColumnRelations = [
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

function saveBoardColumnRelation(newBoardColumnRelation) {
    newBoardColumnRelation.position =
        newBoardColumnRelation.position - POSITION_FACTOR;

    var { newRepo, newItem } = _save(
        boardColumnRelations,
        newBoardColumnRelation,
        false,
        ''
    );

    boardColumnRelations = newRepo.sort(_sortByRelationPosition);

    _persistData('boardColumnRelations', boardColumnRelations);

    return boardColumnRelations;
}

function findBoardColumnRelationsByBoardId(boardId) {
    return _findAllByField(boardColumnRelations, 'boardId', boardId).sort(
        _sortByRelationPosition
    );
}

function findBoardColumnRelationsByColumnId(columnId) {
    return _findAllByField(boardColumnRelations, 'columnId', columnId);
}

function deleteBoardColumnRelationsByBoardId(boardId) {
    boardColumnRelations = _deleteAllByField(
        boardColumnRelations,
        'boardId',
        boardId
    );

    _persistData('boardColumnRelations', boardColumnRelations);

    return boardColumnRelations;
}

function deleteBoardColumnRelationsByColumnId(columnId) {
    boardColumnRelations = _deleteAllByField(
        boardColumnRelations,
        'columnId',
        columnId
    );

    _persistData('boardColumnRelations', boardColumnRelations);

    return boardColumnRelations;
}

function updateBoardColumnRelationsByBoardId(
    boardId,
    updateFieldName,
    updateFieldValue
) {
    boardColumnRelations = _updateAllByField(
        boardColumnRelations,
        'boardId',
        boardId,
        updateFieldName,
        updateFieldValue
    );

    boardColumnRelations = boardColumnRelations.sort(_sortByRelationPosition);

    _persistData('boardColumnRelations', boardColumnRelations);

    return boardColumnRelations;
}

function updateBoardColumnRelationsByColumnId(
    columnId,
    updateFieldName,
    updateFieldValue
) {
    boardColumnRelations = _updateAllByField(
        boardColumnRelations,
        'columnId',
        columnId,
        updateFieldName,
        updateFieldValue
    );

    boardColumnRelations = boardColumnRelations.sort(_sortByRelationPosition);

    _persistData('boardColumnRelations', boardColumnRelations);

    return boardColumnRelations;
}

function restoreBoardColumnRelations(data) {
    _persistData('boardColumnRelations', data);
    boardColumnRelations = _readPersistedData('boardColumnRelations', boardColumnRelations);
}

function getAllBoardColumnRelations() {
    return _readPersistedData('boardColumnRelations', boardColumnRelations);
}
