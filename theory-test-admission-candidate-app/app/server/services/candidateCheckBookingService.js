const AWS = require('aws-sdk');
const moment = require('moment');
const logger = require('logger');

const bookingStepFunction = new AWS.StepFunctions();

export default class CandidateCheckBookingService {

	static checkCandidateBooking(admissionId, candidateDLN, callback) {

		logger.info('Check candidate booking executed');
		const currentDate = moment(Number.parseInt(new Date().getTime(), 10)).toISOString(true);

		const dln = `"DrivingLicenceNumber": "${candidateDLN}"`;
		const aId = `"AdmissionId": "${admissionId}"`;
		const date = `"Date": "${currentDate}"`;
		const completeInput = `{ "Request": {${dln}, ${aId}, ${date}} }`;

		const params = {
			stateMachineArn: process.env.SFN_START_CANDIDATE_ADMISSION_ARN,
			input: completeInput
		};
		this.doStartExecution(params, (response) => {
			logger.info('Start execution executed and returned: ', response);
			const descParams = {
				executionArn: response.executionArn,
			};

			new Promise((r, j) => {
				this.doDescribeExecution(r, j, descParams);
			}).then((result) => {
				const jsonResponse = JSON.parse(result.output);
				return callback(jsonResponse.HasBooking);
			});

		});
	}
	static doStartExecution(params, callback) {
		bookingStepFunction.startExecution(params, (error, data) => {
			if (error) {
				logger.error('Start execution failed with the following error: ', error);
			}
			logger.info('Start execution succeeded with the following response: ', data);
			return callback(data);
		});
	}
	static doDescribeExecution(resolve, reject, params) {
		bookingStepFunction.describeExecution(params, (error, response) => {
			if (error) {
				reject(error); // reject the promise
			} else if (response.status !== 'SUCCEEDED') {
				this.doDescribeExecution(resolve, null, params); // Try again
			} else {
				resolve(response); // Resolve the promise, pass the result.
			}
		});
	}
}
