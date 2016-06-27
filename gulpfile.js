const gulp = require('gulp'),
	clean = require('gulp-clean'),
	jsmin = require('gulp-uglify'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber');;
const scssUrl = './src/**/*.scss',
	jsUrl = './src/**/*.js',
	pugUrl = './src/**/*.pug',
	cssUrl = './src/**/*.css',
	serverBaseUrl = 'build';

gulp.task('default', ['browserSync'], function() {
	console.log('serving is start')
})

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: serverBaseUrl,
			directory: true
		}
	});
	gulp.watch(scssUrl, ['scssTransform']);
	gulp.watch(pugUrl, ['views']);
	gulp.watch(jsUrl, ['jsmin']);
	gulp.watch('./build/**/*.*', function() {
		browserSync.reload();
	});
})
gulp.task('scssTransform', function() {
	return gulp.src(scssUrl)
		.pipe(sass().on('error', sass.logError)).pipe(gulp.dest('build'));
})
gulp.task('jsmin', function() {
	return gulp.src(jsUrl).pipe(plumber())
		.pipe(jsmin()).pipe(gulp.dest('build'))
})
gulp.task('views', function() {
	return gulp.src(pugUrl).pipe(plumber())
		.pipe(pug({
			pretty: true
		}))

	.pipe(gulp.dest('build'));
})


gulp.task('bower', function() {
	gulp.src('bower_components/**').pipe(gulp.dest('build/bower'));
})