function buildNavItem(board) {
    var { id, title } = board;
    return `<li><a href="#${id}">${title}</a></li>`;
}

function buildNavBar() {
    var boards = Object.values(boardsData);
    return `
        <p class="nav-header">Boards</p>
        <ul class="nav-boards">
            ${boards.map(buildNavItem).join('\n')}
            <li onclick="addBoard()"><a href="javascript:void(0)">+</a></li>
        </ul>
    `;
}

function renderNavBar() {
    var nav = document.getElementsByTagName('nav')[0];
    nav.innerHTML = buildNavBar();
}
