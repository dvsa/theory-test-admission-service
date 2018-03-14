require('dotenv').config();

const AdmissionDAO = require('theory-test-admission-dao');
const logger = require('logger');

exports.handler = function (event, context, callback) {
	logger.info('Running start admission');
	let response;
	if (event.DrivingLicenceNumber && event.AdmissionId) {
		const parameters = {
			DrivingLicenceNumber: event.DrivingLicenceNumber,
			HasBooking: event.HasBooking,
			AdmissionId: event.AdmissionId
		};

		const admission = AdmissionDAO.createNewAdmissionRecord(parameters);
		AdmissionDAO.create(admission, (err, retVal) => {
			if (!err) {
				response = {
					AdmissionId: retVal.AdmissionId,
					valid: true,
					HasBooking: event.HasBooking
				};
				callback(null, response);
			}
		});
	}
};

