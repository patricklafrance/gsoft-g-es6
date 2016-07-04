﻿/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var indent = require("gulp-indent");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var sources = global.scripts.files.knockout.bindings.sources;
var fragments = global.scripts.files.knockout.bindings.fragments;
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

gulp.task("bundle-bindings-scripts-debug", function() {
    var stream = bundle(gulp, "gsoft.ko.bindings.js");
    
    return stream
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("bundle-bindings-scripts-release", function() {
    var stream = bundle(gulp, "gsoft.ko.bindings.min.js");
    
    return stream
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));
});