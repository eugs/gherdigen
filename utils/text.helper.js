const NAME_REGEX = /^(Scenario|Scenario Outline)(\s*|\t*)?\:(\s*|\t*)?/gim;


function cleanUpName(name) {
	name = name.trim();
	name = name.replace(NAME_REGEX, '');
	return name;
}

module.exports = {
	cleanUpName
}