const instructions = {
	preStart: 'Position yourself so that your face shows inside the red box, then press \'Start Recording\'',
	recordPressed: 'Recording will start in ....',
	recording:'Recording...',
	playbackStart:'Playing back recording ...',
	uploadStart: 'Uploading video, please wait ...'
}

const videoDimensions = {
	height:480,
	width:600
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
	$('.vInstructions').text(instructions.preStart);
	$('.vInstructions').removeClass('js-hidden');
	addOverlayBorder();
	enable('#record', recordButtonClicked);
}

function recordingComplete() {
	$('.vInstructions').text('');
	$('.vComplete').removeClass('js-hidden');
	removeOverlayBorder();
	$('#storeVideo').removeClass('js-hidden')
}
function positionOverlay() {
	$('video#preview').attr('width', videoDimensions.width);
	$('video#preview').attr('height', videoDimensions.height);
	const offset = $('video#preview').offset();
	const offsetInstructions=offset;
	offsetInstructions.height=100;
	offsetInstructions.width=videoDimensions.width;
	offsetInstructions.top=offset.top + 10;
	offsetInstructions.left=offset.left;
	$('#vInstructions').css(offsetInstructions);
	const offsetButtons={top:offset.top,left: offset.left};
	offsetButtons.top=offset.top+videoDimensions.height-80;
	offsetButtons.height=80;
	offsetButtons.width=videoDimensions.width;
	$('#vButtons').css(offsetButtons);
	const offsetOverlay={top:offset.top,left: offset.left};
	offsetOverlay.width=videoDimensions.width/3;
	offsetOverlay.left=offset.left +(videoDimensions.width-offsetOverlay.width)/2;
	offsetOverlay.height=videoDimensions.height/2;
	offsetOverlay.top=offset.top+ (videoDimensions.height-offsetOverlay.height)/2
	$('.vOverlay').css(offsetOverlay);
	$('.vComplete').css(offsetOverlay);

	const offsetCountdown={top: offset.top ,left: offset.left};
	offsetCountdown.width=videoDimensions.width/4;
	offsetCountdown.left=offset.left +(videoDimensions.width-offsetCountdown.width)/2;
	offsetCountdown.height=videoDimensions.height/3;
	offsetCountdown.top=offset.top+ (videoDimensions.height-offsetCountdown.height)/2
	$('.vCountdown').css(offsetCountdown);
}

function doCountdown(time, instructions, handler, handlerStart, handlerEnd){
	$('#vInstructions').text(instructions);
	$('#vCountdown').removeClass('js-hidden');
	const timer = setInterval(function(){
		$('#vCountdown').text(time--);
		if(time === -1) {
			clearInterval(timer);
			$('#vCountdown').text('');
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
	doCountdown(4, instructions.recording);
}

function recordEndHandler(){
	recordingComplete();
}


function recordButtonClicked () {
	$('.vButtons').addClass('js-hidden');
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

function uploadStart() {
	$('.vOverlay').text(instructions.uploadStart);
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
	$('.vInstructions').text(instructions.playbackStart);
	$('.vComplete').addClass('js-hidden');
	$('.vButtons').addClass('js-hidden');
}

function playbackComplete(){
	$('.vInstructions').text('');
	$('#vComplete').removeClass('js-hidden');
}

$(document).ready(function(){
	positionOverlay();
	startPreview(displayPreStartInstructions);
})