var selectedBoard = undefined;
var DEFAULT_SCROLL_SHIFT = 1000000;

function buildAddCardComponent(column) {
    return `
        <div class="add card" onclick="addCard('${column.id}')">
            <p>+</p>
        </div>
    `;
}

function buildCardComponent(card) {
    var { id, text } = card;
    return `
        <div
            class="card"
            id="${id}"
            draggable="true"
            ondragstart="drag(event)"
            ondragover="allowDrop(event)"
            ondrop="drop(event)">
            <p class="card-delete" onclick="deleteCard('${id}')"> - </p>
            <div
                class="editable"
                contentEditable="true"
                onfocusin="selectText(event)"
                onfocusout="cardEdit(event, '${id}')">
                ${text}
            </div>
        </div>
    `;
}

function buildCardsComponent(column, cards) {
    return `
        <div class="board-cards">
            ${(cards || []).map((card) => buildCardComponent(card)).join('\n')}
            ${buildAddCardComponent(column)}
        </div>
    `;
}

function buildAddColumnComponent() {
    return `
        <div class="add-board-column" onclick="addColumn()">
            <p>+</p>
        </div>
    `;
}

function buildColumnComponent(column) {
    var { id, title } = column;
    var cards = findColumnCardsByColumnId(id);

    return `
        <div
            class="board-column"
            id="${id}"
            draggable="true"
            ondragstart="drag(event)"
            ondragover="allowDrop(event)"
            ondrop="drop(event)"
        >
            <p class="board-delete" onclick="deleteColumn('${id}')"> - </p>
            <div
                class="editable"
                contentEditable="true"
                onfocusin="selectText(event)"
                onfocusout="updateColumnTitle(event, '${id}')"
            >
                <p>${title}</p>
            </div>
            ${buildCardsComponent(column, cards)}
        </div>
    `;
}

function buildColumnsComponent(columns) {
    return `
        <div class="board-columns">
            ${columns.map((column) => buildColumnComponent(column)).join('\n')}
            ${buildAddColumnComponent()}
        </div>
    `;
}

function buildBoardComponent(board) {
    var { id, title } = board;
    var columns = findBoardColumnsByBoardId(id);

    return `
        <div class="board" id="${id}">
            <div
                class="editable"
                contentEditable="true"
                onfocusin="selectText(event)"
                onfocusout="updateBoardTitle(event)"
            >
                <p>${title}</p>
            </div>
            ${buildColumnsComponent(columns)}
        </div>
    `;
}

function renderBoard(boardId) {
    var board = findBoardById(boardId);
    var boardComponent = buildBoardComponent(board);
    var main = document.getElementsByTagName('main')[0];
    main.innerHTML = boardComponent;
}

function renderSelectedBoard() {
    var boardId = window.location.hash;

    if (!boardId && (boardsData || []).length > 0) {
        boardId = boardsData[0].id;
        window.location.hash = `#${boardId}`;
    }
    boardId = boardId.replace('#', '');

    if (boardId) {
        renderBoard(boardId);
        selectedBoard = boardId;
    }
}

function scrollDownColumn(columnId) {
    document
        .getElementById(columnId)
        .children[1].scrollTo(0, DEFAULT_SCROLL_SHIFT);
}

function scrollRightSelectedBoard() {
    document
        .getElementById(selectedBoard)
        .children[1].scrollTo(DEFAULT_SCROLL_SHIFT, 0);
}

renderSelectedBoard();
