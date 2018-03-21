const assert = require('assert');
const Transcoder = require('../src/transcoder');

/**
 * Stub implementation of AWS Service Object.
 */
class StubAWSElasticTranscoder {

	/**
	 * @param {boolean} operational
	 */
	constructor(operational = true) {
		this.operational = operational;
	}

	createJob(params) {
		assert.equal(params.Input.Key, 'input');
		assert.equal(params.Output.Key, 'output');
		return this.operational ? {
			promise() {
				return new Promise((resolve) => {
					resolve({ Job: { Id: 'id' } });
				});
			}
		} : {
			promise() {
				return Promise.reject();
			}
		};
	}

	readJob(params) {
		assert.equal(params.Id, 'id');
		return this.operational ? {
			promise() {
				return new Promise((resolve) => {
					resolve({ Job: { Status: 'Complete' } });
				});
			}
		} : {
			promise() {
				return Promise.reject();
			}
		};
	}

}


describe('Transcoder', () => {
	it('passes correctly structured parameters to AWS', (done) => {
		const transcoder = new Transcoder(new StubAWSElasticTranscoder());
		transcoder.transcode('input', 'output')
			.then(() => {
				done();
			})
			.catch((error) => {
				done(error); // unexpected
			});
	});
	it('interprets failure from AWS correctly', (done) => {
		const transcoder = new Transcoder(new StubAWSElasticTranscoder(false));
		transcoder.transcode('input', 'output')
			.then(() => {
				done(new Error('Should not have succeeded!'));
			})
			.catch((error) => { // eslint-disable-line no-unused-vars
				done(); // expected error
			});
	});
});
