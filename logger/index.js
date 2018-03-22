/**
 * This is the entry point for the logger module, which decides what type of logger to initialize.
 * Note that the environment variable RUNNING_LOCALLY is only required for the local dev and test.
 */

function isProduction() {
	return process.env.RUNNING_LOCALLY !== 'true';
}

if (isProduction()) {
	module.exports = require('./src/cloudwatch-logger');
} else {
	module.exports = require('./src/console-logger');
}
