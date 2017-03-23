'use strict';

const exec = require('child_process').exec;
const os = require('os');
const fs = require('fs');

const win32 = 'win32';
const darwin = 'darwin';

class SignCheck {
    static checkWin(path, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        if (!fs.existsSync(path)) {
            callback('No such path');
            return;
        }

        if (os.platform() !== win32) {
            callback('Can not check Win sign on current platform');
            return;
        }
    }

    static checkMac(path, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        if (!fs.existsSync(path)) {
            callback('No such path');
            return;
        }

        if (os.platform() !== darwin) {
            callback('Can not check macOS sign on current platform');
            return;
        }

        try {
            const execProcess = exec('codesign --verify "' + path + '"');
            execProcess.on('exit', (code) => {
                if (code === 0) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            });
        } catch (error) {
            callback('Unable to verify file sign ' + error);
        }
    }
}

module.exports = SignCheck;