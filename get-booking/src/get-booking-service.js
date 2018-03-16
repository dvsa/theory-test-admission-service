const BookingData = require('./bookings');
const crypto = require('crypto');
const moment = require('moment');

class GetBookingService {

	/**

	 * @param drivingLicenceNumber {string}
	 * @param date {string}
	 * @return {promise}
     */
	static getBooking(resolve, reject, drivingLicenceNumber, date) {

		const { bookings } = BookingData;
		let i = 0;
		while (i < bookings.length) {
			if (drivingLicenceNumber === bookings[i].dln) {
				const booking = {
					Date: moment(Number.parseInt(new Date().getTime(), 10)).format('YYYY-MM-DD'),
					BookingId: crypto.createHash('md5').update(drivingLicenceNumber).digest('hex')
				};
				resolve([booking]);
			}
			i += 1;
		}
		reject([]);
	}
}
module.exports = GetBookingService;
