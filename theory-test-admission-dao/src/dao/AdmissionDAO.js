const AbstractDTO = require('./AbstractDAO');
const Admission = require('../entities/admission');


const logger = require('logger');
const moment = require('moment');

const table = process.env.DDB_TABLE_ADMISSIONS;
const primaryKeyName = 'DrivingLicenceNumber';
const primaryKeyValue = 'DrivingLicenceNumber';
const sortKeyName = 'AdmissionStarted';

class AdmissionDAO extends AbstractDTO {
	constructor(value) {
		super(table, value, primaryKeyName);
	}

	static create(admission, callback) {
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

	static createAdmissionFromDatabase(parameters) {
		const {
			AdmissionId, DrivingLicenceNumber, AdmissionStarted, HasBooking, IsEntitled, ResemblesLicence,
			ResemblesSuspect, LicenceImageThreshold
		} = parameters;
		const admission = new Admission();
		admission.AdmissionId = AdmissionId;
		admission.DrivingLicenceNumber = DrivingLicenceNumber;
		admission.AdmissionStarted = AdmissionStarted;
		admission.HasBooking = HasBooking;
		admission.IsEntitled = IsEntitled;
		admission.ResemblesLicence = ResemblesLicence;
		admission.ResemblesSuspect = ResemblesSuspect;
		admission.LicenceImageThreshold = LicenceImageThreshold;
		return admission;
	}

	static createAdmissionDatabaseRecord(parameters) {
		const {
			AdmissionId, DrivingLicenceNumber, HasBooking
		} = parameters;
		const admission = new Admission();
		admission.AdmissionId = AdmissionId;
		admission.DrivingLicenceNumber = DrivingLicenceNumber;
		admission.AdmissionStarted = moment(Number.parseInt(new Date().getTime(), 10)).toISOString(true);
		admission.HasBooking = HasBooking;
		logger.info(`Created new Admission for Database: ${admission.AdmissionId}`);
		return admission;
	}

	static delete(DrivingLicenceNumber, callback) {
		super.delete(DrivingLicenceNumber, sortKeyName, primaryKeyName, primaryKeyValue, table, (err, retVal) => {
			callback(err, retVal);
		});
	}

}

module.exports = AdmissionDAO;
