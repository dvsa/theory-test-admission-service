const assert = require('assert');
const Entitlements = require('../src/entitlements');

describe('Check Candidate Entitlements Test', () => {

	it('returns true when entitlement data with valid entitlements', () => {
		const validEntitlement = {
			HasEntitlements: true,
		};
		assert.equal(Entitlements.checkValidEntitlementsFor(validEntitlement), true);
	});

	it('returns false when entitlement data with invalid entitlements', () => {
		const validEntitlement = {
			HasEntitlements: false,
		};
		assert.equal(Entitlements.checkValidEntitlementsFor(validEntitlement), false);
	});

});
