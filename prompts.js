const yargsInteractive = require('yargs-interactive');

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

async function promptDir() {
	const options = {
		dir: {
			type: "input",
			describe: "Enter path to features directory (e.g. ./features)"
		},
		interactive: {
			default: true
		}
	};

	const result = await yargsInteractive().usage("$0 <command> [args]").interactive(options)
	return result['dir'];
}

module.exports = {
	promptCode,
	promptName,
	promptDir
}