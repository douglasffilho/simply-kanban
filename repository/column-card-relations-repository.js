var columnCardRelations = [
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

function saveColumnCardRelation(newColumnCardRelation) {
    newColumnCardRelation.position =
        newColumnCardRelation.position - POSITION_FACTOR;

    var { newRepo, newItem } = _save(
        columnCardRelations,
        newColumnCardRelation,
        false,
        ''
    );

    columnCardRelations = newRepo.sort(_sortByRelationPosition);

    _persistData('columnCardRelations', columnCardRelations);

    return columnCardRelations;
}

function findColumnCardRelationsByColumnId(columnId) {
    return _findAllByField(columnCardRelations, 'columnId', columnId).sort(
        _sortByRelationPosition
    );
}

function findColumnCardRelationsByCardId(cardId) {
    return _findAllByField(columnCardRelations, 'cardId', cardId);
}

function deleteColumnCardRelationsByColumnId(columnId) {
    columnCardRelations = _deleteAllByField(
        columnCardRelations,
        'columnId',
        columnId
    );

    _persistData('columnCardRelations', columnCardRelations);

    return columnCardRelations;
}

function deleteColumnCardRelationsByCardId(cardId) {
    columnCardRelations = _deleteAllByField(
        columnCardRelations,
        'cardId',
        cardId
    );

    _persistData('columnCardRelations', columnCardRelations);

    return columnCardRelations;
}

function updateColumnCardRelationsByColumnId(
    columnId,
    updateFieldName,
    updateFieldValue
) {
    columnCardRelations = _updateAllByField(
        columnCardRelations,
        'columnId',
        columnId,
        updateFieldName,
        updateFieldValue
    );

    columnCardRelations = columnCardRelations.sort(_sortByRelationPosition);

    _persistData('columnCardRelations', columnCardRelations);

    return columnCardRelations;
}

function updateColumnCardRelationsByCardId(
    cardId,
    updateFieldName,
    updateFieldValue
) {
    columnCardRelations = _updateAllByField(
        columnCardRelations,
        'cardId',
        cardId,
        updateFieldName,
        updateFieldValue
    );

    columnCardRelations = columnCardRelations.sort(_sortByRelationPosition);

    _persistData('columnCardRelations', columnCardRelations);

    return columnCardRelations;
}

function restoreColumnCardRelations(data) {
    _persistData('columnCardRelations', data);
    columnCardRelations = _readPersistedData('columnCardRelations', columnCardRelations);
}

function getAllColumnCardRelations() {
    return _readPersistedData('columnCardRelations', columnCardRelations);
}
