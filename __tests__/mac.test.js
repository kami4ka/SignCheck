'use strict';

jest.autoMockOff();

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

    it('should return false on unsigned file', (done) => {
        SignCheck.checkMac(unsignedPath).then(isSigned => {
            expect(isSigned).toEqual(false);
            done();
        }).catch(err => {
            expect(err).not.toBeDefined();
            done();
        });
    });

    it('should not allow wrong path sync', () => {
        expect(SignCheck.checkMacSync).toThrow();
    });

    it('should throw on unsigned file sync', () => {
        expect(() => {SignCheck.checkMacSync(unsignedPath);}).toThrow();
    });

    // TODO: fix signed.data to be signed
    // it('should return true signed file sync', (done) => {
    //     expect(SignCheck.checkMacSync(signedPath)).toBeTruthy()
    // });
});