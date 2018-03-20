const AWS = require('aws-sdk');

const BUCKET = process.env.ADMISSION_BUCKET;
const DIRECTORY = process.env.CANDIDATE_WEBM_VIDEO_DIR;


/**
 * @private
 */
const getExtensionForMimeType = (mimeType) => {
	switch (mimeType.toLowerCase()) {
	case 'video/webm':
		return 'webm';
	default:
		// TODO
		throw new Error('Not yet implemented!');
	}
};

/**
 * @param admissionId {string} a UUID
 * @param mimeType {string} e.g. 'video/webm'
 * @returns Promise<string> a presigned URL from AWS S3, into which you may PUT a video of the specified mime type
 */
const createPutUrlForCandidateVideo = (admissionId, mimeType, callback) => {
	const S3 = new AWS.S3();
	const params = {
		Bucket: BUCKET,
		Key: `${DIRECTORY}/${admissionId}.${getExtensionForMimeType(mimeType)}`,
		ACL: 'authenticated-read',
		ContentType: mimeType
	};
	S3.getSignedUrl('putObject', params, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};

module.exports = { createPutUrlForCandidateVideo };
