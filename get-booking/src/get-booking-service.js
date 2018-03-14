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
			console.log('The Dln is: ', drivingLicenceNumber);
			console.log('Carrying out loop at index: ', bookings[i].dln);
			if (drivingLicenceNumber === bookings[i].dln) {
				console.log('Found booking');
				return callback([bookings[i]]);
			}
			i += 1;
		}
		return callback([]);
	}
}
module.exports = GetBookingService;
