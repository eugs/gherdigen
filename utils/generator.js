
const shortHash = require('short-hash');
const { getConfig } = require('./fs.helper');
const { cleanUpName } = require('./text.helper');
const { STATUS_MSG, STATUS_ARG_MSG }  = require('../utils/colors/messages.map');


function generateHashFor(inputString) {
	let productCode = '';
	const config = getConfig();

	if(config.productCode !== undefined) {
		productCode = config.productCode;
		console.log(STATUS_ARG_MSG('prefix from config: ', productCode));
	} else if (process.env.CODE) {
		productCode = process.env.CODE;
		console.log(STATUS_ARG_MSG('prefix from ENV: ', productCode));
	} else {
		console.log(STATUS_MSG('no preffix applied'));
	}

	const currentMs = new Date();
	const combinedString = `${productCode}${inputString}${currentMs}`;
	const hash = shortHash(combinedString);
	return `@${productCode}${hash}`;
}

function generateID(name) {
	// console.log(STATUS_ARG_MSG('generating id from given string: ', name));

	name = cleanUpName(name);
	const generatedID = generateHashFor(name);
	console.log(STATUS_ARG_MSG('ID: ', generatedID));
	return generatedID;
}

module.exports = {
	generateID
}