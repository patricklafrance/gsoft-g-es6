/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");

var runPhantom = global.tests.runPhantom;

// ---------------------------------

gulp.task("exports-core-to-require-js-works", function(callback) {
    runPhantom("tests/core/exports/runner-require-js.html", callback);
});

