/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var indent = require("gulp-indent");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var sources = global.scripts.files.knockout.observableArray.sources;
var destinationFolder = global.scripts.folders.distribution.knockout;

// ---------------------------------

function bundle(gulp, filename) {
    return gulp
        .src(sources)
        .pipe(concat(filename, { newLine: "\r\n\r\n" }));
}

gulp.task("bundle-observable-array-scripts-debug", function() {
    var stream = bundle(gulp, "gsoft.ko.observableArray.js");
    
    return stream
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("bundle-observable-array-scripts-release", function() {
    var stream = bundle(gulp, "gsoft.ko.observableArray.min.js");
    
    return stream
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));
});