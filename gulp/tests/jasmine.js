/* jshint -W097, -W079 */

"use strict";

var sequence = require("run-sequence");
var gulp = require("gulp");

// ---------------------------------

gulp.task("jasmine", function(callback) {
    sequence("clean-specifications", 
         "bundle-core-specifications", 
         "bundle-core-legacy-specifications",
         "bundle-core-widgets-specifications", 
         "bundle-bindings-specifications", 
         "bundle-observableArray-specifications", 
         "bundle-debugging-specifications", 
         "bundle-spa-specifications",
         "bundle-spa-es6-specifications",
         "bundle-spa-services-specifications",
         "jasmine-core", 
         "jasmine-core-with-shims", 
         "jasmine-core-legacy", 
         "jasmine-core-legacy-with-shims",
         "jasmine-core-widgets", 
         "jasmine-bindings",
         "jasmine-debugging",
         "jasmine-observableArray",
         "jasmine-spa",
         "jasmine-spa-es6",
         "jasmine-spa-services",
         callback);
});

gulp.task("jasmine-dev", function(callback) {
    sequence("clean-specifications", 
         "bundle-core-specifications", 
         "bundle-core-legacy-specifications", 
         "bundle-core-widgets-specifications", 
         "bundle-bindings-specifications", 
         "bundle-observableArray-specifications", 
         "bundle-debugging-specifications", 
         "bundle-spa-specifications",
         "bundle-spa-es6-specifications",
         "bundle-spa-services-specifications",
         "jasmine-core", 
         "jasmine-core-legacy", 
         "jasmine-core-widgets",
         "jasmine-bindings", 
         "jasmine-debugging",
         "jasmine-observableArray",
         "jasmine-spa", 
         "jasmine-spa-es6", 
         "jasmine-spa-services", 
         callback);
});