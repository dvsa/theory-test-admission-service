const AWS = require('aws-sdk');

AWS.config.update({
	accessKeyId: process.env.FTTS_ACCESS_KEY_ID,
	secretAccessKey: process.env.FTTS_SECRET_ACCESS_KEY,
	region: process.env.FTTS_REGION
});

module.exports = AWS;
