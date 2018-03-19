const validDrivingLicenceNumbers = require('./bookings.json');
const crypto = require('crypto');

class Bookings {

	/**
   * @param drivingLicenceNumber {string}
   * @param date {string}
   * @return {Promise<object[]>}
   */
	static getBooking(drivingLicenceNumber, date) {

		// In this stub implementation, if the specified DLN is present in our JSON,
		// assume the candidate has a booking for the specified date.

		const result = [];

		validDrivingLicenceNumbers.forEach((validDrivingLicenceNumber) => {
			if (drivingLicenceNumber === validDrivingLicenceNumber) {
				result.push({
					Date: date,
					BookingId: Bookings.createBookingIdFor(drivingLicenceNumber)
				});
			}
		});

		return new Promise((resolve) => {
			resolve(result);
		});

	}

	// In this stub implementation, we want booking ids to be consistent,
	// i.e. each time we retrieve a booking for a specified DLN, it should have the same booking id.

	static createBookingIdFor(drivingLicenceNumber) {
		return crypto.createHash('md5').update(drivingLicenceNumber).digest('hex');
	}

}

module.exports = Bookings;
