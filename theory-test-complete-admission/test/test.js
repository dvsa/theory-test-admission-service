const assert = require('assert');
const main = require('../src/main');

describe('Example Unit Test', () => {
	describe('greeting', () => {
		it('is "Hello World!"', () => {
			assert.equal(main.greeting(), 'Hello World!');
		});
	});
});
