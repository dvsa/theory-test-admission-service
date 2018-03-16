const AdmissionDAO = require('theory-test-admission-dao');
const logger = require('logger');

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));
	const { DrivingLicenceNumber, AdmissionId, HasBooking } = event;
	const parameters = {
		DrivingLicenceNumber,
		HasBooking,
		AdmissionId
	};

	const admission = AdmissionDAO.createAdmissionDatabaseRecord(parameters);
	AdmissionDAO.create(admission, (err, retVal) => {
		if (!err) {
			const response = {
				AdmissionId: retVal.AdmissionId,
				HasBooking: retVal.HasBooking
			};
			exit(callback, null, response);
		} else {
			logger.error('The following error occurred when trying to create a new admission record: ', err);
			exit(callback, err, null);
		}
	});
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
