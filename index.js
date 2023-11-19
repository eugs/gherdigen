#!/usr/bin/env node
const shortHash = require('short-hash');
const yargs = require('yargs');
const yargsInteractive = require('yargs-interactive');
const fsx = require('fs-extra');

const NAME_REGEX = /^(Scenario|Scenario Outline)(\s*|\t*)?\:(\s*|\t*)?/gim;
const path = require('path');
const CONFIG_PATH = path.resolve(__dirname, 'config.json');

yargs
	.command({
		command: '$0',
		alias: 'start',
		describe: 'Set up required information',
		builder: {
		},
		handler: async function (argv) {
			const code = await promptCode();
			saveToConfig('productCode', code);
		}
	})
	.command({
		command: 'gen',
		alias: 'generate',
		describe: 'Generate an ID using given scenario name',
		builder: {
		},
		handler: async function (argv) {
			const name = await promptName();
			generate(name);
		}
	})

yargs.parse();

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

function generate(name) {
	console.log(`given string: '${name}'`);

	name = cleanUpName(name);
	const generatedID = generateHashFor(name);

	// console.log(`\nGiven scenario:\n"${name}"`);
	console.log(`====`);
	console.log(`ID:\n${generatedID}`);
	console.log(`====`);
	return generatedID;
}

function cleanUpName(name) {
	name = name.trim();
	name = name.replace(NAME_REGEX, '');
	return name;
}

async function promptName() {
	const options = {
		name: {
			type: "input",
			describe: "Enter Scenario name (or leave empty)"
		},
		interactive: {
			default: true
		}
	};

	const result = await yargsInteractive().usage("$0 <command> [args]").interactive(options)
	return result['name']
}

async function promptCode() {
	const options = {
		code: {
			type: "input",
			describe: "Enter Product Code or another prefix (or leave empty)"
		},
		interactive: {
			default: true
		}
	};

	const result = await yargsInteractive().usage("$0 <command> [args]").interactive(options)
	return result['code'];
}

function saveToConfig(key, value) {
	const config = getConfig();
	config[key] = value;
	fsx.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 3));
}

function getConfig() {
	if(!fsx.pathExistsSync(CONFIG_PATH)) {
		fsx.writeJSONSync(CONFIG_PATH, {
			productCode: ''
		});
	}
	return require(CONFIG_PATH);
}