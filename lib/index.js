'use strict';

const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const execFile = require('child_process').execFile;
const execFileSync = require('child_process').execFileSync;
const os = require('os');
const fs = require('fs');
const constants = require('./constants');
const extname = require('path').extname;
const join = require('path').join;

const TIMEOUT = 10000;

const supportedExtsWin = ['.exe', '.cab', '.ocx', '.dll'];
const supportedExtsMac = ['.pkg', '.app'];

class SignCheck {
    static isSupportedExtension(path) {
        if (os.platform() === constants.platforms.win32 ?
                supportedExtsWin.indexOf(extname(path)) > -1 :
                supportedExtsMac.indexOf(extname(path)) > -1
        ) {
            return true;
        }

        return false;
    }

    static check(path) {
        if (os.platform() === constants.platforms.darwin) {
            return SignCheck.checkMac(path);
        } else {
            return SignCheck.checkWin(path);
        }
    }

    static checkSync(path) {
        if (os.platform() === constants.platforms.darwin) {
            return SignCheck.checkMacSync(path);
        } else {
            return SignCheck.checkWinSync(path);
        }
    }

    static checkWin(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                return reject(new Error(constants.errors.wrongPath));
            }

            if (!SignCheck.isSupportedExtension(path)) {
                return reject(new Error(constants.errors.extensionNotSupported));
            }

            try {
                const execProcess = execFile(join(__dirname, 'bin', 'CheckSign.exe'), [path], (e, s) => {
                    if (e) {
                        return resolve(false);
                    }
                    resolve(true);
                });
            } catch (error) {
                reject(new Error(`${constants.errors.unableToVerify} ${error}`));
            }
        });
    }

    static checkMac(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                return reject(new Error(constants.errors.wrongPath));
            }

            if (!SignCheck.isSupportedExtension(path)) {
                return reject(new Error(constants.errors.extensionNotSupported));
            }

            try {
                const execProcess = extname(path) === '.pkg' ?
                    exec(`pkgutil --check-signature "${path}"`) :
                    exec(`codesign --verify "${path}"`);
                execProcess.on('exit', (code) => resolve(code === 0));
            } catch (error) {
                reject(new Error(`${constants.errors.unableToVerify} ${error}`));
            }
        });
    }

    static checkMacSync(path) {
        if (!fs.existsSync(path)) {
            throw new Error(constants.errors.wrongPath);
        }

        if (!SignCheck.isSupportedExtension(path)) {
            throw new Error(constants.errors.extensionNotSupported);
        }

        try {
            extname(path) === '.pkg' ?
                execSync(`pkgutil --check-signature "${path}"`, {timeout: TIMEOUT}) :
                execSync(`codesign --verify "${path}"`, {timeout: TIMEOUT});
        } catch (e) {
            return false;
        }
        return true;
    }

    static checkWinSync(path) {
        if (!fs.existsSync(path)) {
            throw new Error(constants.errors.wrongPath)
        }

        if (!SignCheck.isSupportedExtension(path)) {
            throw new Error(constants.errors.extensionNotSupported);
        }

        try {
            execFileSync(join(__dirname, 'bin', 'CheckSign.exe'), [path]);
            return true;
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = SignCheck;
