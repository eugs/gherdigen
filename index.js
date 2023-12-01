#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');

const { saveToConfig } = require('./utils/fs.helper');
const { generateID } = require('./utils/generator');
const { promptCode, promptName, promptDir } = require('./prompts');
const { updateScenario } = require('./main');

yargs
	.command({
		command: 'code',
		alias: 'code',
		describe: 'Set product code as prefix (if required)',
		builder: {
		},
		handler: async function (argv) {
			const code = await promptCode();
			saveToConfig('productCode', code);
		}
	})

	.command({
		command: 'dir',
		alias: 'dir',
		describe: 'Set up features directory (required)',
		builder: {
		},
		handler: async function (argv) {
			const dir = await promptDir();
			const fullPath = path.resolve(process.cwd(), dir);
			saveToConfig('featuresDir', fullPath);
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
