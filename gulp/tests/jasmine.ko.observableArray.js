/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.knockout.observableArray.filename;
var specifications = global.tests.specifications.knockout.observableArray.sources;
var destinationFolder = global.tests.folders.specifications;

// ---------------------------------

gulp.task("bundle-observableArray-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-observableArray", function(callback) {
    runPhantom("tests/knockout/observableArray/runner.html", callback);
});