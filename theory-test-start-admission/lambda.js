require('dotenv').config();

const AdmissionDAO = require('theory-test-admission-dao');
const logger = require('logger');

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));
	logger.info('Running start admission');
	let response;
	console.log('Result is: ', event);
	if (event.DrivingLicenceNumber && event.AdmissionId) {
		console.log('Executing lambda');
		const parameters = {
			DrivingLicenceNumber: event.DrivingLicenceNumber,
			HasBooking: event.HasBooking,
			AdmissionId: event.AdmissionId
		};

		const admission = AdmissionDAO.createAdmissionDatabaseRecord(parameters);
		AdmissionDAO.create(admission, (err, retVal) => {
			if (!err) {
				response = {
					AdmissionId: retVal.AdmissionId,
					valid: true,
					HasBooking: retVal.HasBooking
				};
				exit(callback, null, response);
			}
		});
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
