const logger = require('logger');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

// following values to be replaced by env vars . ej process.env.ADMISSION_BUCKET;
const SOURCE_IMAGE_PATH = process.env.DVLA_IMAGES_ENDPOINT;
const DESTINATION_BUCKET = process.env.ADMISSION_BUCKET;
const DESTINATION_DIRECTORY = process.env.DVLA_LICENCE_IMAGES_DIR;

/**
 * Inform AWS that our Lambda's execution is complete.
 *
 * If error is null, you are declaring that your execution was successful.
 *
 * @param callback {function} The callback originally supplied by AWS
 * @param error {any} The error you wish to supply to AWS, or null
 * @param response {any} The data you wish to return to AWS, or null
 */
function exit(callback, error, response) {
	callback(error, response);
	logger.flush();
}

exports.handler = (event, context, callback) => {
	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	const params = {
		CopySource: `/${SOURCE_IMAGE_PATH}/${event.Request.DrivingLicenceNumber}.jpg`,
		Bucket: DESTINATION_BUCKET,
		Key: `/${DESTINATION_DIRECTORY}/${event.Request.AdmissionId}.jpg`
	};

	logger.debug('params : ', JSON.stringify(params));

	s3.copyObject(params, (err, data) => {
		let result = null;
		if (err) console.log(err, err.stack); // an error occurred
		else {
			console.log(JSON.stringify(data));
			result = {
				Bucket: params.Bucket,
				Key: params.Key
			};
		}
		exit(callback, null, result);
	});
};
