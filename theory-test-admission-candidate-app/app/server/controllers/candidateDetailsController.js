import uuid from 'uuid/v4';
import CandidateCheckBookingService from '../services/candidateCheckBookingService';

export default class CandidateDetailsController {
	constructor(){
		this.candidateBookingService = new CandidateCheckBookingService();
	}
	checkBooking(candidateDLN) {
		const admissionsId = uuid();
		this.candidateBookingService.checkcandidateBooking(admissionsId, candidateDLN);
	}
}