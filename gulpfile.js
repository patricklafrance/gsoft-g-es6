/* jshint -W097, -W079 */

"use strict";

var sequence = require("run-sequence");

var gulp = require("gulp");
var util = require("gulp-util");

// ---------------------------------

global.version = "0.0.0";

global.isTeamCity = false;
global.isVisualStudio = false;

// ---------------------------------

require("require-dir")("./gulp", { 
    recurse: true 
});

// ---------------------------------

gulp.task("dev", function(callback) {
    if (util.env["visual-studio"]) {
        global.isVisualStudio = true;
    }

    sequence("lint", "cs", "clean-scripts", "bundle-debug", "jasmine-dev", callback);

    // sequence("lint", "cs", "clean-scripts", "bundle-debug", "exports-core-works", "jasmine-dev", callback);
});

gulp.task("release", function(callback) {
    if (util.env["teamcity"]) {
        global.isTeamCity = true;
    }

    if (util.env["visual-studio"]) {
        global.isVisualStudio = true;
    }
    
    if (util.env["build-version"]) {
        global.version = util.env["build-version"];
    }
    
    sequence("lint", "cs", "clean-scripts", "bundle-debug", "exports-core-works", "bundle-release", callback);
});

gulp.task("ci", function(callback) {
    if (util.env["teamcity"]) {
        global.isTeamCity = true;
    }

    sequence("lint", "cs", "clean-scripts", "bundle-debug", "exports-core-works", "jasmine", callback);
});

gulp.task("default", ["dev"], function() {});