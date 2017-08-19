'use strict';

const constants = require('./constants');
const SignCheck = require('./index');
const os = require('os');

const filePath = process.argv[2];

if (!filePath) {
	console.error(constants.errors.noFilePath);
	process.exit(constants.cli.errorCode);
}

if (!Object.values(constants.platforms).constants(os.platform())) {
	console.error(constants.errors.notSupportedPlatform);
	process.exit(constants.cli.errorCode);
}

const method = constants.methodName[os.platform()];

SignCheck[method](filePath).then(isSigned => {
	console.log(
		isSigned
			? constants.messages.signed
			: constants.messages.notSigned
	);
	process.exit(constants.cli.successCode);
}).catch(err => {
	console.error(err);
	process.exit(constants.cli.errorCode);
});
