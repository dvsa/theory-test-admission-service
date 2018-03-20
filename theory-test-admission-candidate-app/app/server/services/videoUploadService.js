const videoUtilities = require('candidate-video-utilities');

export default class VideoUploadService {

	/**
	 * This method calls the video utilities module to retrieve the upload url
	 * @param admissionId
	 * @param mimeType
	 * @returns {Promise<string>}
	 */
	static getUploadVideoURL(admissionId, mimeType, callback) {
		videoUtilities.createPutUrlForCandidateVideo(admissionId, mimeType, (err, data) => {
			// discard error
			callback(data);
		});
	}
}
