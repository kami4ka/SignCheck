# SignCheck
[![NPM](https://img.shields.io/npm/v/sign-check.svg "NPM package version")](https://www.npmjs.com/package/sign-check)
[![Build Status](https://travis-ci.org/kami4ka/SignCheck.svg?branch=master)](https://travis-ci.org/kami4ka/SignCheck)

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

## Notes

For Win verification used [sample](https://msdn.microsoft.com/en-us/library/aa382384(VS.85).aspx) code compiled to binary.