// Store data from POST body or GET query in session
const storeData = (input, store) => {
	Object.keys(input).forEach((key) => {
		const val = input[key];

		// Delete values when users unselect checkboxes
		if (val === '_unchecked' || val === ['_unchecked']) {
			delete store.data[key];
		} else {
		// Remove _unchecked from arrays of checkboxes
			if (Array.isArray(val)) {
				const index = val.indexOf('_unchecked');
				if (index !== -1) {
					val.splice(index, 1);
				}
			}
			store.data[key] = val;
		}
	});
};

const sendSessionDataToViews = function anonFunc(req, res) {
	res.locals.data = {};

	Object.keys(req.session.data).forEach((key) => {
		res.locals.data[key] = req.session.data[key];
	});
};

// Middleware - store any data sent in session, and pass it to all views
export default (req, res, next) => {
	if (!req.session.data) {
		req.session.data = {};
	}
	if (!req.session.scenario) {
		req.session.scenario = {};
	}

	storeData(req.body, req.session);
	storeData(req.query, req.session);

	// Send session data to all views
	sendSessionDataToViews(req, res);

	next();
};
