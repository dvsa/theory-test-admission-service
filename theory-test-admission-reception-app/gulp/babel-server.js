const gulp = require('gulp');
const babel = require('gulp-babel');

const config = require('./config.json');

gulp.task('babel-server', () => {
	return gulp.src('app/server/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest(config.paths.build));
});
