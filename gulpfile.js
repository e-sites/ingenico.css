/* jshint node:true */

'use strict';

var pkg = require('./package.json'),
	gulp = require('gulp'),
	uncss = require('gulp-uncss'),
	minify = require('gulp-minify-css'),
    processHTML = require('gulp-processhtml'),
    minifyHTML = require('gulp-minify-html'),
	header = require('gulp-header'),
	gutil = require('gulp-util'),
    rimraf = require('gulp-rimraf'),
	rename = require('gulp-rename'),
	banner = ['/*! <%= pkg.name %> <%= pkg.version %>',
	'MIT licensed',
	'Copyright (C) ' + gutil.date("yyyy") + ' <%= pkg.author.name %>',
	"*/\n"
	].join(' ');	

gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('minify-html', function () {
    return gulp.src('./templates/clean.html')
        .pipe(processHTML('template.html'))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('process-css', function () {
    return gulp.src('./src/styles.css')
        .pipe(uncss({
            ignore: ['.og-outer-wrapper'],
            html: [
            	'views/bancontact.html',
            	'views/giropay.html',
            	'views/ideal.html',
            	'views/index.html',
            	'views/mastercard.html',
            	'views/visa.html',
            	'views/waitmsg.html'
            ]
        }))
        .pipe(minify())
        .pipe(rename('styles.min.css'))
		.pipe(header(banner, {pkg : pkg }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean', 'minify-html', 'process-css']);