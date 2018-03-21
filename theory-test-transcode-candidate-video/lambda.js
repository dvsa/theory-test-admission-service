const logger = require('logger');
const Transcoder = require('./src/transcoder');

const INPUT_DIRECTORY = process.env.CANDIDATE_WEBM_VIDEO_DIR;
const OUTPUT_DIRECTORY = process.env.CANDIDATE_MPEG4_VIDEO_DIR;

const INPUT_EXTENSION = 'webm';
const OUTPUT_EXTENSION = 'mp4';

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

/*
 * Expected structure of event:
 *
 * {
 *   AdmissionId: 'xxx'
 * }
 */

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	const input = `${INPUT_DIRECTORY}/${event.AdmissionId}.${INPUT_EXTENSION}`;
	const output = `${OUTPUT_DIRECTORY}/${event.AdmissionId}.${OUTPUT_EXTENSION}`;

	new Transcoder().transcode(input, output)
		.then(() => {
			exit(callback, null, null); // success
		})
		.catch((error) => {
			exit(callback, error, null);
		});

};
