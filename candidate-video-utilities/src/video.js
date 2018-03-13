const AWS = require('aws-sdk');

const BUCKET = process.env.CANDIDATE_VIDEO_BUCKET;
const DIRECTORY = process.env.CANDIDATE_VIDEO_DIRECTORY;

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
const createPutUrlForCandidateVideo = (admissionId, mimeType) => {

	return new AWS.S3().getSignedUrl('putObject', {
		Bucket: BUCKET,
		Key: `${DIRECTORY}/${admissionId}.${getExtensionForMimeType(mimeType)}`,
		ACL: 'authenticated-read',
		ContentType: mimeType
	}).promise();

};

module.exports = { createPutUrlForCandidateVideo };
