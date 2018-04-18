# SignCheck
[![NPM](https://img.shields.io/npm/v/sign-check.svg "NPM package version")](https://www.npmjs.com/package/sign-check)
[![Build Status](https://travis-ci.org/kami4ka/SignCheck.svg?branch=master)](https://travis-ci.org/kami4ka/SignCheck)
[![NPM](https://img.shields.io/npm/dt/sign-check.svg "NPM package downloads")](https://www.npmjs.com/package/sign-check)

Check specified path sign with native current OS signing tools

## Usage

Get the package via NPM: `npm install sign-check`.

```js
const SignCheck = require('sign-check');

const somePath = 'some/path/for/test';

// for macOS
SignCheck.checkMac(somePath).then(
    (isSigned) => {
        console.log('File sign status ' + isSigned);
    },
    (error) => {
        console.log(error);
    }
);

//Same behavior for win function
SignCheck.checkWin(somePath).then(
...
);
```

or use sync version of `checkMacSync` and `checkWinSync`

```js
try {
    SignCheck.checkMacSync(somePath);
    console.log('File is signed');
} catch(error) {
    console.log(error);
    console.log('File is not signed');
}
```

## Usage as CLI tool

Install the package globally: `npm install -g sign-check`.

```sh
	sign-check 'path/to/file'
```

## Notes

For Win verification used [sample](https://msdn.microsoft.com/en-us/library/aa382384(VS.85).aspx) code compiled to binary.

For detailed info about Windows tool error codes see: `lib/bin/README.md`

For detailed info about macOS tool see [official doc](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/codesign.1.html)
