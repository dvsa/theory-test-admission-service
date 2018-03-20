const AWS = require('aws-sdk');
const logger = require('logger');

class ImageService {

	constructor(rekognition = new AWS.Rekognition()) {
		this.rekognition = rekognition;
	}

	/**
	 * @param bucketName {string}
	 * @param key {string}
	 * @param promise {object}
	 */
	compareImage(bucketName, key) {
		return this.rekognition.compareFaces({
			SimilarityThreshold: process.env.IMAGE_COMPARISON_THRESHOLD,
			SourceImage: {
				S3Object: {
					Bucket: bucketName,
					Name: key
				}
			},
			TargetImage: {
				S3Object: {
					Bucket: process.env.MOCK_DVLA_IMAGE_BUCKET,
					Name: key
				}
			}
		}).promise()
			.then((result) => {
				logger.debug('AWS Rekognition SearchFacesByImage returned: ', JSON.stringify(result));
				return ({
					ResemblesLicence: result.FaceMatches.length > 0,
					LicenceImageThreshold: process.env.IMAGE_COMPARISON_THRESHOLD
				});
			}).catch((error) => {
				logger.error('AWS Rekognition SearchFacesByImage returned: ', JSON.stringify(error));
				throw new Error(`Status of AWS Step Function is ${JSON.stringify(error)}!`);
			});
	}
}

module.exports = ImageService;
