const logger = require('logger');

const mockData = {
	images: {
		dln_id_1: {
			bucketName: 'bucket_1',
			key: 'path_to_image_1'
		},
		dln_id_2: {
			bucketName: 'bucket_2',
			key: 'path_to_image_2'
		}
	}
};

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


	// return success
	exit(callback(null, mockData.images[event.Request.DrivingLicenceNumber]));

};
