const videoUtilities = require('candidate-video-utilities');

export default class VideoUploadService {

	/**
	 *
	 * @param admissionId
	 * @param mimeType
	 * @returns {Promise<string>}
	 */
	static getUploadVideoURL(admissionId, mimeType) {
		return videoUtilities.createPutUrlForCandidateVideo(admissionId, mimeType);
	}
}
