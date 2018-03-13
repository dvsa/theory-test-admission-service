const gulp = require('gulp');
const eslint = require('gulp-eslint');
const run = require('gulp-run');
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

gulp.task('test', sequence('set-running-locally', 'set-verbose-logging', 'quasi-test'));

gulp.task('set-verbose-logging', () => {
	process.env.LOG_LEVEL = 'debug';
	return true;
});

gulp.task('set-running-locally', () => {
	process.env.RUNNING_LOCALLY = 'true';
	return true;
});

gulp.task('quasi-test', () => {
	return run('node ./test/test-logger.js', {})
		.exec();
});
