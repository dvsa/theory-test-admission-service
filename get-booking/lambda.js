const logger = require('logger');
const GetBookingService = require('./src/get-booking-service');

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

	// invoke business logic
	const { Request } = event;
	const { DrivingLicenceNumber, Date } = Request;

	new Promise((r, j) => {
		GetBookingService.getBooking(r, j, DrivingLicenceNumber);
	}).then((result) => {
		exit(callback, null, result); // found booking
	}).catch((result) => {
		exit(callback, null, result); // no booking found
	});
};
