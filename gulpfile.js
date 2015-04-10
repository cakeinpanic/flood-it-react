var gulp = require('gulp');

gulp.task('default', ['jsx'], function() {
	gulp.watch('src/**/*.jsx', ['jsx']);
});


gulp.task('jsx', function() {
	"use strict";

	var react = require('gulp-react');

	return gulp.src('src/**/*.jsx')
		.pipe(react({
			harmony: true
		}))
		.pipe(gulp.dest('dist/'));
});