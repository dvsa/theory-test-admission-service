const Admissions = require('./src/admissions');
const logger = require('logger');

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

	/*
	 * Expected structure of event:
	 * {
	 *   DrivingLicenceNumber: 'XXX',
	 *   AdmissionId: 'XXX',
	 *   HasBooking: true
	 * }
	 */

	Admissions.start(event.DrivingLicenceNumber, event.AdmissionId, event.HasBooking)
		.then((result) => { exit(callback, null, result); })
		.catch((error) => { exit(callback, error, null); });

};

