class BookingService {

	/**
     * @param bookings {array}
     * @returns {boolean}
     */

	verifyBooking() {
		const { bookings } = this;
		if (bookings.length === 1) {
			return true;
		}
		return false;
	}

}

module.exports = BookingService;
