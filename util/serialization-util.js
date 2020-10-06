function _serialize(object) {
    return JSON.stringify(object, null, 0);
}

function _deserialize(serializedObject) {
    return JSON.parse(serializedObject);
}

function _copyObject(object) {
    return _deserialize(_serialize(object));
}
