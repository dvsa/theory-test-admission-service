const AbstractDTO = require('./AbstractDAO');
const Admission = require('../entities/admission');


const logger = require('logger');

const table = process.env.DDB_TABLE_ADMISSIONS;
const primaryKeyName = 'TYPE';
const primaryKeyValue = 'ADMISSION';
const sortKeyName = 'commenced';
const recordType = 'ADMISSION';

class AdmissionDAO extends AbstractDTO {
	constructor(value) {
		super(table, value, primaryKeyName);
	}

	static save(admission, callback) {
		logger.info('Calling Save Admission from DAO');
		const admissionForDB = AdmissionDAO.createAdmissionDatabaseRecord(admission);
		super.save(admissionForDB, table, (err, savedAdmission) => {
			callback(err, savedAdmission);
		});
	}

	// requires an object that contains only the admissionId and those fields that we wish to update
	static update(entity, callback) {
		super.update(entity, entity.admissionId, sortKeyName, primaryKeyName, primaryKeyValue, table, (err, updatedRecord) => {
			const record = AdmissionDAO.createAdmissionFromDataBase(updatedRecord);
			callback(err, record);
		});
	}

	static updateAll(admission, callback) {
		const admissionForDB = AdmissionDAO.createAdmissionDatabaseRecord(admission);
		super.update(admissionForDB, admissionForDB.admissionId, sortKeyName, primaryKeyName, primaryKeyValue, table, (err, updatedRecord) => {
			const record = AdmissionDAO.createAdmissionFromDataBase(updatedRecord);
			callback(err, record);
		});
	}

	static createNewAdmissionRecord(parameters) {
		const {
			admissionId, drivingLicenceNumber
		} = parameters;
		const admission = new Admission();
		admission.TYPE = recordType;
		admission.admissionId = admissionId;
		admission.drivingLicenceNumber = drivingLicenceNumber;
		admission.commenced = new Date().getTime();
		logger.debug(`Created new Admission: ${admission.admissionId}`);
		return admission;
	}

	static createAdmissionFromDataBase(parameters) {
		const {
			TYPE, admissionId, drivingLicenceNumber, commenced, hasBooking, isEntitled, resemblesLicence,
			resemblesSuspect, licenceImageThreshold
		} = parameters;
		const admission = new Admission();
		admission.TYPE = TYPE;
		admission.admissionId = admissionId;
		admission.drivingLicenceNumber = drivingLicenceNumber;
		admission.commenced = commenced;
		admission.hasBooking = hasBooking; //has booking today?
		admission.isEntitled = isEntitled;
		admission.resemblesLicence = resemblesLicence;
		admission.resemblesSuspect = resemblesSuspect;
		admission.licenceImageThreshold = licenceImageThreshold;
		return admission;
	}

	static createAdmissionDatabaseRecord(parameters) {
		const {
			admissionId, drivingLicenceNumber
		} = parameters;
		const admission = new Admission();
		admission.TYPE = recordType;
		admission.admissionId = admissionId;
		admission.drivingLicenceNumber = drivingLicenceNumber;
		admission.commenced = new Date().getTime().toString();
		logger.info(`Created new Admission for Database: ${admission.admissionId}`);
		return admission;
	}

	static delete(admissionId, callback) {
		super.delete(admissionId, sortKeyName, primaryKeyName, primaryKeyValue, table, (err, retVal) => {
			callback(err, retVal);
		});
	}

}

module.exports = AdmissionDAO;
