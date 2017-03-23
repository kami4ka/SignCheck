'use strict';

jest.autoMockOff();

describe('Sign Check', function() {
    const SignCheck = require('../index');

    it('should have described methods', () => {
        expect(SignCheck.checkWin).not.toEqual(null);
        expect(SignCheck.checkWin).toBeDefined();

        expect(SignCheck.checkMac).not.toEqual(null);
        expect(SignCheck.checkMac).toBeDefined();
    });

    it('checkWin should not allow wrong path', (done) => {
       SignCheck.checkWin('C:\\wrong\\path', (err, isSigned) => {
           expect(err).toEqual('No such path');
           expect(isSigned).toBeUndefined();

           done();
       });
    });

    it('checkMac should not allow wrong path', (done) => {
        SignCheck.checkMac('~/wrong/path', (err, isSigned) => {
            expect(err).toEqual('No such path');
            expect(isSigned).toBeUndefined();
            done();
        });
    });
});