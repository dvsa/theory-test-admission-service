class Entitlements {

	/**
	 * @param bookings {object[]}
	 * @returns {boolean}
	 */
	static checkValidEntitlementsFor(entitlement) {
		return entitlement.HasEntitlements;
	}

}

module.exports = Entitlements;
