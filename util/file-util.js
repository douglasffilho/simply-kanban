function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function uploadData(uploadCallback) {
    var element = document.createElement('input');
    element.type = 'file';

    element.style.display = 'none';

    element.addEventListener('change', function () {
        var file_to_read = element.files[0];
        var fileread = new FileReader();
        fileread.onload = function (e) {
            var content = e.target.result;
            uploadCallback(_deserialize(content));
        };
        fileread.readAsText(file_to_read);
    });

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
