const logger = require('logger');
const transcode = require('./src/transcode');

const BUCKET = process.env.BUCKET;
const INPUT_DIRECTORY = process.env.CANDIDATE_WEBM_DIRECTORY;
const OUTPUT_DIRECTORY = process.env.CANDIDATE_MPEG4_DIRECTORY;

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

	event.AdmissionId
	// invoke business logic
	const result = main.greeting();

	// return success
	exit(callback, null, result);

};
