/* jshint -W097, -W079 */

"use strict";

var gulp = require("gulp");

// ---------------------------------

gulp.task("exports-core-to-node-works", function(callback) {
    var gsoft = require("../../dist/core/gsoft");

    if (!gsoft || gsoft.version.toString() !== global.version.toString()) {
        throw new Error("The core library has not been exported to node.");
    }
    
    callback();
});