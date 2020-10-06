var POSITION_FACTOR = 0.01;

function _createUUID() {
    var dt = new Date().getTime();
    return 'xxxxxxx-xxxyxxx-xxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

function _serialize(object) {
    return JSON.stringify(object, null, 0);
}

function _deserialize(serializedObject) {
    return JSON.parse(serializedObject);
}

function _copyObject(object) {
    return _deserialize(_serialize(object));
}

function _readPersistedData(repositoryName, repository) {
    var serializedData = localStorage.getItem(repositoryName);
    if (!serializedData) serializedData = _serialize(repository);

    return _deserialize(serializedData);
}

function _persistData(repositoryName, repository) {
    var serializedData = _serialize(repository);
    localStorage.setItem(repositoryName, serializedData);
}

function _save(repository, item, mustCreateId, idPrefix) {
    if (mustCreateId) item.id = `${idPrefix}-${_createUUID()}`;

    var newRepo = _copyObject(repository);
    newRepo.push(item);

    return { newRepo, newItem: item };
}

function _findAllByField(repository, fieldName, fieldValueMatching) {
    var objRef = _copyObject(repository) || [];
    return objRef.filter(function (item) {
        return item[fieldName] === fieldValueMatching;
    });
}

function _findFirstByField(repository, fieldName, fieldValueMatching) {
    return (_findAllByField(repository, fieldName, fieldValueMatching) ||
        [])[0];
}

function _findById(repository, id) {
    return _findFirstByField(repository, 'id', id);
}

function _deleteAllByField(repository, fieldName, fieldValueMatching) {
    var data = _copyObject(repository);

    var newRepo = data.filter(function (item) {
        return item[fieldName] !== fieldValueMatching;
    });

    return newRepo;
}

function _deleteById(repository, id) {
    return _deleteAllByField(repository, 'id', id);
}

function _updateAllByField(
    repository,
    fieldName,
    fieldValueMatching,
    updateFieldName,
    updateFieldValue
) {
    var data = _copyObject(repository);

    var newRepo = data.map(function (item) {
        if (item[fieldName] === fieldValueMatching)
            item[updateFieldName] = updateFieldValue;
        return item;
    });

    return newRepo;
}

function _updateById(repository, id, updateFieldName, updateFieldValue) {
    return _updateAllByField(
        repository,
        'id',
        id,
        updateFieldName,
        updateFieldValue
    );
}
