/*
  nodemon.js
  ===========
  uses nodemon to run a server, watches for javascript and json changes
*/

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const config = require('./config.json');

gulp.task('server', () => {
	nodemon({
		script: 'server.js',
		watch: 'app/server',
		ext: 'js, json, html',
		ignore: [`${config.paths.public}*`,
			`${config.paths.assets}*`,
			`${config.paths.nodeModules}*`],
		tasks: ['babel-server', 'copy-views', 'create-assets-folder']
	}).on('quit', () => {
		// remove .port.tmp if it exists
		fs.unlinkSync(path.join(__dirname, '/../.port.tmp'));

		process.exit(0);
	});
});
