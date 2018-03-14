const logger = require('../../../logger/index');

describe('Example Unit Test', () => {
	describe('greeting', () => {
		it('is "Hello World!"', () => {
			logger.info('Hello World from Logger');
		});
	});
});
