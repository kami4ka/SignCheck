'use strict';

jest.autoMockOff();

const constants = require('../lib/constants');
const unsignedPath = `${__dirname}${constants.test.unsignedPath}`;

let SignCheck = require('../lib/index');
describe('Sign Check', () => {
    it('should have described methods', () => {
        expect(SignCheck.checkWin).not.toEqual(null);
        expect(SignCheck.checkWin).toBeDefined();

        expect(SignCheck.checkMac).not.toEqual(null);
        expect(SignCheck.checkMac).toBeDefined();

        expect(SignCheck.checkWinSync).not.toEqual(null);
        expect(SignCheck.checkWinSync).toBeDefined();

        expect(SignCheck.checkMacSync).not.toEqual(null);
        expect(SignCheck.checkMacSync).toBeDefined();

        expect(SignCheck.check).not.toEqual(null);
        expect(SignCheck.check).toBeDefined();

        expect(SignCheck.checkSync).not.toEqual(null);
        expect(SignCheck.checkSync).toBeDefined();
    });
});
