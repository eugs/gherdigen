#!/usr/bin/env node
const yargs = require('yargs');
const yargsInteractive = require('yargs-interactive');

const { saveToConfig } = require('./utils/fs.helper');
const { generateID } = require('./utils/generator');

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
		describe: 'Generate an ID using given scenario name',
		builder: {
		},
		handler: async function (argv) {
			const name = await promptName();
			generateID(name);
		}
	})
	.command({
		command: 'upd', // TODO rename
		describe: 'Update given scenario in file',
		builder: {
		},
		handler: async function (argv) {
			const name = await promptName();
			generateID(name);
		}
	})

yargs.parse();


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

