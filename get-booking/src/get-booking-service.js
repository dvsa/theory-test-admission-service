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
			console.log('Carrying out loop at index: ', bookings[i].dln);
			if (drivingLicenceNumber === bookings[i].dln) {
				console.log('Found booking');
				callback([bookings[i]]);
				break;
			}
			i += 1;
		}
	}
}
module.exports = GetBookingService;
