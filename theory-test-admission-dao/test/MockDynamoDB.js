class MockDynamoDB {

	/**
	 * Specify the objects you want fake Dynamo to "return" to its client's callback function.
	 *
	 * @param error {object}
	 * @param searchData {object}
	 */
	constructor(error) {
		this.error = error;
	}

	/**
	 * @param ignoredParams {null}
	 * @param callback {object}
	 */
	static put(params, callback) {
		callback(null, params);
	}

	static update(params, callback) {
		const updateObj = {
			Attributes: 'Update Successful'
		};
		callback(null, updateObj);
	}
}

module.exports = MockDynamoDB;
