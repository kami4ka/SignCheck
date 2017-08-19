module.exports = {
    platforms: {
        win32: 'win32',
        darwin: 'darwin',
    },
    methodName: {
        win32: 'checkWin',
        darwin: 'checkMac',
    },
    errors: {
        noFilePath: 'File path is important!',
        wrongPath: 'No such path',
        wrongPlatformMac: 'Can not check macOS sign on current platform',
        wrongPlatformWin: 'Can not check Win sign on current platform',
        notSupportedPlatform: 'Not supported OS!',
        unableToVerify: 'Unable to verify file sign',
    },
    messages: {
        signed: 'File is signed!',
        notSigned: 'File isn\'t signed!',
    },
    test: {
        unsignedPath: '/__data__/unsigned.data',
        signedPath: '/__data__/signed.data', // @TODO sign this file and write tests for it
        wrongPlatform: 'wrong platform'
    },
    cli: {
        errorCode: 1,
        successCode: 0
    }
};
