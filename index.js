'use strict';

const exec = require('child_process').exec;
const os = require('os');
const path = require('path');

const win32 = 'win32';
const darwin = 'darwin';

class SignCheck {
    static checkWin(path, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        if (!path.existsSync(path)) {
            callback('No such path');
        }

        if (os.platform() !== win32) {
            callback('Can not check Win sign on current platform');
        }
    }

    static checkMac(path, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        if (!path.existsSync(path)) {
            callback('No such path');
        }

        if (os.platform() !== darwin) {
            callback('Can not check macOS sign on current platform');
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