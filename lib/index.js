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

const TIMEOUT = 1000;

const supportedExtsWin = ['.exe', '.cab', '.ocx', '.dll'];
const supportedExtsMac = ['.pkg', '.app'];

class SignCheck {
    static isSupportedExtension(path) {
        if (os.platform() === constants.platforms.win32 ?
            supportedExtsWin.includes(extname(path)) :
            supportedExtsMac.includes(extname(path))
        ) {
            return true;
        }

        return false;
    }

    static check(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                reject(new Error(constants.errors.wrongPath));
            }

            if (!SignCheck.isSupportedExtension(path)) {
                reject(new Error(constants.errors.extensionNotSupported));
            }

            try {
                if (os.platform() === constants.platforms.darwin) {
                    const execProcess = extname(path) === '.pkg' ?
                        exec(`pkgutil --check-signature "${path}"`) :
                        exec(`codesign --verify "${path}"`);
                    execProcess.on('exit', (code) => resolve(code === 0));
                } else {
                    const execProcess = execFile(join(__dirname, 'bin', 'CheckSign.exe'), [path]);
                    execProcess.on('exit', (code) => resolve(code === 0));
                }
            } catch (error) {
                reject(new Error(`${constants.errors.unableToVerify} ${error}`));
            }
        });
    }

    static checkSync(path) {
        if (!fs.existsSync(path)) {
            throw new Error(constants.errors.wrongPath);
        }

        if (!SignCheck.isSupportedExtension(path)) {
            throw new Error(constants.errors.extensionNotSupported);
        }

        try {
            if (os.platform() === constants.platforms.darwin) {
                extname(path) === '.pkg' ?
                    execSync(`pkgutil --check-signature "${path}"`, { timeout: TIMEOUT }) :
                    execSync(`codesign --verify "${path}"`, { timeout: TIMEOUT });
            } else {
                execFileSync(join(__dirname, 'bin', 'CheckSign.exe'), [path]);
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    static checkWin(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                reject(new Error(constants.errors.wrongPath));
            }

            if (os.platform() !== constants.platforms.win32) {
                reject(new Error(constants.errors.wrongPlatformWin));
            }

            if (!SignCheck.isSupportedExtension(path)) {
                reject(new Error(constants.errors.extensionNotSupported));
            }

            try {
                const execProcess = execFile(join(__dirname, 'bin', 'CheckSign.exe'), [path]);
                execProcess.on('exit', (code) => resolve(code === 0));
            } catch (error) {
                reject(new Error(`${constants.errors.unableToVerify} ${error}`));
            }
        });
    }

    static checkMac(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                reject(new Error(constants.errors.wrongPath));
            }

            if (os.platform() !== constants.platforms.darwin) {
                reject(new Error(constants.errors.wrongPlatformMac));
            }

            if (!SignCheck.isSupportedExtension(path)) {
                reject(new Error(constants.errors.extensionNotSupported));
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

        if (os.platform() !== constants.platforms.darwin) {
            throw new Error(constants.errors.wrongPlatformMac);
        }

        if (!SignCheck.isSupportedExtension(path)) {
            throw new Error(constants.errors.extensionNotSupported);
        }

        try {
            extname(path) === '.pkg' ?
                execSync(`pkgutil --check-signature "${path}"`, { timeout: TIMEOUT }) :
                execSync(`codesign --verify "${path}"`, { timeout: TIMEOUT });
        } catch (e) {
            return false;
        }
        return true;
    }

    static checkWinSync(path) {
        if (!fs.existsSync(path)) {
            throw new Error(constants.errors.wrongPath)
        }

        if (os.platform() !== constants.platforms.win32) {
            throw new Error(constants.errors.wrongPlatformWin);
        }

        if (!SignCheck.isSupportedExtension(path)) {
            throw new Error(constants.errors.extensionNotSupported);
        }

        try {
            execFileSync(join(__dirname, 'bin', 'CheckSign.exe'), [path]);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = SignCheck;
