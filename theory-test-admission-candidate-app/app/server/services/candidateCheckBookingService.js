const AWS = require('aws-sdk');

export default class CandidateCheckBookingService {

	checkCandidateBooking() {
		const bookingStepFunction = new AWS.StepFunctions();
		const params = {
			stateMachineArn: process.env.SFN_START_CANDIDATE_ADMISSION_ARN,
			input: { DrivingLicenceNumber: this.candidateDLN, AdmissionId: this.admissionID, ReceivedDate: new Date() }
		};
		bookingStepFunction.startExecution(params, (err, data) => {
			if (err) {
				return false; // an error occurred
			}
			return data.HasBooking; // successful response
		});

	}
}
