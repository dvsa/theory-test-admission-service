const AWS = require('aws-sdk');
const moment = require('moment');

const stepFunctions = new AWS.StepFunctions();
const POLLING_INTERVAL = 250; // msec

export default class CandidateCheckBookingService {

	/**
   * @param drivingLicenceNumber
   * @param admissionId
   * @returns Promise<boolean>
   */
	static retrieveCandidateBooking(drivingLicenceNumber, admissionId) {
		/**
		 * TODO
		 * In order for the UI to perform for user research, this method has been
		 * refactored for the time being to always return a 'true' value,
		 * meaning that any DLN entered in the UI will allow the UI flow to continue.
		 * To restore and re-activate the step-function, delete the following line and uncomment the code starting
		 * 'return stepFunctions.startExecution(....
		 */


		return new Promise((resolve) => { resolve(true); });
		/**
		return stepFunctions.startExecution({
			stateMachineArn: process.env.SFN_START_CANDIDATE_ADMISSION_ARN,
			input: this.createStepFunctionInput(drivingLicenceNumber, admissionId)
		}).promise()
			.then((result) => {
				const execution = result.executionArn;
				return this.await(execution).then((output) => {
					const deserialized = JSON.parse(output);
					return deserialized.HasBooking;
				});
			});
		 * */
	}

	/**
   * @private
   * @return {string}
   */
	static createStepFunctionInput(drivingLicenceNumber, admissionId) {
		return JSON.stringify({
			Request: {
				DrivingLicenceNumber: drivingLicenceNumber,
				AdmissionId: admissionId,
				Date: this.today()
			}
		});
	}

	/**
	 * @returns {string} ISO-8601 date component
	 */
	static today() {
		return moment().format('YYYY-MM-DD');
	}

	/**
   * @private
   * @return {Promise<void>}
   */
	static sleep() {
		return new Promise((resolve) => { setTimeout(resolve, POLLING_INTERVAL); });
	}

	/**
   * @param execution {string} execution ARN from a StartExecutionOutput
	 * @returns {Promise<string>} result of executing AWS Step Function
   */
	static await(execution) {
		return stepFunctions.describeExecution({ executionArn: execution }).promise()
			.then((description) => {
				switch (description.status) {
				case 'RUNNING':
					return this.sleep().then(() => { return this.await(execution); });
				case 'SUCCEEDED':
					return description.output;
				case 'FAILED':
				case 'TIMED_OUT':
				case 'ABORTED':
				default:
					throw new Error(`Status of AWS Step Function is ${description.status}!`);
				}
			});
	}
}
