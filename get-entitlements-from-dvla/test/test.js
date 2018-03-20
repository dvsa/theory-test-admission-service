const assert = require('assert');
const Entitlements = require('../src/entitlements');

describe('GetEntitlements Service Tests', () => {

	it('returns true when a valid(Has entitlements) driving licence number is provided', (done) => {
		Entitlements.getEntitlementsFor('AAAAA000000AA0AA')
			.then((result) => {
				assert.equal(result.HasEntitlements, true);
				done();
			})
			.catch((error) => { done(error); });

	});

	it('returns false when an invalid(No entitlements) driving licence number is provided', (done) => {
		Entitlements.getEntitlementsFor('000000')
			.then((result) => {
				assert.equal(result.HasEntitlements, false);
				done();
			})
			.catch((error) => { done(error); });

	});

});
