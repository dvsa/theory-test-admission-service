const validDrivingLicenceNumbers = require('./entitlements.json');
const crypto = require('crypto');

class Entitlements {

	/**
	 * @param drivingLicenceNumber {string}
	 * @return {Promise<object[]>}
	 */
	static getEntitlementsFor(drivingLicenceNumber) {

		// In this stub implementation, if the specified DLN is present in our JSON,
		// assume the candidate has valid entitlements.

		const result = {
			HasEntitlements: false,
			DrivingLicenceNumberMD5: this.createMD5For(drivingLicenceNumber)
		};

		validDrivingLicenceNumbers.forEach((validDrivingLicenceNumber) => {
			if (drivingLicenceNumber === validDrivingLicenceNumber) {
				result.HasEntitlements = true;
			}
		});

		return new Promise((resolve) => {
			resolve(result);
		});

	}
	static createMD5For(drivingLicenceNumber) {
		return crypto.createHash('md5').update(drivingLicenceNumber).digest('hex');
	}
}

module.exports = Entitlements;
