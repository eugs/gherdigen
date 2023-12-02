const { red: r, error: err, warn: wrn, notice: nt, yellowBright: yl } = require('../../config/colors.conf');
const ER = r('---\nError: ');
const ER2 = r('\n---\n');


module.exports = {
	'EMPTY_SCENARIO' : (name)=> `${ER}${err('Expected scenario name but got:')} "${nt(name)}"${ER2}`,
	'SCAN_FAILED': (path) => `${ER}${err('Error while scanning dir:')} "${yl(path)}"${ER2}`,
	'NO_FEATURES': (path) => `${ER}${err('Found no features at:')} "${yl(path)}"${ER2}`,
	'INVALID_SCENARIOS_NUM': (num, name, path) => `${ER}${err('Found')} ${yl(num)} ${err('scenarios with name:')} "${yl(name)}" ${err('in')} "${yl([path])}"${ER2}`,
}