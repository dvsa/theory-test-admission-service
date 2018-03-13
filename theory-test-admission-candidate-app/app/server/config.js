// Use this file to change prototype configuration.

// Note: prototype config can be overridden using environment variables (eg on heroku)

module.exports = {
	// Service name used in header. Eg: 'Renew your passport'
	serviceName: 'Theory Test Candidate Admissions',

	// Default port that prototype runs on
	port: '3000',

	// Enable or disable password protection on production
	useAuth: 'true',

	// Automatically stores form data, and send to all views
	useAutoStoreData: 'true',

	// Enable or disable built-in docs and examples.
	useDocumentation: 'true',

	// Force HTTP to redirect to HTTPS on production
	useHttps: 'false',

	// Cookie warning - update link to service's cookie page.
	cookieText: 'GOV.UK uses cookies to make the site simpler. <a href="#">Find out more about cookies</a>',

	// Is the app running locally or not
	runningLocally: 'false',

	// Url of the assets
	assets: '/',

	// Base url the app is hosted
	urlRoot: '/',

	// Pagination settings
	pagination: {
		limit: 10,
		maxLimit: 250,
		paginationLinkCount: 5
	}
};
