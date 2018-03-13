import sessionStorage from '../middleware/manuallySetSessionData';

export default class TermsConditionsController {
	checkAgreement(req, res, next) {
		const hasAgreed = req.body['accept-group'];
		if (hasAgreed === 'Accept') {
			sessionStorage(req, res, 'videoTermsAgreed', true);
			return res.redirect('/candidate/video-capture');
		} else {
			sessionStorage(req, res, 'videoTermsAgreed', false);
			return res.redirect('/candidate/report-reception');
		}
	}
}