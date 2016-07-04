/* jshint -W097, -W079 */

"use strict";

var del = require("del");
var gulp = require("gulp");

var core = global.scripts.folders.distribution.core;
var knockout = global.scripts.folders.distribution.knockout;

// ---------------------------------

gulp.task("clean-scripts", function(callback) {
    del([core, knockout], callback);
});