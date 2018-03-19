const logger = require('logger');
const GetBookingService = require('./src/bookings');

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
 *   Request: {
 *     DrivingLicenceNumber: 'XXX',
 *     Date: 'XXX'
 *   }
 * }
 */

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	// invoke business logic
	const { Request } = event;
	const { DrivingLicenceNumber, Date } = Request;

	GetBookingService.getBooking(DrivingLicenceNumber, Date)
		.then((bookings) => {
			exit(callback, null, bookings);
		})
		.catch((error) => {
			exit(callback, error, null);
		});

};
