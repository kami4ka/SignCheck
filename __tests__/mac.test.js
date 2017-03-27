'use strict';

jest.autoMockOff();
jest.dontMock('bluebird');

const constants = require('../lib/constants');

const unsignedPath = `${__dirname}${constants.test.unsignedPath}`;
const signedPath = `${__dirname}${constants.test.signedPath}`;

jest.setMock('os', {
    platform: () => constants.platforms.darwin
});

let SignCheck = require('../lib/index');
describe('Sign Check', () => {
    it('should not allow wrong path', (done) => {
        SignCheck.checkMac('~/wrong/path').then(res => {
            expect(res).not.toBeDefined();
            done();
        }).catch(err => {
            expect(err.message).toEqual(constants.errors.wrongPath);
            done();
        });
    });

    it('should unsigned file', (done) => {
        SignCheck.checkMac(unsignedPath).then(isSigned => {
            expect(isSigned).toEqual(false);
            done();
        }).catch(err => {
            expect(err).not.toBeDefined();
            done();
        });
    });
});