const assert = require('assert');
const Bookings = require('../src/bookings');

describe('GetBooking Service Tests', () => {

	it('returns one booking when a valid driving licence number is provided', (done) => {
		Bookings.getBooking('AAAAA000000AA0AA', '2000-01-01')
			.then((result) => {
				assert.equal(result.length, 1);
				assert.equal(result[0].Date, '2000-01-01');
				done();
			})
			.catch((error) => { done(error); });

	});

	it('returns zero bookings when an invalid driving licence number is provided', (done) => {
		Bookings.getBooking('00000000', '2000-01-01')
			.then((result) => {
				assert.equal(result.length, 0);
				done();
			})
			.catch((error) => { done(error); });
	});

});
