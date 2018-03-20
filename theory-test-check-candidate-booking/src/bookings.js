class Bookings {

	/**
   * @param bookings {object[]}
   * @returns {boolean}
   */
	static hasBooking(bookings) {
		return bookings.length === 1;
	}

}

module.exports = Bookings;
