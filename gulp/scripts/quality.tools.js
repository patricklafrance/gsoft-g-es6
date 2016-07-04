/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");

var f = global.scripts.files;

var files = f.core.sources
    .concat(f.core.legacy.sources)
    .concat(f.knockout.bindings.sources)
    .concat(f.knockout.debugging.sources)
    .concat(f.knockout.observableArray.sources)
    .concat(f.knockout.spa.sources)
    .concat(f.knockout.spa.es6.sources)
    .concat(f.knockout.spa.services.sources);

// ---------------------------------

gulp.task("cs", function() {
    return gulp
        .src(files)
        .pipe(jscs());
});

gulp.task("lint", function() {
    var reporterName = "jshint-summary";

    if (global.isTeamCity) {
        reporterName = "jshint-teamcity";
    } else if (global.isVisualStudio) {
        reporterName = "jshint-visual-studio";
    }

    var reporterOptions = {
        verbose: true,
        reasonCol: "cyan,bold"
    };

    return gulp
        .src(files)
        .pipe(jshint())
        .pipe(jshint.reporter(reporterName, reporterOptions))
        .pipe(jshint.reporter("fail"));
});