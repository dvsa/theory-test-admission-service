const assert = require('assert');
const Transcoder = require('../src/transcoder');

/**
 * Stub implementation of AWS Service Object.
 */
class StubAWSElasticTranscoder {

	/**
	 * @param {boolean} operational
	 */
	constructor(operational = true, attempts = 1) {
		this.operational = operational;
		this.attempts = attempts;
	}

	createJob(params) {
		assert.equal(params.Input.Key, 'input');
		assert.equal(params.Output.Key, 'output');
		if (this.operational) {
			return {
				promise() {
					return new Promise((resolve) => {
						resolve({ Job: { Id: 'id' } });
					});
				}
			};
		} else { // eslint-disable-line no-else-return
			return {
				promise() {
					return Promise.reject();
				}
			};
		}
	}

	readJob(params) {
		this.attempts -= 1;
		const status = (this.attempts === 0) ? 'Complete' : 'In Progress';
		assert.equal(params.Id, 'id');
		return this.operational ? {
			promise() {
				return new Promise((resolve) => {
					resolve({ Job: { Status: status } });
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
		const transcoder = new Transcoder(new StubAWSElasticTranscoder(true, 1));
		transcoder.transcode('input', 'output')
			.then(() => {
				done();
			})
			.catch((error) => {
				done(error); // unexpected
			});
	});
	it('polls AWS if job is not complete', (done) => {
		const transcoder = new Transcoder(new StubAWSElasticTranscoder(true, 3));
		transcoder.transcode('input', 'output')
			.then(() => {
				done();
			})
			.catch((error) => {
				done(error); // unexpected
			});
	});
	it('interprets failure from AWS correctly', (done) => {
		const transcoder = new Transcoder(new StubAWSElasticTranscoder(false, 1));
		transcoder.transcode('input', 'output')
			.then(() => {
				done(new Error('Should not have succeeded!'));
			})
			.catch((error) => { // eslint-disable-line no-unused-vars
				done(); // expected error
			});
	});
});
