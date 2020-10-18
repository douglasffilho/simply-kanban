function appendEvents() {
    appendBackupEvents();
    appendCardEvents();
    appendColumnsEvents();
    appendBoardEvents();
}

window.onhashchange = function () {
    renderSelectedBoard();
};

document.onkeypress = function (event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        event.target.blur();
    }
};

window.onload = appendEvents;
window.onchange = appendEvents;
document.onchange = appendEvents;
document.body.onchange = appendEvents;
document.onload = appendEvents;

shouldAppendEvents = true;
