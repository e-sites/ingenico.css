/* jshint node:true */

'use strict';

var pkg = require('./package.json'),
	gulp = require('gulp'),
    less = require('gulp-less'),
	uncss = require('gulp-uncss'),
    cleanCSS = require('gulp-minify-css'),
    processHTML = require('gulp-processhtml'),
    minifyHTML = require('gulp-minify-html'),
	header = require('gulp-header'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	banner = ['/*! <%= pkg.name %> <%= pkg.version %>',
	'MIT licensed',
	'Copyright (C) ' + gutil.date("yyyy") + ' <%= pkg.author.name %>',
	"*/\n"
	].join(' ');

gulp.task('minify-html', function () {
    return gulp.src('./rsc/templates/clean.html')
        .pipe(processHTML())
        .pipe(minifyHTML())
		.pipe(rename('template.html'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('styles', function () {
    return gulp.src('./src/less/ingenico.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('process-css', function () {
    return gulp.src('./dist/ingenico.css')
        .pipe(uncss({
            ignore: ['.ign-outer-wrapper'],
            html: [
                './src/views/bancontact.html',
                './src/views/giropay.html',
                './src/views/ideal.html',
                './src/views/index.html',
                './src/views/mastercard.html',
                './src/views/visa.html',
                './src/views/waitmsg.html'
            ]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('ingenico.min.css'))
		.pipe(header(banner, {pkg : pkg }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['minify-html', 'styles', 'process-css']);
