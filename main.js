
const path = require('path');

const { scanDir, getFeatureText } = require('./utils/fs.helper');
const FEATURES_DIR = './features';
const FEATURES_PATH = path.resolve(__dirname, FEATURES_DIR);

function updateScenario(scenarioName) {
	if (!scenarioName) throw new Error(`Expected scenario name but got '${scenarioName}'`);
	const features = [];

	try {
		features.push(...scanDir(FEATURES_PATH));
	} catch (err) {
		// TODO msg
	}

	if (features.length === 0) {
		throw new Error(`Haven't found any features in ${FEATURES_PATH}`);
	}

	const filtered = [];
	
	features.forEach((feature) => {
		const text = getFeatureText(feature);
		const regex = new RegExp(scenarioName, 'gim')
		const match = text.match(regex);
		if (match) {
			for(let i = 0; i < match.length; i++) {
				filtered.push(feature);
			}
		}
	});

	if (filtered.length !== 1) {
		throw new Error(`Found ${filtered.length} scenarios with name "${scenarioName}" in ${FEATURES_PATH}`);
	}

		// generateID

		// updateScenario

}

module.exports = {
	updateScenario
}