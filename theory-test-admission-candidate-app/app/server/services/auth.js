// import { ensureLoggedIn } from 'connect-ensure-login';
import ConfigService from './../services/configService';

export default class Auth {

	urlRoot = ConfigService.GetUrlRoot();

	logInIfNeeded = (req, res, next) => {
		if (Auth.urlExcludedFromLogin(req.originalUrl)) {
			next();
		} else if (!ConfigService.UseAuth() || (req.session.data.validSession && req.session.data.bookingResult.hasBooking)) {
			// Do nothing if auth bypassed (dev mode)
			next();
		} else {
			const loginPage = `${this.urlRoot}`;
			this.ensureLoggedIn(loginPage, req, res, next);
		}
	};

	static urlExcludedFromLogin(url) {
		// We don't have urlRoot here - this is intentional as
		// urlRoot has been stripped off at this point
		const loginUrl = '/candidate/candidate-details';
		const reportPage = '/candidate/report-reception';
		const entryUrl = '/';

		return (
			url === loginUrl ||
			url === entryUrl) ||
			url === reportPage;
	}


	ensureLoggedIn = (options, req, res, next) => {
		let localOptions;
		if (typeof options === 'string') {
			localOptions = { redirectTo: options };
		} else {
			localOptions = options;
		}
		localOptions = localOptions || {};

		const url = localOptions.redirectTo || '/';
		const setReturnTo = (localOptions.setReturnTo === undefined) ? true : localOptions.setReturnTo;
		if (!res.locals.data.isAuthenticated) {
			if (setReturnTo && req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect(url);
		}
		return next();

	}

}

