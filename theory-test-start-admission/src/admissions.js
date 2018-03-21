const DAO = require('theory-test-admission-dao');

class Admissions {

	/**
	 * This method takes the following params to create the admission page.
	 * @param drivingLicenceNumber {string}
	 * @param admissionId {string}
     * @param hasBooking {boolean}
     * @returns Promise<object>
     */
	static start(drivingLicenceNumber, admissionId, hasBooking) {

		return new Promise((resolve, reject) => {
			const admission = DAO.createAdmissionDatabaseRecord({
				DrivingLicenceNumber: drivingLicenceNumber,
				AdmissionId: admissionId,
				HasBooking: hasBooking
			});
			DAO.create(admission, (error, result) => {
				if (!error) {
					resolve({
						HasBooking: result.HasBooking
					});
				} else {
					reject(error);
				}
			});

		});

	}

}

module.exports = Admissions;
