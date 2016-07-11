"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var babel = require("gulp-babel");

var runPhantom = global.tests.runPhantom;

var filename = global.tests.specifications.core.widgets.filename;
var specifications = global.tests.specifications.core.widgets.sources;
var destinationFolder = global.tests.folders.specifications;

// ---------------------------------

gulp.task("bundle-core-widgets-specifications", function() {
    return gulp
        .src(specifications)
        .pipe(babel({
			presets: ["es2015"]
		}))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("jasmine-core-widgets", function(callback) {
    runPhantom("tests/core/widgets/runner.html", callback);
});