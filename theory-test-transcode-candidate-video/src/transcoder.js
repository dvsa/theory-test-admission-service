const AWS = require('aws-sdk');

const ELASTIC_TRANSCODER_PIPELINE = process.env.ELASTIC_TRANSCODER_PIPELINE;

class Transcoder {

	constructor() {
		this.transcoder = new AWS.ElasticTranscoder();
	}

	transcode() {

    elasticTranscoder.createJob().promise();


  }

  /**
   * @private
   * @returns {Promise<void>}
   */
	enqueueJob() {

	}

	/**
   * @private
   * @returns {Promise<void>}
   */
	awaitJobCompletion() {

	}

}

module.exports = Transcoder;
