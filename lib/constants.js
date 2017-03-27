module.exports = {
    platforms: {
        win32: 'win32',
        darwin: 'darwin',
    },
    errors: {
        wrongPath: 'No such path',
        codeSignMac: 'codesign --verify',
        wrongPlatformMac: 'Can not check macOS sign on current platform',
        wrongPlatformWin: 'Can not check Win sign on current platform',
        unableToVerify: 'Unable to verify file sign',
    },
    test: {
        unsignedPath: '/__data__/unsigned.data',
        signedPath: '/__data__/signed.data', // @TODO sign this file and write tests for it
        wrongPlatform: 'wrong platform'
    }
};
