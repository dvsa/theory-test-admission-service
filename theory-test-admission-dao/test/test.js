const assert = require('assert');
const AdmissionDAO = require('../src/dao/AdmissionDAO');

const DRIVING_LICENCE_NUMBER = 'Test1234567890';
const ADMISSION_ID = '123456789';

class MockDynamoDB {

	constructor() {
		this.error = false;
	}

	/**
	 * @param ignoredParams {null}
	 * @param callback {object}
	 */
	put(params) {
		this.assert(params);
		return {
			promise: MockDynamoDB.promise(this.error)
		};

	}

	update(params) {
		this.assert(params);
		return {
			promise: MockDynamoDB.promise(this.error)
		};
	}

	assert() { // eslint-disable-line class-methods-use-this
		// nop
	}

	/**
	 * @private
	 * @param {boolean} error
	 * @returns {function}
	 */
	static promise(error) {
		if (error) {
			return function promise() {
				return Promise.reject(new Error('Mock DynamoDB is configured to fail!'));
			};
		}
		return function promise() {
			return Promise.resolve();
		};


	}
}

describe('AdmissionDAO', () => {

	it('conveys AWS failure to caller', (done) => {
		const mock = new MockDynamoDB();
		mock.error = true;
		const admissionDAO = new AdmissionDAO(mock);
		admissionDAO.createAdmission({})
			.then(() => { done(new Error('Should not have succeeded!')); })
			.catch(() => { done(); }); // expected error
	});

	it('can create a new record', (done) => {
		const mock = new MockDynamoDB();
		mock.assert = function (params) { // eslint-disable-line func-names
			assert.equal(params.Item.DrivingLicenceNumber, 'Test1234567890');
		};
		const admissionDAO = new AdmissionDAO(mock);
		admissionDAO.createAdmission(DRIVING_LICENCE_NUMBER, ADMISSION_ID, true)
			.then(() => { done(); })
			.catch((error) => { done(error); });
	});

	it('can update a record', (done) => {
		const mock = new MockDynamoDB();
		mock.assert = function (params) { // eslint-disable-line func-names
			assert.equal(params.Key.DrivingLicenceNumber, 'Test1234567890');
			assert.equal(params.UpdateExpression, 'SET foo= :foo');
			assert.equal(params.ExpressionAttributeValues[':foo'], 'bar');
		};
		const admissionDAO = new AdmissionDAO(mock);
		admissionDAO.updateAdmission(DRIVING_LICENCE_NUMBER, ADMISSION_ID, { foo: 'bar' })
			.then(() => { done(); })
			.catch((error) => { done(error); });
	});

});
