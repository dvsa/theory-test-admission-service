const AWS = require('aws-sdk');
const logger = require('logger');

export default class CandidateCheckBookingService {

	checkCandidateBooking() {
		const bookingStepFunction = new AWS.StepFunctions();
		const params = {
			stateMachineArn: process.env.SFN_START_CANDIDATE_ADMISSION_ARN,
			input: { Request: { DrivingLicenceNumber: this.candidateDLN, AdmissionId: this.admissionID, Date: new Date() } }
		};
		bookingStepFunction.startExecution(params, (err, data) => {
			if (err) {
				logger.error(err);
				return false; // an error occurred
			}
			logger.info(data);
			return data.HasBooking; // successful response
		});

	}
}
