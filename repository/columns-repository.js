var DEFAULT_NEW_COLUMN_TEXT = 'New Column';

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

function saveColumn(newColumn) {
    var { newRepo, newItem } = _save(columnsData, newColumn, true);

    columnsData = newRepo;

    _persistData('columnsData', columnsData);

    return newItem;
}

function findColumnById(columnId) {
    return _findById(columnsData, columnId);
}

function deleteColumnById(columnId) {
    columnsData = _deleteById(columnsData, columnId);

    _persistData('columnsData', columnsData);

    return columnsData;
}

function updateColumnById(columnId, updateFieldName, updateFieldValue) {
    columnsData = _updateById(
        columnsData,
        columnId,
        updateFieldName,
        updateFieldValue
    );

    _persistData('columnsData', columnsData);

    return columnsData;
}

function restoreColumnsData(data) {
    _persistData('columnsData', data);
    columnsData = _readPersistedData('columnsData', columnsData);
}
