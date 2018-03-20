const compare = (params, callback) => {
	let response;
	if (params.Request.VideoPath === 'video_1') {
		response = {
			found_matches: true
		};
	} else {
		response = {
			found_matches: false
		};
	}
	callback(null, response);
};


module.exports = compare;
