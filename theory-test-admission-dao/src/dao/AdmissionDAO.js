const AbstractDTO = require('./AbstractDAO');
const Admission = require('../entities/admission');

const table = process.env.DDB_TABLE_ADMISSIONS;
const primaryKeyName = 'DrivingLicenceNumber';
const primaryKeyValue = 'DrivingLicenceNumber';
const sortKeyName = 'AdmissionStarted';

class AdmissionDAO extends AbstractDTO {
	constructor(db) {
		super(table, primaryKeyName, db);
	}

	createAdmission(admissionParams, callback) {
		super.save(new Admission(admissionParams), (err, savedAdmission) => {
			callback(err, savedAdmission);
		});
	}

	// requires an object that contains only the admissionId and those fields that we wish to update
	updateAdmission(admissionParams, callback) {
		super.update(admissionParams, admissionParams.admissionId, sortKeyName, primaryKeyName, primaryKeyValue, (err, updatedRecord) => {
			callback(err, updatedRecord);
		});
	}

	deleteAdmission(DrivingLicenceNumber, callback) {
		super.delete(DrivingLicenceNumber, sortKeyName, primaryKeyName, primaryKeyValue, (err, retVal) => {
			callback(err, retVal);
		});
	}

}

module.exports = AdmissionDAO;
