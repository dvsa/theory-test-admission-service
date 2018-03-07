/*
  clean.js
  ===========
  removes folders:
    - public
    - govuk_modules
*/

const gulp = require('gulp');
const clean = require('gulp-clean');

const config = require('./config.json');

gulp.task('clean', () => {
	return gulp.src([
		`${config.paths.public}/*`,
		`${config.paths.govukModules}/*`,
		`${config.paths.dist}/*`,
		`${config.paths.build}/*`,
		`${config.paths.temp}/*`,
		'.port.tmp'], { read: false })
		.pipe(clean());
});
