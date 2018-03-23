let AWS = require('aws-sdk');
const moment = require('moment');

if (process.env.RUNNING_LOCALLY === 'true') {
	AWS = require('../local/AWSConfig'); // eslint-disable-line
}
const table = process.env.DDB_TABLE_ADMISSIONS; // Admissions
const index = process.env.DDB_TABLE_INDEX; // RecentAdmissionsIndex

class AdmissionDAO {

	constructor(database) {
		this.database = database || AdmissionDAO.createDynamoDBDocumentClient();
	}

	/**
	 * @private
	 */
	static createDynamoDBDocumentClient() {
		return new AWS.DynamoDB.DocumentClient({
			params: { TableName: table },
			service: new AWS.DynamoDB({
				apiVersion: '2012-08-10'
			})
		});
	}

	/**
	 * Promises to create an item (i.e. INSERT a row) in the Admissions table.
	 *
	 * This happens once we know the candidate's Driving Licence Number, and have interrogated the booking system.
	 *
	 * @param {string} drivingLicenceNumber part of composite primary key
	 * @param {string} admissionId part of composite primary key
	 * @param {boolean} hasBooking mandatory for business logic reasons, though that's not enforced by DynamoDB
	 * @returns {Promise<void>}
	 */
	createAdmission(drivingLicenceNumber, admissionId, hasBooking) {
		return this.database.put({
			Item: {
				DrivingLicenceNumber: drivingLicenceNumber,
				AdmissionId: admissionId,
				HasBooking: hasBooking,
				AdmissionStarted: moment().toISOString()
			}
		}).promise();
	}

	/**
	 * Promises to update an item (i.e. UPDATE a row) in the Admissions table.
	 *
	 * This happens after we've captured the candidate's video, and have performed various business operations.
	 * The intention is that we persist various facts about the candidate (or rather, the candidate's admission workflow),
	 * allowing the receptionist to retrieve those facts in the (near) future.
	 *
	 * So, to achieve any useful work the caller ought supply properties, e.g.:
	 * {
	 *   IsEntitled: true,
	 *   ... etc.
	 * }
	 * @param {string} drivingLicenceNumber part of composite primary key
	 * @param {string} admissionId part of composite primary key
	 * @param {object} properties attributes of the candidate's admission workflow
	 * @returns {Promise<void>}
	 */
	updateAdmission(drivingLicenceNumber, admissionId, properties) {
		return this.database.update({
			Key: {
				DrivingLicenceNumber: drivingLicenceNumber,
				AdmissionId: admissionId
			},
			UpdateExpression: AdmissionDAO.createUpdateExpression(properties),
			ExpressionAttributeValues: AdmissionDAO.createUpdateExpressionValues(properties)
		}).promise();
	}

	/**
	 * @param drivingLicenceNumber
	 * @returns {Promise<object>}
	 */
	getMostRecentAdmission(drivingLicenceNumber) {
		return this.database.query({
			KeyConditionExpression: 'DrivingLicenceNumber = :dln',
			ExpressionAttributeValues: {
				':dln': drivingLicenceNumber
			},
			IndexName: index,
			Select: 'ALL_ATTRIBUTES'
		}).promise();
	}

	/**
	 * @param {object} attributes
	 * @return {string}
	 * @private
	 */
	static createUpdateExpression(attributes) {
		let expression = 'SET ';
		let first = true;
		Object.getOwnPropertyNames(attributes)
			.forEach((key) => {
				if (!first) { expression += ', '; }
				expression += `${key}= :${key}`;
				first = false;
			});
		return expression;
	}

	/**
	 * @param {object} attributes
	 * @return {object}
	 * @private
	 */
	static createUpdateExpressionValues(attributes) {
		const expressionValues = {};
		Object.getOwnPropertyNames(attributes)
			.forEach((key) => {
				expressionValues[`:${key}`] = attributes[key];
			});
		return expressionValues;
	}

}

module.exports = AdmissionDAO;
