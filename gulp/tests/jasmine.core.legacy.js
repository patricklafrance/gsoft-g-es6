/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.core.legacy.filename;
var specifications = global.tests.specifications.core.legacy.sources;
var destinationFolder = global.tests.folders.specifications;

// ---------------------------------

gulp.task("bundle-core-legacy-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-core-legacy", function(callback) {
    runPhantom("tests/core/legacy/runner.html", callback);
});

gulp.task("jasmine-core-legacy-with-shims", function(callback) {
    runPhantom("tests/core/legacy/runner-with-shims.html", callback);
});