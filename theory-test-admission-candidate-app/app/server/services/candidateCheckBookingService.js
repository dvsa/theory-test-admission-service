const AWS = require('aws-sdk');
const logger = require('logger');
const moment = require('moment');



export default class CandidateCheckBookingService {

	static checkCandidateBooking(admissionId, candidateDLN, callback) {
		const bookingStepFunction = new AWS.StepFunctions();
		console.log('getting after declaration ');
		const currentDate = moment(Number.parseInt(new Date().getTime(), 10)).toISOString(true);

		const dln = `"DrivingLicenceNumber": "${candidateDLN}"`;
		const aId = `"AdmissionId": "${admissionId}"`;
		const date = `"Date": "${currentDate}"`;
		const completeInput = `{ "Request": {${dln}, ${aId}, ${date}} }`;

		const params = {
			stateMachineArn: ,
			input: completeInput
		};
		bookingStepFunction.startExecution(params, (err, data) => {
			if (err) {
				logger.error(err);
				console.log('Error is: ', err);
				return callback(false); // an error occurred
			}
			logger.info(data);
			console.log('Data is: ', data.executionArn);
			const descParams = {
				executionArn: data.executionArn,
			};
			bookingStepFunction.describeExecution(descParams, (error, response) => {
				while (response.status === 'RUNNING') {
					console.log('Running loop');
					bookingStepFunction.describeExecution(descParams, (loopError, loopResponse) => {
						console.log('doing describe');
						if (loopResponse.status === 'SUCCEEDED') {
							console.log('got response: ', loopResponse);
							return callback(loopResponse.output.HasBooking);
						}
						return false;
					});
				}
				console.log('Describer exec: ', response);
				return callback(false); // successful response

			});
			return callback(false);
		});


	}
}
