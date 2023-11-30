
const shortHash = require('short-hash');
const { getConfig } = require('./fs.helper');
const { cleanUpName } = require('./text.helper');

function generateHashFor(inputString) {
	let productCode = '';
	const config = getConfig();

	if(config.productCode !== undefined) {
		productCode = config.productCode;
		console.log(`got prefix from config: '${productCode}'`);
	} else if (process.env.CODE) {
		productCode = process.env.CODE;
		console.log(`got prefix from ENV: '${productCode}'`);
	} else {
		console.log('no preffix applied');
	}

	const currentMs = new Date();
	const combinedString = `${productCode}${inputString}${currentMs}`;
	const hash = shortHash(combinedString);
	return `@${productCode}${hash}`;
}

function generateID(name) {
	console.log(`given string: '${name}'`);

	name = cleanUpName(name);
	const generatedID = generateHashFor(name);

	// console.log(`\nGiven scenario:\n"${name}"`);
	console.log(`====`);
	console.log(`ID:\n${generatedID}`);
	console.log(`====`);
	return generatedID;
}

module.exports = {
	generateID
}