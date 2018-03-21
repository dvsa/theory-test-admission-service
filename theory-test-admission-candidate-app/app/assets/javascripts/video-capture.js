const state = {

	/**
	 * MediaStream of webcam
	 */
	stream: null,

	/**
	 * Recorded WebM/H.264
	 */
	blob: null,

	/**
	 * Transcoded MPEG-4/H.264
	 */
	file: null

}

let blob = null;



const uploadUrl = $('#uploadUrl').text();




/**
 * Crude!
 */
function errorHandler (error) {
	console.error(error)
	alert('An error has occurred! See console for more information.')
}

/**
 * @returns Promise<MediaStream>
 */
function createMediaStream () {
	return navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			width: videoDimensions.width,
			height: videoDimensions.height,
			facingMode: 'user'
		}
	})
}

/**
 * @param stream {MediaStream|null}
 * @returns Promise<void>
 */
function preview (stream, handler) {
	return new Promise((resolve, reject) => {
		const video = document.querySelector('video')
		if (stream) {
			// enable preview
			video.srcObject = stream
			video.onloadedmetadata = () => {
				video.play()
					.then(() => {
						if(handler){
							handler();
						}
					resolve()
					})
					.catch(reject)
			}
		} else {
			// disable preview
			video.pause()
			video.srcObject = null
			resolve()
		}
	})
}

/**
 *
 * @param stream
 * @return {Promise<any>}
 */
function record (stream, startHandler, endHandler) {
	return new Promise((resolve) => {
		// hold each chunk of video data in memory
		let chunks = []
		const recorder = new MediaRecorder(stream, {
			mimeType: 'video/webm;codecs=h264'
		})
		recorder.ondataavailable = event => {
			chunks.push(event.data)
		}
		recorder.onstop = () => {
			blob = new Blob(chunks, {'type': 'video/webm'})
			if(endHandler) {
				endHandler();
			}
			resolve()
		}
		recorder.onstart = () => {
			if(startHandler){
				startHandler();
			}
		}
		setTimeout(() => {
			recorder.start()
			setTimeout(() => {
				recorder.stop();
			}, 5000)

		}, 500);
	})
}


/**
 * @param blob {Blob}
 * @returns Promise<ArrayBuffer>
 */
function asArrayBuffer (blob) {
	return new Promise(resolve => {
		const fileReader = new FileReader()
		fileReader.onload = () => {
			resolve(fileReader.result)
		}
		fileReader.readAsArrayBuffer(blob)
	})
}



function startPreview (handler) {
	createMediaStream()
		.then((stream) => {
			state.stream = stream
			return preview(stream, handler)
		})
		.catch(errorHandler);
}

function doRecording(startHandler, endHandler){
	record(state.stream, startHandler, endHandler)
		.then((blob) => {
			state.blob = blob
		})
		.then(() => {
			preview(null)
		})
		.catch(errorHandler);
}

/**
 * @returns {Promise<void>}
 */
function playbackVideo (startHandler, endHandler) {
	const video = document.querySelector('video');

	video.onloadedmetadata = () => {
		video.play()
			.then(() => {
			if(startHandler){
					startHandler();
				}
			});
	};
	video.onended= () => {
		video.src='';
		endHandler();
	}
	video.src = window.URL.createObjectURL(blob);
	return video.play()
}


function storeVideo(startHandler, endHandler) {
	startHandler();
	/**
	 * TODO
	 * In order for the UI to perform for user research, this method has been
	 * refactored for the time being.
	 * The ajax call has been commented out, so a file will NOT be uploaded
	 * Instead of the upload, a small delay is triggered to simulate the upload delay.
	 * To re-instate the correct upload functionality, uncomment the ajax call and remove the timeout
	 */
	setTimeout(function(){
		endHandler();
	}, 1000 * 3+ Math.floor(Math.random() * Math.floor(3)));
	/**
	 $.ajax({
		url: uploadUrl,
		method: 'PUT',
		crossDomain: true,
		data: blob,
		processData: false,
		ContentEncoding: 'application/binary',
		contentType: 'video/webm'
	})
		.done((err, data) => {
			endHandler();
		})
		.fail((err, data) => {
		console.log('Upload error: ', err);
		})
	 */
}


