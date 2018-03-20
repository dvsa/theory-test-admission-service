const AWS = require('aws-sdk');


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
		return this.rekognition.searchFacesByImage({
			CollectionId: process.env.MOCK_DVLA_COLLECTION,
			FaceMatchThreshold: process.env.IMAGE_COMPARISON_THRESHOLD,
			Image: {
				S3Object: {
					Bucket: bucketName,
					Name: key
				}
			},
			MaxFaces: process.env.IMAGE_SEARCH_MAX_RESULTS
		}).promise()
			.then((result) => {
				logger.debug('AWS Rekognition SearchFacesByImage returned: ', JSON.stringify(result));
				return({
					"ResemblesLicence": result,
					"LicenceImageThreshold": process.env.IMAGE_COMPARISON_THRESHOLD
				});
			}).catch((error) => {
				logger.error('AWS Rekognition SearchFacesByImage returned: ', JSON.stringify(error));
				throw new Error(`Status of AWS Step Function is ${JSON.stringify(error)}!`);
			});
	}
}

module.exports = ImageService;