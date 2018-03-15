const logger = require('../logger');

const mockData = {
	entitlements: {
		dln_id_1: {
			valid: true
		},
		dln_id_2: {
			valid: false
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
	logger.debug('Received event : ', JSON.stringify(event));

	exit(callback(null, mockData.entitlements[event.Request.DrivingLicenceNumber]));

};
