const DAO = require('theory-test-admission-dao');

class Admissions {

	/**
   * @param drivingLicenceNumber {string}
   * @param admissionId {string}
   * @param hasBooking {boolean}
   * @returns Promise<object>
   */
	static start(drivingLicenceNumber, admissionId, hasBooking) {

		return new Promise((resolve, reject) => {

			// TODO the contract with the DAO is wrong
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
