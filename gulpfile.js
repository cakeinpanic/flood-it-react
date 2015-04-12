var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var gCrashSound = require('gulp-crash-sound');


gCrashSound.config({
    file: './node_modules/gulp-crash-sound/sounds/sound.mp3',
    duration: 0 // 3 seconds. can be null (or not set) to play full length which is the default
});
gulp.task('default', ['jsx', 'stylus'], function() {
	gulp.watch('src/**/*.jsx', ['jsx']);
    gulp.watch('src/**/*.js', ['jsx']);
    gulp.watch('src/styl/**/*', ['stylus']);
});

gulp.task('stylus', function () {
    gulp.src('./src/styl/floodIt.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('jsx', function() {
	"use strict";

	var react = require('gulp-react');

	return gulp.src(['src/**/*.js','src/**/*.jsx'])
        .pipe(concat('main.js'))
		.pipe(react({
			harmony: true
		}))
		.pipe(gulp.dest('dist/'));
});