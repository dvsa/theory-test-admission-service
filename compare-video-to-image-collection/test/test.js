const assert = require('assert');
const compare = require('../src/compare');

describe('Comparison', () => {

	it('succeeds', (done) => {

		assert.ok(compare());
		done();

	});

});
