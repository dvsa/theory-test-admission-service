/* eslint-disable prefer-destructuring */
const logger = require('logger');

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

exports.handler = (event, context, callback) => {

	// log inbound event
	logger.debug('Received event: ', JSON.stringify(event));

	// get values from event
	const AdmissionId = event.Request.AdmissionId;
	const AdmissionData = {
		IsEntitled: event.CompleteAdmissionResult[0].isEntitled,
		ResemblesLicence: event.CompleteAdmissionResult[1][0].ResemblesLicence,
		ResemblesSuspect: event.CompleteAdmissionResult[1][1].suspect_detected,
		LicenceImageThreshold: event.CompleteAdmissionResult[1][0].LicenceImageThreshold
	};
	// TODO: Call the AdmissionDao to update the existing record with the above data.
	logger.debug('AdmissionId : ', AdmissionId);
	logger.debug('admission object : ', JSON.stringify(AdmissionData));
	const response = {
		AdmissionId,
		AdmissionData
	};
	exit(callback, null, response);

};
