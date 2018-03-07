/**
 * Single place for setting up logging levels.
 */
import winston from 'winston';
import wcf from 'winston-console-formatter';

const { formatter, timestamp } = wcf();

const logger = new winston.Logger({
	level: 'debug',
});

logger.add(winston.transports.Console, { formatter, timestamp });

module.exports = logger;
