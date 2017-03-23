var exec = require('child_process').exec;
var os = require('os');
var path = require('path');

var win32 = 'win32';
var darwin = 'darwin';

function checkWin(path, callback) {
    if (typeof callback !== 'function') {
        return;
    }

    if (!path.existsSync(path)) {
        callback(null, 'No such path');
    }

    if (os.platform() !== win32) {
        callback(null, 'Can not check Win sign on current platform');
    }
}

function checkMac(path, callback) {
    if (typeof callback !== 'function') {
        return;
    }

    if (!path.existsSync(path)) {
        callback(null, 'No such path');
    }

    if (os.platform() !== darwin) {
        callback(null, 'Can not check macOS sign on current platform');
    }

    try {
        var execProcess = exec('codesign --verify "' + path + '"');
        execProcess.on('exit', function (code) {
            if (code === 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    } catch (error) {
        callback(null, 'Unable to verify file sign ' + error);
    }
}

module.exports.checkWin = checkWin;
module.exports.checkMac = checkMac;