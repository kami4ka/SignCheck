'use strict';

jest.autoMockOff();
jest.dontMock('bluebird');

const SignCheck = require('../lib/index');
const constants = require('../lib/constants');

jest.setMock('os', {
    platform: () => constants.platforms.win32
});

const os = require('os');

const unsignedPath = `${__dirname}${constants.test.unsignedPath}`;
const signedPath = `${__dirname}${constants.test.signedPath}`;

describe('Sign Check Win', () => {
    it('should not allow wrong path', done => {
        SignCheck.checkWin('C:\\wrong\\path').then(res => {
            expect(res).not.toBeDefined();
            done();
        }).catch(err => {
            expect(err.message).toEqual(constants.errors.wrongPath);
            done();
        });
    });
});