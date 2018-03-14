const assert = require('assert');
const BookingService = require('../src/booking-service');

describe('Booking Service Tests', () => {

	it('returns true when one booking is received from get-booking lambda', () => {
		assert.equal(true, BookingService.verifyBooking([1]));
	});

	it('returns false when more than one booking is received from get-booking lambda', () => {
		assert.equal(false, BookingService.verifyBooking([1, 2, 3]));
	});

	it('returns false when no bookings are received from get-booking lambda', () => {
		assert.equal(false, BookingService.verifyBooking([]));
	});

});
