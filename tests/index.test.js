'use strict';

jest.autoMockOff();

describe('Sign Check', function() {
    const SignCheck = require('../index');

    it('should have described methods', function() {
        expect(SignCheck.checkWin).not.toEqual(null);
        expect(SignCheck.checkWin).toBeDefined();

        expect(SignCheck.checkMac).not.toEqual(null);
        expect(SignCheck.checkMac).toBeDefined();
    });

    it('')
});