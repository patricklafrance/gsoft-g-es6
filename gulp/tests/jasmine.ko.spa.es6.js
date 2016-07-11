"use strict";

var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var runPhantom = global.tests.runPhantom;

var sources = global.scripts.files.knockout.spa.es6.sources;
var fragments = global.scripts.files.knockout.spa.es6.fragments;
var sourcesDestinationFolder = global.scripts.folders.distribution.knockout;

var filename = global.tests.specifications.knockout.spa.es6.filename;
var specifications = global.tests.specifications.knockout.spa.es6.sources;
var specificationsDestinationFolder = global.tests.folders.specifications;

// ---------------------------------

// This is bundled in the test code because it needs to be transpiled by Babel to be usable
// in the specifications.
gulp.task("bundle-spa-es6-scripts-for-tests", function() {
    return gulp
        .src(sources)
        .pipe(addsrc.prepend(fragments.pre))
        .pipe(addsrc.append(fragments.post))
        .pipe(concat("gsoft.ko.spa.es6.js", { newLine: "\r\n\r\n" }))
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(gulp.dest(sourcesDestinationFolder));
});

gulp.task("bundle-spa-es6-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(sourcemaps.init())
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(specificationsDestinationFolder));
});

gulp.task("jasmine-spa-es6", function(callback) {
    runPhantom("tests/knockout/spa-es6/runner.html", callback);
});