/*
Integration Test for AdmissionDAO
 */

const assert = require('assert');
const AdmissionDAO = require('theory-test-admission-dao');

describe('Test AdmissionDAO module', () => {
	const parameters = {
		DrivingLicenceNumber: 'Test1234567890',
		AdmissionId: '123456789'
	};

	const admission1 = AdmissionDAO.createAdmissionDatabaseRecord(parameters);
	const admission1Id = admission1.AdmissionId;

	it('can create a new record', (done) => {
		assert(admission1.AdmissionId, admission1Id);
		done();
	});

	it('can save a new record to the database', (done) => {
		AdmissionDAO.create(admission1, (err, retVal) => {
			assert(retVal.AdmissionId, admission1Id);
			done();
		});
	});

	it('can delete the record created just now', (deleteDone) => {
		AdmissionDAO.delete(admission1.DrivingLicenceNumber, (err, retVal) => {
			deleteDone();
		});
	});
});
