import { Router } from 'express';
import path from 'path';

import ConfigService from './services/configService';
import AuthService from './services/auth';
import SessionService from './services/sessionService';
import sessionStorage from './middleware/manuallySetSessionData';
import matchRoutes from './middleware/matchRoutes';
import CandidateDetailsController from './controllers/candidateDetailsController';
import TermsAndConditionsController from './controllers/termsConditionsController';


// const logger = require('./logger');

export default class AppRouter {

	constructor() {
		this.authService = new AuthService();
		this.routes = Router();
		this.candidateDetailsController = new CandidateDetailsController();
		this.termsAndConditionsController = new TermsAndConditionsController();
	}


	paginationSettings = ConfigService.GetPaginationSettings();
	urlRoot = ConfigService.GetUrlRoot();


	init() {
		this.setupRoutingMiddleware();
		this.setGetHandlers();
		this.setPostHandlers();
		this.setupCatchallGetHandler();
		this.setupPostToGetRedirect();
		this.setupErrorHandler();
	}

	setGetHandlers() {
		// Clear all data in session if you open /prototype-admin/clear-data
		this.routes.get('/admin/clear-data', (req, res) => {
			SessionService.ClearData(req);
			res.render('admin/clear-data');
		});

		// Send a Robots.txt file
		this.routes.get('/robots.txt', (req, res) => {
			res.type('text/plain');
			res.send('User-agent: *\nDisallow: /');
		});

		// Route index page
		this.routes.get('/', (req, res) => {
			sessionStorage(req, res, 'bookingResult', { hasBooking: false, admissionsId: '' });
			sessionStorage(req, res, 'validSession', true);
			res.render('index');
		});


		// Candidate details aka login page
		this.routes.get('/candidate/candidate-details', (req, res) => {
			res.render('candidate/candidate-details');
		});

		// Video terms and Conditions
		this.routes.get('/candidate/prepare-video', (req, res) => {
			res.render('candidate/prepare-video');
		});

		this.routes.get('/candidate/report-reception', (req, res) => {
			sessionStorage(req, res, 'bookingResult', { hasBooking: false, admissionsId: '' });
			res.render('candidate/report-reception');
		});
	}


	setPostHandlers() {
		this.routes.post(
			'/candidate/candidate-details',
			(req, res, next) => {
				this.candidateDetailsController.checkBooking(req, res, next);
			}
		);


		this.routes.post(
			'/candidate/video-terms-conditions',
			(req, res, next) => {
				this.termsAndConditionsController.checkAgreement(req, res, next);
			}
		);
	}


	setupRoutingMiddleware() {
		// Add auth guard
		this.routes.use(this.authService.logInIfNeeded);
		// Strip .html and .htm if provided
		this.routes.get(/\.html?$/i, (req, res) => {
			const parts = path.split('.');
			parts.pop();
			const reqPath = parts.join('.');
			res.redirect(reqPath);
		});

	}

	setupCatchallGetHandler() {

		// Auto render any view that exists
		// App folder routes get priority
		this.routes.get(/^\/([^.]+)$/, (req, res) => {
			matchRoutes(req, res);
		});

	}

	setupPostToGetRedirect() {

		// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
		this.routes.post(/^\/([^.]+)$/, (req, res) => {
			res.redirect(this.urlRoot + req.params[0]);
		});

	}

	setupErrorHandler() {
		// error handler
		/* FROM EXPRESS DOCS:-
		Error-handling middleware always takes four arguments.
		You must provide four arguments to identify it as an error-handling middleware function.
		Even if you don’t need to use the next object, you must specify it to maintain the signature.
		Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors. */
		this.routes.use((err, req, res, next) => { // eslint-disable-line
			// TODO: look at why we need to do this to get error callstack
			// TODO replace with Winston console.log(err);
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};
			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
	}

}
