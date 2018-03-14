const assert = require('assert');
const GetBookingService = require('../src/get-booking-service');

describe('GetBooking Service Tests', () => {

	it('returns a booking when a valid driving licence number is provided', () => {
		const data = GetBookingService.getBooking('32519228');
		assert.equal(true, (data.length === 1));
	});

	it('returns no bookings when a invalid driving licence number is provided', () => {
		const data = GetBookingService.getBooking('00000000');
		assert.equal(true, data.length === 0);
	});

});
