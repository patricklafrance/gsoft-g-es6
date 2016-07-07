/* jshint -W097, -W079 */

"use strict";

var sequence = require("run-sequence");
var gulp = require("gulp");

// ---------------------------------

gulp.task("bundle-debug", function(callback) {
    sequence("bundle-core-scripts-debug", 
            //  "bundle-core-widgets-scripts-debug",
             "bundle-bindings-scripts-debug", 
             "bundle-observable-array-scripts-debug", 
             "bundle-debugging-scripts-debug", 
             "bundle-spa-scripts-debug", 
            //  "bundle-spa-es6-scripts-debug",
            //  "bundle-spa-services-scripts-debug", 
            //  "bundle-spa-typescript-scripts-debug",
             callback);
});

gulp.task("bundle-release", function(callback) {
    sequence("bundle-core-scripts-release", 
             "bundle-core-widgets-scripts-release",
             "bundle-bindings-scripts-release", 
             "bundle-observable-array-scripts-release", 
             "bundle-debugging-scripts-release", 
             "bundle-spa-scripts-release", 
             "bundle-spa-services-scripts-release", 
             "bundle-spa-typescript-scripts-release",
             callback);
});