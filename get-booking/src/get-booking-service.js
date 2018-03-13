const VALID_BOOKING = [{
	bookingId: 'AABBCC1234567',
	dln: '32519228',
	bookingDate: '14/03/18'
}, {
	bookingId: 'AABBCC1234564',
	dln: '32519227',
	bookingDate: '15/03/18'
}, {
	bookingId: 'AABBCC1234566',
	dln: '32519226',
	bookingDate: '16/03/18'
}];

class GetBookingService {

	/**
     * @param drivingLicenceNumber {string}
	 * @param receivedDate {date}
     * @returns {boolean}
     */
	getBooking() {
		const { drivingLicenceNumber } = this;
		let i = 0;
		while (i < VALID_BOOKING.length) {
			if (drivingLicenceNumber === VALID_BOOKING[i].dln) {
				return [VALID_BOOKING[i]];
			}
			i += 1;
		}
		return [];
	}
}
module.exports = GetBookingService;
