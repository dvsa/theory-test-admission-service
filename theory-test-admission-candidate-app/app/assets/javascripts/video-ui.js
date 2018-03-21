const instructions = {
	preStart: 'Position yourself so that your face shows inside the red box, then press \'Start Recording\'',
	recordPressed: 'Recording will start in ....',
	recording:'Recording...',
	playbackStart:'Playing back recording ...',
	uploadStart: 'Uploading video, please wait ...'
}

const videoDimensions = {
	width: 1280,
	height: 720,
	ratio: 3
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
	$('.vComplete').addClass('js-hidden');
	$('.vButtons').removeClass('js-hidden');
	setInstructionsText(instructions.preStart);
	$('.vInstructions').removeClass('js-hidden');
	addOverlayBorder();
	enable('#record', recordButtonClicked);
}

function recordingComplete() {
	setInstructionsText('');
	$('.vComplete').removeClass('js-hidden');
	removeOverlayBorder();
	$('#storeVideo').removeClass('js-hidden')
}

function setInstructionsText(text) {
	$('.vInstructions').text(text);
}
function positionOverlay() {

	$('video#preview').css({width:videoDimensions.width/videoDimensions.ratio, height:videoDimensions.height/videoDimensions.ratio})
	const previewOffset = $('video#preview').position();
	const previewHeight = $('video#preview').height();
	const previewWidth = $('video#preview').width();
	const instructionsHeight = $('#vInstructions').height();
	console.log(previewOffset, previewWidth, previewHeight);
	$('.vOverlay').css({left: previewOffset.left + (previewWidth - previewWidth/3)/2,
		width: previewWidth/3,
		height: previewHeight/2,
		top: (previewOffset.top +instructionsHeight) + (previewHeight - previewHeight/2)/2})

	$('.vCountdown').css({left: previewOffset.left + (previewWidth - previewWidth/3)/2,
		width: previewWidth/3,
		height: previewHeight/2,
		top: (previewOffset.top +instructionsHeight) + (previewHeight - previewHeight/2)/2});
	$('#vComplete').css({left: previewOffset.left + (previewWidth - previewWidth/2)/2,
		width: previewWidth/2,
		height: previewHeight/2,
		top: (previewOffset.top - instructionsHeight) + (previewHeight - previewHeight/2)/2});
	 /**
	const offsetOverlay={top:previewOffset.top + 120,left: previewOffset.left + previewWidth/3 , height: previewHeight - 120, width: previewWidth/3};
	console.log(offsetOverlay, 'Height: ', previewHeight, 'Width: ', previewWidth);
	$('.vOverlay').css(offsetOverlay);
	$('.vCountdown').css(offsetOverlay);
	const completeOffset={top: previewOffset.top, left: previewOffset.left + previewWidth/3, }
	$('#vComplete').css(previewOffset);
*/
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
	$('.vOverlay').css('border',"dashed red 1px");
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
	window.location='/candidate/report-reception';
}

function redoVideo(){
	startPreview(displayPreStartInstructions);
}

function replayVideo(){
	playbackVideo(playbackStart, playbackComplete);
}

function playbackStart(){
	setInstructionsText(instructions.playbackStart);
	$('.vComplete').addClass('js-hidden');
	$('.vButtons').addClass('js-hidden');
}

function playbackComplete(){
	setInstructionsText('');
	$('#vComplete').removeClass('js-hidden');
}


$(document).ready(function(){
	positionOverlay();
	startPreview(displayPreStartInstructions);
})