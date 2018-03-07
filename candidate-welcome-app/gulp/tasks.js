/*
  tasks.js
  ===========
  defaults wraps generate-assets, watch and server
*/

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const config = require('./config.json');

gulp.task('default', (done) => {
	runSequence(
		'generate-assets',
		'watch',
		'server', done
	);
});

gulp.task('build-dist', (done) => {
	runSequence(
		'generate-assets',
		'create-dist', done
	);
});

gulp.task('generate-assets', (done) => {
	runSequence(
		'clean',
		'babel-server',
		'copy-views',
		'copy-govuk-modules',
		'sass',
		'sass-documentation',
		'babel-client',
		'copy-assets',
		'copy-documentation-assets', done
	);
});

gulp.task('copy-govuk-modules', [
	'copy-toolkit',
	'copy-template-assets',
	'copy-elements-sass',
	'copy-template'
]);

gulp.task('watch', (done) => {
	runSequence(
		'watch-sass',
		'watch-assets', done
	);
});

gulp.task('integration', () => {
	runSequence(
		'generate-assets',
		'integrationtests'
	);
});

gulp.task('unit', () => {
	runSequence(
		'generate-assets',
		'unittests'
	);
});

gulp.task('integrationtests', () => {
	return gulp.src(['test/**/*.js'], { read: false })
		.pipe(mocha({ reporter: 'spec' }))
		.once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		});
});

gulp.task('unittests', () => {
	return gulp.src(['build/**/*.unit.js'], { read: false })
		.pipe(mocha({ reporter: 'spec' }))
		.once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		});
});

gulp.task('copy-views', () => {
	return gulp.src(['app/server/views/**'])
		.pipe(gulp.dest(`${config.paths.build}/views`));
});

