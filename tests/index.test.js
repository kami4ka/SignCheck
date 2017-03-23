jest.autoMockOff();

describe('Sign Check', function() {
    var checkWin = require('../index').checkWin;
    var checkMac = require('../index').checkMac;

    it('should have described methods', function() {
        expect(checkWin).not.toEqual(null);
        expect(checkWin).toBeDefined();

        expect(checkMac).not.toEqual(null);
        expect(checkMac).toBeDefined();
    });
});