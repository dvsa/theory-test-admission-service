/* eslint global-require: 0 */

function isProduction() {
	return process.env.RUNNING_LOCALLY !== 'true';
}

if (isProduction()) {
	module.exports = require('./src/cloudwatch-logger');
} else {
	module.exports = require('./src/console-logger');
}
