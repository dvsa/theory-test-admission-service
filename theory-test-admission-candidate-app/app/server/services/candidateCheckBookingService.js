const AWS = require('aws-sdk');
const moment = require('moment');
const logger = require('logger');

const bookingStepFunction = new AWS.StepFunctions();
const POLLING_INTERVAL = 500; // msec

export default class CandidateCheckBookingService {

	static retrieveCandidateBooking(admissionId, candidateDLN, callback) {

		logger.info('Check candidate booking executed');
		const currentDate = this.today();
		const dln = `"DrivingLicenceNumber": "${candidateDLN}"`;
		const aId = `"AdmissionId": "${admissionId}"`;
		const date = `"Date": "${currentDate}"`;
		const completeInput = `{ "Request": {${dln}, ${aId}, ${date}} }`;

		const params = {
			stateMachineArn: process.env.SFN_START_CANDIDATE_ADMISSION_ARN,
			input: completeInput
		};
		this.doStartExecution(params, (error, response) => {
			if (!error) {
				logger.info('Start execution executed and returned: ', response);
				const descParams = {
					executionArn: response.executionArn,
				};

				new Promise((r, j) => {
					this.getExecutionOutput(r, j, descParams);
				}).then((result) => {
					if (result.status === 'SUCCEEDED') {
						const jsonResponse = JSON.parse(result.output);
						return callback(jsonResponse.HasBooking);
					}
					return callback(false); // step function failed
				}).catch((err) => {
					logger.error('The following error occurred polling for a response: ', err);
					return callback(false);
				});
			}
			return callback(false); // Start execution failed, return no booking
		});
	}
	static doStartExecution(params, callback) {
		bookingStepFunction.startExecution(params, (error, data) => {
			if (error) {
				logger.error('Start execution failed with the following error: ', error);
				return callback(error);
			}
			logger.info('Start execution succeeded with the following response: ', data);
			return callback(null, data);
		});
	}
	/**
	 * @returns {string} ISO-8601 date component
	 */
	static today() {
		return moment().format('YYYY-MM-DD');
	}
	static sleep() {
		return new Promise((resolve) => { setTimeout(resolve, POLLING_INTERVAL); });
	}
	static getExecutionOutput(resolve, reject, params) {
		bookingStepFunction.describeExecution(params, (error, response) => {
			if (error) {
				logger.error('Describe execution failed with the following error: ', error);
				reject(error); // reject the promise
			} else if (response.status === 'RUNNING') {
				logger.info('Describe execution succeeded with the following response: ', response.status);
				this.sleep().then(this.doDescribeExecution(resolve, null, params)); // Try again
			} else {
				logger.info('Describe execution finished with the following response: ', response.status);
				resolve(response); // Resolve the promise, pass the result.
			}
		});
	}
}
