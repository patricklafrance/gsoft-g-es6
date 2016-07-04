/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var indent = require("gulp-indent");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var replace = require("gulp-replace");

var sources = global.scripts.files.core.sources;
var fragments = global.scripts.files.core.fragments;
var destinationFolder = global.scripts.folders.distribution.core;

// ---------------------------------

function bundle(gulp, filename) {
    return gulp
        .src(sources)
        .pipe(indent({ tabs: false, amount: 4 }))
        .pipe(addsrc.prepend(fragments.pre))
        .pipe(addsrc.append(fragments.post))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(replace("@@VERSION@@", global.version));
}

gulp.task("bundle-core-scripts-debug", function() {
    var stream = bundle(gulp, "gsoft.js");
    
    return stream
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("bundle-core-scripts-release", function() {
    var stream = bundle(gulp, "gsoft.min.js");
    
    return stream
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));
});