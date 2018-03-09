const gulp = require('gulp');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sequence = require('gulp-sequence');
const zip = require('gulp-zip');
const { argv } = require('yargs');

gulp.task('default', sequence('clean', 'lint', 'test', 'build'));

/**
 * Delete the "dist" directory, if present.
 */
gulp.task('clean', () => {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

/**
 * Fail the build if ESLint standards are not met.
 */
gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
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

/**
 * Create a zip file which can be deployed to AWS Lambda, in the "dist" directory.
 * The target filename can be overriden with the command-line argument "lambda".
 *
 * TODO only include runtime dependencies (not "dev" dependencies) in node_modules
 */
gulp.task('build', () => {

    const filename = argv.lambda || 'lambda.zip';

    return gulp.src([
        'lambda.js',
        'src/**/*',
        'node_modules/**/*'
    ], { base: '.' })
        .pipe(zip(filename))
        .pipe(gulp.dest('dist/'));

});
