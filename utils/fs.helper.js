const fsx = require('fs-extra');
const fs = require('fs');
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

// TODO refactor
function scanDir(featuresDir) {
		const files = [];
	
		const traverse = (dir) => {
			const dirEntries = fs.readdirSync(dir, { withFileTypes: true });
	
			for (const dirEntry of dirEntries) {
				const fullPath = path.join(dir, dirEntry.name);
	
				if (dirEntry.isDirectory()) {
					traverse(fullPath);
				} else if (dirEntry.isFile() && path.extname(dirEntry.name) === '.feature') {
					files.push(fullPath);
				}
			}
		};
	
		traverse(featuresDir);
	
		return files;
}

function getFeatureText(path) {
	return fsx.readFileSync(path, 'utf8');
}

module.exports = {
	saveToConfig,
	getConfig,
	scanDir,
	getFeatureText
}