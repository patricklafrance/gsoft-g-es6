"use strict";

var gulp = require("gulp");

var sources = global.scripts.files.knockout.spa.typescript.sources;
var destinationFolder = global.scripts.folders.distribution.knockout;

// ---------------------------------

gulp.task("bundle-spa-typescript-scripts-debug", function () {
    return gulp.src(sources)
        .pipe(gulp.dest(destinationFolder));
});

gulp.task("bundle-spa-typescript-scripts-release", function() {
    return gulp.src(sources)
        .pipe(gulp.dest(destinationFolder));
});