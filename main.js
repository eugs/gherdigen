
const path = require('path');

const { scanDir, getFeatureText, saveFeatureText } = require('./utils/fs.helper');
const { insertTagTo } = require('./utils/text.helper');
const { generateID } = require('./utils/generator');
const FEATURES_DIR = './features';
const FEATURES_PATH = path.resolve(__dirname, FEATURES_DIR);

function updateScenario(scenarioName) {
	if (!scenarioName) throw new Error(`Expected scenario name but got '${scenarioName}'`);
	const features = [];

	try {
		features.push(...scanDir(FEATURES_PATH));
	} catch (err) {
		console.error(`Error while scanning ${FEATURES_PATH}`);
	}

	if (features.length === 0) {
		throw new Error(`Haven't found any features in ${FEATURES_PATH}`);
	}

	const parentFeature = [];

	features.forEach((feature) => {
		const text = getFeatureText(feature);
		const regex = new RegExp(scenarioName, 'gim')
		const match = text.match(regex);
		if (match) {
			for (let i = 0; i < match.length; i++) {
				parentFeature.push(feature);
			}
		}
	});

	if (parentFeature.length !== 1) {
		throw new Error(`Found ${parentFeature.length} scenarios with name "${scenarioName}" in ${FEATURES_PATH}`);
	}

	const tag = generateID(scenarioName);

	console.log(`\n...will try to update in file:\n${FEATURES_PATH}`);

	try {
		const updatedText = insertTagTo(scenarioName, tag, parentFeature[0]);
		saveFeatureText(parentFeature[0], updatedText);
	} catch (err) {
		console.error(`scenario wasn't updated, some error occured\n${err.message}`);
	}

	console.log(`tag ${tag}\nwas successfully added to scenario:\n${scenarioName}`);
}

module.exports = {
	updateScenario
}