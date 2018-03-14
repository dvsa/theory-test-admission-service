const assert = require('assert');
const GetBookingService = require('../src/get-booking-service');

describe('GetBooking Service Tests', () => {

	it('returns a booking when a valid driving licence number is provided', () => {
		GetBookingService.getBooking('32519228', '', (response) => {
			assert.equal(true, (response.length === 1));
		});

	});

	it('returns no bookings when a invalid driving licence number is provided', () => {
		GetBookingService.getBooking('00000000', '', (response) => {
			assert.equal(true, (response.length === 0));
		});

	});

});
