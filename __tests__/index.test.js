'use strict';

jest.autoMockOff();
jest.dontMock('bluebird');

const constants = require('../lib/constants');
const unsignedPath = `${__dirname}${constants.test.unsignedPath}`;

let SignCheck = require('../lib/index');
describe('Sign Check', () => {
    it('should have described methods', () => {
        expect(SignCheck.checkWin).not.toEqual(null);
        expect(SignCheck.checkWin).toBeDefined();

        expect(SignCheck.checkMac).not.toEqual(null);
        expect(SignCheck.checkMac).toBeDefined();
    });
});

describe('Sign Check Wrong Os', () => {
    beforeEach(() => {
        jest.setMock('os', {
            platform: () => constants.test.wrongPlatform
        });
        SignCheck = require('../lib/index');
    });

    it('should wrong platform on windows', (done) => {
        SignCheck.checkWin(unsignedPath).then(res => {
            expect(res).not.toBeDefined();
            done();
        }).catch(err => {
            expect(err.message).toEqual(constants.errors.wrongPlatformWin);
            done();
        });
    });

    it('should wrong platform on macOs', (done) => {
        SignCheck.checkMac(unsignedPath).then(res => {
            expect(res).not.toBeDefined();
            done();
        }).catch(err => {
            expect(err.message).toEqual(constants.errors.wrongPlatformMac);
            done();
        });
    });
});
