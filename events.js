window.onhashchange = function () {
    renderSelectedBoard();
};

document.onkeypress = function (event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        event.target.blur();
    }
};
