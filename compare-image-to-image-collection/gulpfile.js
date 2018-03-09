const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sequence = require('gulp-sequence');

gulp.task('default', sequence('lint', 'test'));

/**
 * Fail the build if ESLint standards are not met.
 * This applies only to production code, not test code.
 */
gulp.task('lint', () => {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', sequence('suppress-logging', 'unit-test'));

gulp.task('suppress-logging', () => {
	process.env.LOG_LEVEL = 'error';
	return true;
});

/**
 * Fail the build if unit tests do not pass.
 */
gulp.task('unit-test', () => {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({
			reporter: 'spec',
		}));
});
