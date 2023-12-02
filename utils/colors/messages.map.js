const { red: r, error: err, warn: wrn, notice: nt, yellowBright: yl, yellowBg: yB, green: g } = require('../../config/colors.conf');
const ST = nt('status: ');

module.exports = {
	'UPDATE_MSG': (path)=> `${ST}${wrn('trying to update in file:')} "${yl(path)}"`,
	'STATUS_MSG': (msg)=> `${ST}${wrn(msg)}`,
	'STATUS_ARG_MSG': (msg, arg)=> `${ST}${wrn(msg)}${yl(arg)}`,
	'TAG_ADDED': (tag, name) => ST + `${wrn('added tag')} ${g(tag)} ${wrn('to:')} "${g(name)}"`,
}