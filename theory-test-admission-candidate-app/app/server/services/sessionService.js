

export default class SessionService {
	static ClearData(req) {
		req.session = null;
	}
}
