const assert = require('assert');
const compare = require('../src/compare-video-image-collection');

describe('Comparison', () => {

	it('succeeds', (done) => {

		assert.ok(compare());
		done();

	});

});
