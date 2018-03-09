const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sequence = require('gulp-sequence');

gulp.task('default', sequence('lint', 'test'));

/**
 * Fail the build if ESLint standards are not met.
 */
gulp.task('lint', () => {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

/**
 * Fail the build if unit tests do not pass.
 */
gulp.task('test', sequence('suppress-logging', 'set-running-locally', 'unit-test'));

gulp.task('suppress-logging', () => {
	process.env.LOG_LEVEL = 'error';
	return true;
});

gulp.task('set-running-locally', () => {
	process.env.RUNNING_LOCALLY = 'true';
	return true;
});

gulp.task('unit-test', () => {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({
			reporter: 'spec',
		}));
});
