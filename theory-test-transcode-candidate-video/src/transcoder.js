const AWS = require('aws-sdk');

/**
 * 'Generic 1080p'
 *
 * @see https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/system-presets.html
 * @type {string}
 */
const DEFAULT_PRESET_ID = '1351620000001-000001';

const PIPELINE_ID = process.env.ELASTIC_TRANSCODER_PIPELINE_ID;
const PRESET_ID = process.env.ELASTIC_TRANSCODER_PRESET_ID || DEFAULT_PRESET_ID;

const POLLING_INTERVAL = 250; // msec

class Transcoder {

	/**
	 * @param transcoder AWS Service object; optional
	 */
	constructor(transcoder) {
		this.transcoder = transcoder || new AWS.ElasticTranscoder();
	}

	/**
	 * @
	 * @returns {Promise<void>}
	 */
	transcode(input, output) {
		return this.enqueueJob(input, output)
			.then((id) => {
				return this.awaitJobCompletion(id);
			});
	}

	/**
	 * Promises to return the job identifier of a newly enqueued Elastic Transcoder job.
	 *
	 * N.B. you don't get to specify the S3 Bucket which contains the files,
	 * that's already defined in the Elastic Transcoder Pipeline.
	 *
	 * @private
	 * @params {string} input filename
	 * @params {string} output filename
	 * @returns {Promise<string>}
	 */
	enqueueJob(input, output) {
		const params = {
			PipelineId: PIPELINE_ID,
			Input: {
				Key: input
			},
			Output: {
				Key: output,
				PresetId: PRESET_ID
			}
		};
		return this.transcoder.createJob(params)
			.promise()
			.then((response) => {
				return response.Job.Id;
			});
	}

	/**
	 * Promises to tell you when the specified Elastic Transcoder job has completed.
	 *
	 * @private
	 * @param {string} id
	 * @returns {Promise<void>}
	 */
	awaitJobCompletion(id) {
		return this.transcoder.readJob({ Id: id })
			.promise()
			.then((response) => {
				switch (response.Job.Status) {
				case 'Complete':
					return undefined; // success
				case 'Submitted':
				case 'In Progress':
					return Transcoder.sleep()
						.then(() => {
							return this.awaitJobCompletion.apply(this, [id]);
						});
				case 'Canceled': // yes, that is the correct spelling
				case 'Error':
				default:
					throw new Error(`Elastic Transcoder job has status '${response.Job.Status}'!`);
				}
			});
	}

	/**
	 * @returns {Promise<void>}
	 */
	static sleep() {
		return new Promise((resolve) => {
			setTimeout(resolve, POLLING_INTERVAL);
		});
	}

}

module.exports = Transcoder;
