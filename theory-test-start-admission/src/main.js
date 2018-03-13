require('dotenv').config();

const AdmissionDAO = require('theory-test-admission-dao');
const logger = require('logger');

exports.handler = function (event, context, callback) {
	logger.info('Running start admission');
	let response;
	if (event.drivingLicenceNumber && event.hasBooking && event.admissionId) {
		const parameters = {
			drivingLicenceNumber: event.drivingLicenceNumber,
			hasBooking: event.hasBooking,
			admissionId: event.admissionId
		};

		const admission = AdmissionDAO.createNewAdmissionRecord(parameters);
		AdmissionDAO.save(admission, (err, retVal) => {
			if (!err) {
				response = {
					admissionId: retVal.admissionId,
					valid: true
				};
				callback(null, response);
			}
		});
	}
};

