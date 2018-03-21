/**
 * This is the entry point to create the CloudWatch logger.
 */
const winston = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

const logger = new winston.Logger({
	level: process.env.LOG_LEVEL || 'info',
});

logger.add(CloudWatchTransport, {
	logGroupName: process.env.LOG_GROUP_NAME,
	logStreamName: process.env.LOG_STREAM_NAME,
	retentionInDays: process.env.LOG_RETENTION_DAYS,
	uploadRate: 1000
});

logger.flush = function flush() {
	logger.transports.CloudWatch.kthxbye(() => {
	});
};

module.exports = logger;
