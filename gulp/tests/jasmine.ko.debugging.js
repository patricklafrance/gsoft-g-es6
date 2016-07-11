/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.knockout.debugging.filename;
var specifications = global.tests.specifications.knockout.debugging.sources;
var destinationFolder = global.tests.folders.specifications;

// ---------------------------------

gulp.task("bundle-debugging-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(sourcemaps.init())
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-debugging", function(callback) {
    runPhantom("tests/knockout/debugging/runner.html", callback);
});