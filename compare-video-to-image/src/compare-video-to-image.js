const compare = (params, callback) => {
	let response;
	if (params.bucketName === 'bucket_1') {
		response = {
			found_matches: true,
			threshold: 90
		};
	} else {
		response = {
			found_matches: false,
			threshold: 90
		};
	}
	callback(null, response);
};

module.exports = compare;
