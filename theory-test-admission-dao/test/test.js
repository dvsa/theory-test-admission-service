const assert = require('assert');
const Bookings = require('../src/bookings');

describe('Check Candidate Booking', () => {

	it('returns true when one booking is received from get-booking', () => {
		assert.equal(Bookings.hasBooking([1]), true);
	});

	it('returns false when more than one booking is received from get-booking', () => {
		assert.equal(Bookings.hasBooking([1, 2, 3]), false);
	});

	it('returns false when zero bookings are received from get-booking', () => {
		assert.equal(Bookings.hasBooking([]), false);
	});

});
