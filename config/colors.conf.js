const clc = require('cli-color');

const error = clc.whiteBright.bold.bgRed;
const red = clc.redBright;
const warn = clc.yellow;
const notice = clc.blue;
const yellowBg = clc.bgYellow;
const yellowBright = clc.yellowBright;
const green = clc.greenBright;

module.exports = {
	red,
	warn,
	green,
	error,
	notice,
	yellowBg,
	yellowBright
}
