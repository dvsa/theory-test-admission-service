class MockRekognition {

	/**
	 * Specify the objects you want fake AWS to "return" to its client's callback function.
	 *
	 * @param error {object}
	 * @param searchData {object}
	 */
	constructor(error, searchData) {
		this.error = error;
		this.searchData = searchData;
	}

	/**
	 * @param ignored {null}
	 * @param promise {function}
	 */
	searchFacesByImage(ignored) {
		return this.searchData;
	}

}

module.exports = MockRekognition;
