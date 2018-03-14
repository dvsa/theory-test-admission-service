const BookingData = require('./bookings');


class GetBookingService {

	/**
     * @param drivingLicenceNumber {string}
	 * @param receivedDate {date}
     * @returns {boolean}
     */
	static getBooking(drivingLicenceNumber, date, callback) {
		const { bookings } = BookingData;
		let i = 0;
		while (i < bookings.length) {
			if (drivingLicenceNumber === bookings[i].dln) {
				callback([bookings[i]]);
			}
			i += 1;
		}
	}
}
module.exports = GetBookingService;
