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

logger.flush = function () {
};

module.exports = logger;
