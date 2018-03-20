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
	compareFaces(ignored) {
		const that = this;
		return {
			promise() {
				return new Promise((resolve) => {
					resolve(that.searchData);
				});
			}
		};
	}

}

module.exports = MockRekognition;
