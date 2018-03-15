const compare = (params, callback) => {
	let response;
	if (params.found_matches) {
		response = {
			suspect_detected: true
		};
	} else {
		response = {
			suspect_detected: false
		};
	}
	callback(null, response);
	return true;
};


module.exports = compare;
