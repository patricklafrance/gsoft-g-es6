/* jshint -W097, -W079 */

"use strict";

var sequence = require("run-sequence");
var gulp = require("gulp");

// ---------------------------------

gulp.task("exports-core-works", function(callback) {
    sequence("exports-core-to-node-works", "exports-core-to-require-js-works", callback);
});