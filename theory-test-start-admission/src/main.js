require('dotenv').config();

const AdmissionDAO = require('theory-test-admission-dao');
const logger = require('logger');

exports.handler = function (event, context, callback) {
	logger.info('Running start admission');
	let response;
	const { Result } = event;
	if (Result.DrivingLicenceNumber && Result.AdmissionId) {
		const parameters = {
			DrivingLicenceNumber: Result.DrivingLicenceNumber,
			HasBooking: Result.HasBooking,
			AdmissionId: Result.AdmissionId
		};

		const admission = AdmissionDAO.createNewAdmissionRecord(parameters);
		AdmissionDAO.create(admission, (err, retVal) => {
			if (!err) {
				response = {
					AdmissionId: retVal.AdmissionId,
					valid: true,
					HasBooking: Result.HasBooking
				};
				callback(null, response);
			}
		});
	}
};

