var DEFAULT_SCROLL_SHIFT = 1_000_000_000;

function buildAddCardComponent(column) {
    return `
        <div class="add-card" data-column-id="${column.id}">
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
            draggable="true">
            <p class="card-delete"> - </p>
            <div
                class="editable"
                contentEditable="true">
                ${text}
            </div>
        </div>
    `;
}

function buildCardsComponent(column, cards) {
    return `
        <div class="column-cards">
            ${(cards || []).map((card) => buildCardComponent(card)).join('\n')}
            ${buildAddCardComponent(column)}
        </div>
    `;
}

function buildAddColumnComponent() {
    return `
        <div class="add-board-column">
            <p>+</p>
        </div>
    `;
}

function buildColumnComponent(column) {
    var { id, title, cards } = column;

    return `
        <div
            class="board-column"
            id="${id}"
            draggable="true"
        >
            <p class="column-delete"> - </p>
            <div
                class="editable"
                contentEditable="true"
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
    var { id, title, columns } = board;

    return `
        <div class="board" id="${id}">
        <div class="board-header" id="${id}">
                <p class="board-delete"> - </p>
                <div
                    class="editable"
                    contentEditable="true"
                >
                    <header>${title}</header>
                </div>
            </div>
            ${buildColumnsComponent(columns)}
        </div>
    `;
}

function renderBoard(board) {
    var boardComponent = buildBoardComponent(board);
    var main = document.getElementsByTagName('main')[0];
    main.innerHTML = boardComponent;
}

function scrollRightSelectedBoard() {
    document
        .getElementById(selectedBoard)
        .children[1].scrollBy(DEFAULT_SCROLL_SHIFT, 0);
}
