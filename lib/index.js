'use strict';

const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const os = require('os');
const fs = require('fs');
const constants = require('./constants');
const extname = require('path').extname;
const join = require('path').join;

const TIMEOUT = 1000;

class SignCheck {
    static checkWin(path) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path)) {
                reject(new Error(constants.errors.wrongPath));
            }

            if (os.platform() !== constants.platforms.win32) {
                reject(new Error(constants.errors.wrongPlatformWin));
            }

            try {
                const execProcess = exec(join(__dirname, 'bin', 'CheckSign.exe') + ` "${path}"`);
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

            const isPkg = extname(path) === '.pkg';

            try {
                const execProcess = isPkg ?
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

        extname(path) === '.pkg' ?
            execSync(`pkgutil --check-signature "${path}"`, {timeout: TIMEOUT}) :
            execSync(`codesign --verify "${path}"`, {timeout: TIMEOUT});
        return true;
    }

    static checkWinSync(path) {
        if (!fs.existsSync(path)) {
            throw new Error(constants.errors.wrongPath)
        }

        if (os.platform() !== constants.platforms.win32) {
            throw new Error(constants.errors.wrongPlatformWin);
        }

        execSync(join(__dirname, 'bin', 'CheckSign.exe') + ` "${path}"`);
        return true;
    }
}

module.exports = SignCheck;
