const assert = require('assert');
const AdmissionDAO = require('../src/dao/AdmissionDAO');

describe('Test AdmissionDAO module', () => {

	const admissionDAO = new AdmissionDAO();
	const drivingLicenceNumber = 'Test1234567890';
	const admissionId = '12345678';

	it('can create a new item', (done) => {
		admissionDAO.createAdmission(drivingLicenceNumber, admissionId, true).then(() => {
			done();
		}).catch((error) => {
			done(error);
		});
	});
	it('can update an existing item', (done) => {
		admissionDAO.updateAdmission(drivingLicenceNumber, admissionId, { IsEntitled: false }).then(() => {
			done();
		}).catch((error) => {
			done(error);
		});
	});
	it('can get an existing item', (done) => {
		admissionDAO.getMostRecentAdmission(drivingLicenceNumber).then((result) => {
			assert.equal(result.Items.length, 1);
			assert.equal(result.Items[0].DrivingLicenceNumber, drivingLicenceNumber);
			done();
		}).catch((error) => {
			done(error);
		});
	});
});
