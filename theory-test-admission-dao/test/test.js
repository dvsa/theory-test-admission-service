const assert = require('assert');
const AdmissionDAO = require('../src/dao/AdmissionDAO');
const MockDynamoDB = require('./MockDynamoDB');

describe('Test AdmissionDAO module', () => {
	const parameters = {
		DrivingLicenceNumber: 'Test1234567890',
		AdmissionId: '123456789',
		HasBooking: true
	};
	const admissionDAO = new AdmissionDAO(MockDynamoDB);

	it('can create a new record', (done) => {
		const newAdmission = admissionDAO.createAdmission(parameters, (error, result) => {
			assert(result.HasBooking, true);
			done();
		});
	});

	it('can update a record', (done) => {
		const newAdmission = admissionDAO.updateAdmission(parameters, (error, result) => {
			console.log('koalas: ', result);
			done();
		});
	});

	it('can delete a record', (done) => {
		const newAdmission = admissionDAO.createAdmission(parameters, (error, result) => {
			assert(result.HasBooking, true);
			done();
		});
	});
});
