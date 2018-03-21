const logger = require('logger');
const moment = require('moment');

class Admission {
	constructor(parameters) {
		const {
			AdmissionId, DrivingLicenceNumber, AdmissionStarted, HasBooking, IsEntitled, ResemblesLicence,
			ResemblesSuspect, LicenceImageThreshold
		} = parameters;
		this.AdmissionId = AdmissionId || '';
		this.DrivingLicenceNumber = DrivingLicenceNumber || '';
		this.AdmissionStarted = AdmissionStarted || moment().format('YYYY-MM-DD');
		this.HasBooking = HasBooking || false;
		this.IsEntitled = IsEntitled || false;
		this.ResemblesLicence = ResemblesLicence || false;
		this.ResemblesSuspect = ResemblesSuspect || false;
		this.LicenceImageThreshold = LicenceImageThreshold || 0;
		logger.info(`Created new Admission object: ${this.AdmissionId}`);
	}

}

module.exports = Admission;
