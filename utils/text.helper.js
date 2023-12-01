const { getFeatureText} =  require('./fs.helper');
const NAME_REGEX = /^(Scenario|Scenario Outline)(\s*|\t*)?\:(\s*|\t*)?/gim;

function cleanUpName(name) {
	name = name.trim();
	name = name.replace(NAME_REGEX, '');
	return name;
}

function insertTagTo(scenarioName, tag, parentFeature) {

	const featureText = getFeatureText(parentFeature);
	const rows = featureText.split('\n');
	const rowsFinal = rows.map((row) => {
		if(row.match(scenarioName)) {
			const match = row.match(/^(\s+|\t+)/);
			const spaces = (match) ? match[0] : '';
			return `${spaces}${tag}\n${row}`;
			
		} else {
			return row;
		}
	});

	const finalText = rowsFinal.join('\n');
	return finalText;
}

module.exports = {
	cleanUpName,
	insertTagTo
}