/*
Integration Test for AdmissionDAO
 */

const assert = require('assert');
const AdmissionDAO = require('../src/dao/AdmissionDAO');

describe('Test AdmissionDAO module', () => {

	const admissionDAO = new AdmissionDAO();
	it('can create and save a new record', (done) => {
		const parameters = {
			DrivingLicenceNumber: 'Test1234567890',
			AdmissionId: '123456789',
			HasBooking: true
		};
		admissionDAO.createAdmission(parameters, (error, result) => {
			assert(result.AdmissionId, '123456789');
			done();
		});
	});
	it('can update an existing record', (done) => {
		const parameters = {
			DrivingLicenceNumber: 'Test1234567890',
			IsEntitled: true
		};
		admissionDAO.updateAdmission(parameters, (error, result) => {
			console.log('yoyoyo: ', error);
			assert(result.IsEntitled, true);
			done();
		});
	});

	// it('can delete the record created just now', (done) => {
	// 	admissionDAO.deleteAdmission('Test1234567890', (error, result) => {
	// 		console.log('RESULT: ', error);
	// 		assert(result);
	// 		done();
	// 	});
	// });
});
