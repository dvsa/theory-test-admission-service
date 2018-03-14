const data = require('./bookings');


class GetBookingService {
	constructor() {
		this.bookings = data.bookings;
	}
	/**
     * @param drivingLicenceNumber {string}
	 * @param receivedDate {date}
     * @returns {boolean}
     */
	getBooking() {
		const { drivingLicenceNumber } = this;
		let i = 0;
		while (i < this.bookings.length) {
			if (drivingLicenceNumber === this.bookings[i].dln) {
				return [this.bookings[i]];
			}
			i += 1;
		}
		return [];
	}
}
module.exports = GetBookingService;
