module.exports = require('./src/compare');

exports.handler = function (event, context, callback) {
  console.log('running one-compare-video-to-image');
  let response;
  if (event.bucketName === 'bucket_1') {
    response = {
      found_matches: true,
      threshold: 90
    };
  } else {
    response = {
      found_matches: false,
      threshold: 90
    };
  }
  callback(null, response);
};

