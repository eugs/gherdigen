#!/usr/bin/env node
const yargs = require('yargs');

const { saveToConfig } = require('./utils/fs.helper');
const { generateID } = require('./utils/generator');
const { promptCode, promptName } = require('./prompts');
const { updateScenario } = require('./main');

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
			updateScenario(name);
		}
	})

yargs.parse();
