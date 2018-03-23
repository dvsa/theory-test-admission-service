const AdmissionDAO = require('theory-test-admission-dao');

class Admissions {

	/**
   * @param drivingLicenceNumber {string}
   * @param admissionId {string}
   * @param hasBooking {boolean}
   * @returns Promise<object>
   */


	static start(drivingLicenceNumber, admissionId, hasBooking) {

		return new Promise((resolve, reject) => {
			const admissionDAO = new AdmissionDAO();
			admissionDAO.createAdmission({
				DrivingLicenceNumber: drivingLicenceNumber,
				AdmissionId: admissionId,
				HasBooking: hasBooking
			}, (error, result) => {
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
