/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp');
const config = require('./config.json');

gulp.task('copy-assets', () => {
	return gulp.src([
		`!${config.paths.assets}sass{,/**/*}`,
		`!${config.paths.assets}/javascripts/src{,/**/*}`,
		`${config.paths.assets}/**`,
		`${config.paths.govukModules}/**`
	])
		.pipe(gulp.dest(config.paths.public));
});

gulp.task('copy-documentation-assets', () => {
	return gulp.src([`!${config.paths.docsAssets}sass{,/**/*}`,
		`${config.paths.docsAssets}/**`])
		.pipe(gulp.dest(config.paths.public));
});
