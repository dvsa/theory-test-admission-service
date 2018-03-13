/*
Integration Test for AdmissionDAO
 */

const assert = require('assert');
const AdmissionDAO = require('theory-test-admission-dao');

describe('Test AdmissionDAO module', () => {
	const parameters = {
		drivingLicenceNumber: 'Test1234567890',
		admissionId: '123456789'
	};

	const admission1 = AdmissionDAO.createNewAdmissionRecord(parameters);
	const admission1Id = admission1.admissionId;

	it('can create a new record', (done) => {
		assert(admission1.admissionId, admission1Id);
		assert(admission1.TYPE, 'ADMISSION');
		done();
	});

	it('can save a new record to the database', (done) => {
		AdmissionDAO.save(admission1, (err, retVal) => {
			assert(retVal.admissionId, admission1Id);
			done();
		});
	});

	it('can delete the record created just now', (done) => {
		AdmissionDAO.delete(admission1, (err, retVal) => {
			done();
		});
	});
});
