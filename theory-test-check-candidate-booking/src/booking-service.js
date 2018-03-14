class BookingService {

	/**
     * @param bookings {array}
     * @returns {boolean}
     */

	static verifyBooking(bookings) {
		if (bookings.length === 1) {
			return true;
		}
		return false;
	}

}

module.exports = BookingService;
