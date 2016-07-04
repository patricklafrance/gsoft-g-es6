/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");
var addsrc = require("gulp-add-src");
var indent = require("gulp-indent");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");

var notifierSources = global.scripts.files.core.widgets.sources.notifier;

var fragments = global.scripts.files.core.widgets.fragments;
var destinationFolder = global.scripts.folders.distribution.core + "/widgets";

// ---------------------------------

function bundleScripts(file, gulp, filename) {
    return gulp
        .src(file)
        .pipe(addsrc.prepend(fragments.pre))
        .pipe(addsrc.append(fragments.post))
        .pipe(concat(filename, { newLine: "\r\n\r\n" }));
}

function bundleNotifier(isRelease) {
    var notifierScripts = bundleScripts(notifierSources[0], gulp, "gsoft.widgets.notifier.js");

    if (isRelease) {
        notifierScripts.pipe(gulp.dest(destinationFolder));
    }

    var notifierCss = gulp
        .src(notifierSources[1]);

    if (isRelease) {
        notifierCss.pipe(cssnano());
    }

    notifierCss
        .pipe(rename("gsoft.widgets.notifier.sample.css"))
        .pipe(gulp.dest(destinationFolder));

    return [notifierScripts, notifierCss];
}



gulp.task("bundle-core-widgets-scripts-debug", function() {
    var notifierScripts = bundleScripts(notifierSources[0], gulp, "gsoft.widgets.notifier.js")
        .pipe(gulp.dest(destinationFolder));

    var notifierCss = gulp
        .src(notifierSources[1])
        .pipe(rename("gsoft.widgets.notifier.sample.css"))
        .pipe(gulp.dest(destinationFolder));

    return [notifierScripts, notifierCss];
});

gulp.task("bundle-core-widgets-scripts-release", function() {
    var notifierScripts = bundleScripts(notifierSources[0], gulp, "gsoft.widgets.notifier.min.js")
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));

    var notifierCss = gulp
        .src(notifierSources[1])
        .pipe(cssnano())
        .pipe(rename("gsoft.widgets.notifier.sample.min.css"))
        .pipe(gulp.dest(destinationFolder));

    return [notifierScripts, notifierCss];
});