const gulp = require('gulp');
const mocha = require('gulp-mocha');
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

/**
 * Fail the build if unit tests do not pass.
 */
gulp.task('test', () => {
	return gulp.src(['test/**/*.js', 'src/**/*.integration.js'], { read: false })
		.pipe(mocha({ reporter: 'spec' }))
		.once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		});
});
