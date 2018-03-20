const assert = require('assert');
const ImageService = require('../src/imageService');
const MockRekognition = require('./mock-rekognition');

const IGNORED_BUCKET = 'not-exist-dir';
const IGNORED_KEY = 'not-exist.png';

describe('Image Service Tests', () => {

	it('resolves its Promise and returns false when candidate image does NOT match any DVLA images', (done) => {
		const imageService = new ImageService(new MockRekognition(null, { FaceMatches: [] }));
		imageService.compareImage(IGNORED_BUCKET, IGNORED_KEY)
			.then((result) => {
				assert.equal(result.ResemblesLicence, false);
				done();
			})
			.catch((error) => {
				console.log(error);
				done(new Error('Promise should have resolved, but it rejected!'));
			});
	});

	it('resolves its Promise and returns true when candidate image matches any DVLA images', (done) => {
		const imageService = new ImageService(new MockRekognition(null, { FaceMatches: [{}] }));
		imageService.compareImage(IGNORED_BUCKET, IGNORED_KEY)
			.then((result) => {
				assert.equal(result.ResemblesLicence, true);
				done();
			})
			.catch((error) => {
				console.log(error);
				done(new Error('Promise should have resolved, but it rejected!'));
			});
	});

});
