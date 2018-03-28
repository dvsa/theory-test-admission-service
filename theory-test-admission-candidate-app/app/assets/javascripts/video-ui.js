const instructions = {
	preStart: 'There will be a five second countdown before the video begins. Then look at the camera and remain still for a further 5 seconds.',
	recordPressed: 'The recording is about to start ....',
	recording:'Recording...',
	uploadStart: 'Submitting video, please wait ...'
}

const videoDimensions = {
	width: 1280,
	height: 720,
	ratio: 3,
	instructionsHeight: 80
}

/**
 * Enable button in user interface.
 */
function enable (button, handler) {
	$(button)
		.removeAttr('disabled')
		.removeClass('disabled')
		.on('click', handler)
}

/**
 * Disable button in user interface.
 */
function disable (button) {
	$(button)
		.prop('disabled', true)
		.addClass('disabled')
		.off('click')
}

function hide (button) {
	$(button)
		.addClass('js-hidden')
		.off('click');
}

function show (button, handler) {
	enable(button, handler);
	$(button)
		.removeClass('js-hidden');
}

function displayPreStartInstructions() {
	$('.vInstructions').css({'height': videoDimensions.instructionsHeight + 'px'})
	$('.vComplete').addClass('js-hidden');
	$('#vRightInstructions').removeClass('js-hidden');
	$('.vButtons').removeClass('js-hidden');
	setInstructionsText(instructions.preStart);
	$('.vInstructions').removeClass('js-hidden');
	addOverlayBorder();
	enable('#record', recordButtonClicked);
}

function recordingComplete() {
	setInstructionsText('');
	$('.vInstructions').css({'height': 0});
	setupPlayback(playbackStart, playbackComplete);
	$('video#playback').removeClass('js-hidden');
	$('video#preview').addClass('js-hidden');
	$('.vComplete').removeClass('js-hidden');
	removeOverlayBorder();
	$('#storeVideo').removeClass('js-hidden');
}

function setInstructionsText(text) {
	$('.vInstructions').text(text);
}
function positionOverlay() {

	$('video#preview').css({width:videoDimensions.width/videoDimensions.ratio, height:videoDimensions.height/videoDimensions.ratio})

	$('video#playback').css({width:videoDimensions.width/videoDimensions.ratio, height:videoDimensions.height/videoDimensions.ratio})
	const previewOffset = $('video#preview').position();
	const previewHeight = $('video#preview').height();
	const previewWidth = $('video#preview').width();
	$('.vOverlay').css({left: previewOffset.left + (previewWidth - previewWidth/4)/2,
		width: previewWidth/4,
		height: previewHeight/2,
		top: (previewOffset.top) + (previewHeight - previewHeight/2)/2})

	$('.vCountdown').css({left: previewOffset.left,
		width: '40px',
		height: '40px',
		top: (previewOffset.top )});
	$('#vComplete').css({left: previewOffset.left ,
		width: previewWidth,
		height: previewHeight/2,
		top: (previewOffset.top) });
	$('.vInstructions').css({width:previewWidth})
}

function doCountdown(time, instructions, handler, handlerStart, handlerEnd){
	setInstructionsText(instructions);
	$('#vCountdown').text('');
	$('#vCountdown').removeClass('js-hidden');
	const timer = setInterval(function(){
		$('#vCountdown').text(time--);
		if(time === -1) {
			clearInterval(timer);
			setInstructionsText('');
			$('#vCountdown').addClass('js-hidden');
			if(handler) {
				handler(handlerStart, handlerEnd);
			}
		}
	}, 1000);
}

function addOverlayBorder(){
	$('.vOverlay').css('border',"dashed red 2px");
}

function removeOverlayBorder(){
	$('.vOverlay').css('border',"none");
}

function recordStartHandler(){
	$('#vCountdown').removeClass('vCountDownPlaying');
	$('#vCountdown').addClass('vCountDownRecording');
	doCountdown(4, instructions.recording);
}

function recordEndHandler(){
	$('#vCountdown').removeClass('vCountDownRecording');
	recordingComplete();
}


function recordButtonClicked () {
	$('.vButtons').addClass('js-hidden');
	$('#vCountdown').addClass('vCountDownPlaying');
	doCountdown(5,instructions.recordPressed, doRecording, recordStartHandler, recordEndHandler);
}

$('#video-play').on('click', function(){
	replayVideo();
})

$('#video-complete-redo').on('click', function(){
	redoVideo();
})

$('#storeVideo').on('click', function(){
	storeVideo(uploadStart, uploadComplete);

})

$( window ).resize(function() {
	positionOverlay();
});

function uploadStart() {
	setInstructionsText(instructions.uploadStart);
	$('.vComplete').addClass('js-hidden');
	$('.vOverlay').removeClass('js-hidden');
}

function uploadComplete(){
	setInstructionsText('Submission complete!  Please wait ...');
	setTimeout(function(){
		window.location='/candidate/report-reception';
	}, 5000);
}

function redoVideo(){
	$('video#playback').addClass('js-hidden');
	$('video#preview').removeClass('js-hidden');
	startPreview(displayPreStartInstructions);
}

function replayVideo(){
	playRecording();
}

function playbackStart(){
	$('.vCountdown').removeClass('js-hidden');
	$('.vCountdown').addClass('countDownPlaying');
	$('.vCountdown').text('Playing...');

}

function playbackComplete(){
	$('.vCountdown').addClass('js-hidden');
	$('.vCountdown').removeClass('countDownPlaying');
	$('.vCountdown').text('');
}


$(document).ready(function(){
	positionOverlay();
	startPreview(displayPreStartInstructions);
})