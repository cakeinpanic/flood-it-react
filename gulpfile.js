var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

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

	return gulp.src(['src/**/*.jsx','src/**/*.js'])
        .pipe(concat('game.js'))
		.pipe(react({
			harmony: true
		}))
		.pipe(gulp.dest('dist/'));
});