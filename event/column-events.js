function _appendAddColumnButtonClickEvent() {
    var buttons = document.querySelectorAll('.add-board-column');
    buttons.forEach(function (button) {
        button.addEventListener('click', addColumn);
    });
}

function _appendColumnsEvents() {
    var columns = document.querySelectorAll('.board-column');
    columns.forEach(function (column) {
        var { id } = column;
        column.addEventListener('dragstart', drag);
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
        var children = Array.from(column.children);
        children.forEach(function (child) {
            if (child.className === 'column-delete') {
                child.addEventListener('click', function () {
                    deleteColumn(id);
                });
            } else if (child.className === 'editable') {
                child.addEventListener('focusin', selectText);
                child.addEventListener('focusout', function (event) {
                    updateColumnTitle(event, id);
                });
            }
        });
    });
}

function appendColumnsEvents() {
    _appendAddColumnButtonClickEvent();
    _appendColumnsEvents();
}
