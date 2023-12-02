
const path = require('path');

const { scanDir, getFeatureText, saveFeatureText, getConfig } = require('./utils/fs.helper');
const { insertTagTo } = require('./utils/text.helper');
const { generateID } = require('./utils/generator');
const { EMPTY_SCENARIO, SCAN_FAILED, NO_FEATURES, INVALID_SCENARIOS_NUM } = require('./utils/colors/errors.map');
const { UPDATE_MSG, STATUS_MSG, STATUS_ARG_MSG, TAG_ADDED }  = require('./utils/colors/messages.map');
const config = getConfig();

const FEATURES_DIR = config['featuresDir'] || './features';
const FEATURES_PATH = path.resolve(__dirname, FEATURES_DIR);
Error.stackTraceLimit = 0;

function updateScenario(scenarioName) {
	if (!scenarioName) return console.log(EMPTY_SCENARIO(scenarioName));

	const features = [];

	try {
		features.push(...scanDir(FEATURES_PATH));
	} catch (err) {
		console.log(SCAN_FAILED(FEATURES_PATH));
	}

	if (features.length === 0) {
		console.log(NO_FEATURES(FEATURES_PATH));
		return 1;
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
		// throw new Error(`Found ${parentFeature.length} scenarios with name "${scenarioName}" in ${FEATURES_PATH}`);
		console.log(INVALID_SCENARIOS_NUM(parentFeature.length, scenarioName, FEATURES_PATH));
		return 1;
	}

	const tag = generateID(scenarioName);
	console.log(UPDATE_MSG(parentFeature[0]));

	try {
		const updatedText = insertTagTo(scenarioName, tag, parentFeature[0]);
		saveFeatureText(parentFeature[0], updatedText);
	} catch (err) {
		console.error(`scenario wasn't updated, some error occured\n${err.message}`);
	}


	console.log(STATUS_ARG_MSG('', 'SUCCESS!'));
	console.log(TAG_ADDED(tag, scenarioName));
}

module.exports = {
	updateScenario
}