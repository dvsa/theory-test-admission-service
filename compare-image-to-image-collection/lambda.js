const logger = require('logger');

const ImageService = require('./src/imageService');

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
 *   ImageDetails: {
 *     BucketName: 'XXX',
 *     Key: 'XXX'
 *   }
 * }
 */

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	const { ImageDetails } = event;
	const { BucketName, Key } = ImageDetails;

	ImageService.compareImage(BucketName, Key)
		.then((result) => {
			exit(callback, null, result);
		})
		.catch((error) => {
			exit(callback, error, null);
		});

};
