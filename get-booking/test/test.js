const assert = require('assert');
const GetBookingService = require('../src/get-booking-service');

describe('GetBooking Service Tests', () => {

	it('returns a booking when a valid driving licence number is provided', () => {
		new Promise((r, j) => {
			GetBookingService.getBooking(r, j, 'AAAAA000000AA0AA');
		}).then((result) => {
			assert.equal(result.length, 1);
		});

	});

	it('returns no bookings when a invalid driving licence number is provided', () => {
		new Promise((r, j) => {
			GetBookingService.getBooking(r, j, '00000000');
		}).then().catch((result) => {
			assert.equal(result.length, 0);
		});
	});

});
