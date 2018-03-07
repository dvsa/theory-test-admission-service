/*
  create-dist-files.js
  ===========
  copies distribution files to a directory
*/

const gulp = require('gulp');
const config = require('./config.json');
const zip = require('gulp-zip');
const gulpSequence = require('gulp-sequence');
const { argv } = require('yargs');

gulp.task('create-dist', gulpSequence(
	'create-dist-build',
	[
		'zip-lambda-to-dist',
		'zip-assets-to-dist',
	]
));

gulp.task('create-dist-build', [
	'build-app',
	'build-entry',
	'build-lib',
	'build-node-modules',
	'build-govuk-modules',
	'build-assets',
	'create-assets-folder'
]);

gulp.task('build-app', () => {
	return gulp.src([
		`!${config.paths.app}/assets`,
		`${config.paths.build}/**`,
	])
		.pipe(gulp.dest(`${config.paths.temp}/build`));
});

gulp.task('build-entry', () => {
	return gulp.src([
		'server.js', 'package.json', 'lambda.js'])
		.pipe(gulp.dest(config.paths.temp));
});

gulp.task('build-lib', () => {
	return gulp.src([
		`${config.paths.lib}/**`])
		.pipe(gulp.dest(`${config.paths.temp}/lib`));
});

gulp.task('build-assets', () => {
	return gulp.src([
		`${config.paths.public}/**`])
		.pipe(gulp.dest(`${config.paths.temp}/public`));
});

gulp.task('build-govuk-modules', () => {
	return gulp.src([
		`${config.paths.govukModules}/**`])
		.pipe(gulp.dest(`${config.paths.temp}/govuk_modules`));
});

gulp.task('build-node-modules', () => {
	return gulp.src([
		`${config.paths.nodeModules}/**`])
		.pipe(gulp.dest(`${config.paths.temp}/node_modules`));
});


gulp.task('create-assets-folder', [
	'copy-public-to-asset-folder',
	'copy-gov-to-assets-folder'
]);

gulp.task('copy-public-to-asset-folder', () => {
	return gulp.src(`${config.paths.temp}/public/**/*`)
		.pipe(gulp.dest(`${config.paths.assetFolder}/public`));
});

gulp.task('copy-gov-to-assets-folder', () => {
	return gulp.src(`${config.paths.temp}/govuk_modules/**/*`)
		.pipe(gulp.dest(`${config.paths.assetFolder}/govuk_modules`));
});


gulp.task('zip-lambda-to-dist', () => {
	const lambdaDistFileName = argv.lambda || config.output.lambdaDist;

	return gulp.src([
		`${config.paths.temp}/**/*`,
		`!${config.paths.temp}/app/assets`,
		`!${config.paths.temp}/app/assets/**`,
		`!${config.paths.temp}/public`,
		`!${config.paths.temp}/public/**`,
		`!${config.paths.temp}/govuk_modules`,
		`!${config.paths.temp}/govuk_modules/**`,
	])
		.pipe(zip(lambdaDistFileName))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('zip-assets-to-dist', () => {
	const assetsDistFileName = argv.assets || config.output.assetsDist;

	return gulp.src([
		`${config.paths.temp}/public/**/*`,
		`${config.paths.temp}/govuk_modules/**/*`,
	], { base: config.paths.temp })
		.pipe(zip(assetsDistFileName))
		.pipe(gulp.dest(config.paths.dist));
});
