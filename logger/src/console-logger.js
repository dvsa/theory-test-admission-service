/**
 * This is the entry point to create the local logger.
 */
const winston = require('winston');
const wcf = require('winston-console-formatter');

const { formatter, timestamp } = wcf();

const logger = new winston.Logger({
	level: process.env.LOG_LEVEL || 'info',
});

logger.add(winston.transports.Console, {
	formatter,
	timestamp
});

logger.flush = function flush() {
};

module.exports = logger;
