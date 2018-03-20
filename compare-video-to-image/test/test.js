const assert = require('assert');
const compare = require('../src/compare-video-to-image');

describe('Comparison', () => {

	it('succeeds', (done) => {

		assert.ok(compare());
		done();

	});

});
