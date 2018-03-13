class Admission {
	constructor() {
		this.admissionId = '';
		this.drivingLicenceNumber = '';
		this.commenced = '';
		this.hasBooking = false;
		this.isEntitled = false;
		this.resemblesLicence = false;
		this.resemblesSuspect = false;
		this.licenceImageThreshold = 0;
	}
}

module.exports = Admission;
