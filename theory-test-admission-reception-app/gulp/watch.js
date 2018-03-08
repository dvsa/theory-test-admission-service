/*
  watch.js
  ===========
  watches sass/js/images
*/

const gulp = require('gulp');
const config = require('./config.json');

gulp.task('watch-sass', () => {
	return gulp.watch(`${config.paths.assets}sass/**`, { cwd: './' }, ['sass', 'create-assets-folder']);
});

gulp.task('watch-assets', () => {
	return gulp.watch([`${config.paths.assets}images/**`,
		`${config.paths.assets}javascripts/**`], { cwd: './' }, ['copy-assets', 'create-assets-folder']);
});
