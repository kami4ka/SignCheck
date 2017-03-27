'use strict';

const exec = require('child_process').exec;
const os = require('os');
const fs = require('fs');
const Promise = require('bluebird');
const constants = require('./constants');

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
                // @TODO verify
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

            try {
                const execProcess = exec(`${constants.errors.codeSignMac} "${path}"`);
                execProcess.on('exit', (code) => resolve(code === 0));
            } catch (error) {
                reject(new Error(`${constants.errors.unableToVerify} ${error}`));
            }
        });
    }
}

module.exports = SignCheck;