function _appendBackupButtonClickEvent() {
    document
        .getElementById('backup-button')
        .addEventListener('click', backupData);
}

function _appendRestoreButtonClickEvent() {
    document
        .getElementById('restore-button')
        .addEventListener('click', restoreBackup);
}

function appendBackupEvents() {
    _appendBackupButtonClickEvent();
    _appendRestoreButtonClickEvent();
}
