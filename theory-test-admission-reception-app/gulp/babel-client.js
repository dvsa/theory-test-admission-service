const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const config = require('./config.json');

gulp.task('babel-client', () => {
	return gulp.src('app/assets/javascripts/src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('application.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(`${config.paths.public}/javascripts/`));
});
