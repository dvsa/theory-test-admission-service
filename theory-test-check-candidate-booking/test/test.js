const assert = require('assert');
const BookingService = require('../src/booking-service');

describe('Booking Service Tests', () => {
	const bookingService = new BookingService();

	it('returns true when one booking is received from get-booking lambda', () => {
		bookingService.bookings = [1];
		assert.equal(true, bookingService.verifyBooking());
	});

	it('returns false when more than one booking is received from get-booking lambda', () => {
		bookingService.bookings = [1, 2, 3];
		assert.equal(false, bookingService.verifyBooking());
	});

	it('returns false when no bookings are received from get-booking lambda', () => {
		bookingService.bookings = [];
		assert.equal(false, bookingService.verifyBooking());
	});

});
