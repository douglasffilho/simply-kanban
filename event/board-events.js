function _appendNavBarBoardEvents() {
    var addBoardButton = document.querySelector('#add-board');
    addBoardButton.addEventListener('click', addBoard);
}

function _appendBoardEvents() {
    var board = document.querySelector('.board-header');
    var { id } = board;
    var children = Array.from(board.children);
    children.forEach(function (child) {
        if (child.className === 'board-delete') {
            child.addEventListener('click', function () {
                deleteBoard(id);
            });
        } else if (child.className === 'editable') {
            child.addEventListener('focusin', selectText);
            child.addEventListener('focusout', updateBoardTitle);
        }
    });
}

function appendBoardEvents() {
    _appendNavBarBoardEvents();
    _appendBoardEvents();
}
