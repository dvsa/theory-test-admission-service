class Admission {
	constructor() {
		this.AdmissionId = '';
		this.DrivingLicenceNumber = '';
		this.AdmissionStarted = '';
		this.HasBooking = false;
		this.IsEntitled = false;
		this.ResemblesLicence = false;
		this.ResemblesSuspect = false;
		this.LicenceImageThreshold = 0;
	}
}

module.exports = Admission;
