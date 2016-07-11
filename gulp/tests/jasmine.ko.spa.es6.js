"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.knockout.spa.es6.filename;
var specifications = global.tests.specifications.knockout.spa.es6.sources;
var destinationFolder = global.tests.folders.specifications;

gulp.task("bundle-spa-es6-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-spa-es6", function(callback) {
    runPhantom("tests/knockout/spa-es6/runner.html", callback);
});