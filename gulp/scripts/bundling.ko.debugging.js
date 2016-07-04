/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var indent = require("gulp-indent");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var sources = global.scripts.files.knockout.debugging.sources;
var fragments = global.scripts.files.knockout.debugging.fragments;
var destinationFolder = global.scripts.folders.distribution.knockout;

// ---------------------------------

function bundle(gulp, filename) {
    return gulp
        .src(sources)
        .pipe(indent({ tabs: false, amount: 4 }))
        .pipe(addsrc.prepend(fragments.pre))
        .pipe(addsrc.append(fragments.post))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }));
}

gulp.task("bundle-debugging-scripts-debug", function() {
    var stream = bundle(gulp, "gsoft.ko.debugging.js");
    
    return stream
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("bundle-debugging-scripts-release", function() {
    var stream = bundle(gulp, "gsoft.ko.debugging.min.js");
    
    return stream
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));
});