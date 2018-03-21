const assert = require('assert');
const Transcoder = require('../src/transcoder');

/**
 * Stub implementation of AWS Service Object.
 */
/* eslint-disable class-methods-use-this */
class StubAWSElasticTranscoder {

	createJob(params) {
		assert.equal(params.Input.Key, 'input');
		assert.equal(params.Output.Key, 'output');
		return {
			promise() {
				return new Promise((resolve) => {
					resolve({ Job: { Id: 'id' } });
				});
			}
		};
	}

	readJob(params) {
		assert.equal(params.Id, 'id');
		return {
			promise() {
				return new Promise((resolve) => {
					resolve({ Job: { Status: 'Complete' } });
				});
			}
		};
	}

}
/* eslint-enable class-methods-use-this */


describe('Transcoder', () => {
	it('passes correctly structured parameters to AWS', (done) => {
		const transcoder = new Transcoder(new StubAWSElasticTranscoder());
		transcoder.transcode('input', 'output')
			.then(() => {
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
});
