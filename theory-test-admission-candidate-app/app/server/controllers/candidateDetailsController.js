import uuid from 'uuid/v4';
import CandidateCheckBookingService from '../services/candidateCheckBookingService';
import sessionStorage from '../middleware/manuallySetSessionData';

const logger = require('logger');


export default class CandidateDetailsController {
	constructor() {
		this.candidateBookingService = new CandidateCheckBookingService();
	}
	checkBooking(req, res) {
		const admissionId = uuid();
		const drivingLicenceNumber = req.body.DLN.toString().toUpperCase();
		CandidateCheckBookingService.retrieveCandidateBooking(drivingLicenceNumber, admissionId)
			.then((hasBooking) => {
				sessionStorage(req, res, 'bookingResult', { hasBooking, admissionId });
				if (hasBooking) {
					logger.info('has booking');
					sessionStorage(req, res, 'videoTermsAgreed', false);
					res.redirect('/candidate/prepare-video');
				} else {
					logger.info('no booking');
					res.redirect('/candidate/report-reception');
				}
			})
			.catch((error) => {
				// TODO return a 500 to the frontend!
				logger.error('Step function did not execute successfully!', { error });
			});
	}
}
