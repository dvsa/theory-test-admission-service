import uuid from 'uuid/v4';
import CandidateCheckBookingService from '../services/candidateCheckBookingService';
import sessionStorage from '../middleware/manuallySetSessionData';


export default class CandidateDetailsController {
	constructor() {
		this.candidateBookingService = new CandidateCheckBookingService();
	}
	checkBooking(req, res) {
		const admissionsId = uuid();
		const candidateDLN = req.body.DLN.toString().toUpperCase();
		this.candidateBookingService.admissionsId = admissionsId;
		this.candidateBookingService.candidateDLN = candidateDLN;
		const hasBooking = this.candidateBookingService.checkCandidateBooking();
		sessionStorage(req, res, 'bookingResult', { hasBooking, admissionsId });
		if (hasBooking) {
			sessionStorage(req, res, 'videoTermsAgreed', false);
			res.redirect('/candidate/prepare-video');
		} else {
			res.redirect('/candidate/report-reception');
		}
	}
}
