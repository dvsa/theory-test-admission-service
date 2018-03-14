const assert = require('assert');
const GetBookingService = require('../src/get-booking-service');

describe('GetBooking Service Tests', () => {
	const getBookingService = new GetBookingService();

	it('returns a booking when a valid driving licence number is provided', () => {
		getBookingService.drivingLicenceNumber = '32519228';
		const data = getBookingService.getBooking();
		assert.equal(true, (data.length === 1));
	});

	it('returns no bookings when a invalid driving licence number is provided', () => {
		getBookingService.drivingLicenceNumber = '00000000';
		const data = getBookingService.getBooking();
		assert.equal(true, data.length === 0);
	});

});
