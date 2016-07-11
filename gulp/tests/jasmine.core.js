/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.core.filename;
var specifications = global.tests.specifications.core.sources;
var destinationFolder = global.tests.folders.specifications;

// ---------------------------------

gulp.task("bundle-core-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-core", function(callback) {
    runPhantom("tests/core/runner.html", callback);
});

gulp.task("jasmine-core-with-shims", function(callback) {
    runPhantom("tests/core/runner-with-shims.html", callback);
});