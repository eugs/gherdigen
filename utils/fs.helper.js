const fsx = require('fs-extra');
const path = require('path');

const CONFIG_PATH = path.resolve(__dirname, 'config.json');

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

module.exports = {
	saveToConfig,
	getConfig
}