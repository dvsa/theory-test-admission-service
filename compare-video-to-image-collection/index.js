module.exports = require('./src/compare');

exports.handler = function (event, context, callback) {
  console.log('running one-compare-video-to-collection');
  let response;
  if (event.Request.VideoPath === 'video_1') {
    response = {
      found_matches: true
    };
  } else {
    response = {
      found_matches: false
    };
  }
  callback(null, response);
};
