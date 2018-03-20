const logger = require('logger');
const Entitlements = require('./src/entitlements');

/**
 * Inform AWS that our Lambda's execution is complete.
 *
 * If error is null, you are declaring that your execution was successful.
 *
 * @param callback {function} The callback originally supplied by AWS
 * @param error {any} The error you wish to supply to AWS, or null
 * @param response {any} The data you wish to return to AWS, or null
 */
function exit(callback, error, response) {
	callback(error, response);
	logger.flush();
}

/*
 * Expected structure of event:
 *
 * {
 *   Request: {
 *     		DrivingLicenceNumberMD5: 'XXX',
 *     		HasEntitlements: false
 *     }
 * }
 */

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	const EntitlementData = event;
	const result = {
		isEntitled: Entitlements.checkValidEntitlementsFor(EntitlementData)
	};
	exit(callback, null, result);
};
