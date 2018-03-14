const BookingData = require('./bookings');


class GetBookingService {

	/**
     * @param drivingLicenceNumber {string}
	 * @param receivedDate {date}
     * @returns {boolean}
     */
	static getBooking(DrivingLicenceNumber, Date) {
		const { bookings } = BookingData;
		console.log(bookings);
		let i = 0;
		while (i < bookings.length) {
			if (DrivingLicenceNumber === bookings[i].dln) {
				return [bookings[i]];
			}
			i += 1;
		}
		return [];
	}
}
module.exports = GetBookingService;
