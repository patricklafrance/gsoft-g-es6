/* jshint -W097, -W079 */

"use strict";

var del = require("del");
var gulp = require("gulp");

// ---------------------------------

gulp.task("clean-specifications", function(callback) {
    del([global.tests.folders.specifications], callback);
});