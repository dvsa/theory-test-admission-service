const logger = require('logger');

const BookingService = require('./src/booking-service');

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

	const { Data, Request } = event;
	const bookingService = new BookingService();
	bookingService.bookings = Data;
	const Result = {
		AdmissionId: Request.AdmissionId,
		DrivingLicenceNumber: Request.DrivingLicenceNumber,
		HasBooking: bookingService.verifyBooking()
	};
	exit(callback, null, Result);

};
