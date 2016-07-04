/* jshint -W097 */

"use strict";

var system = require("system");

if (system.args.length < 2) {
    fail("To run jasmine test using Phantom you must specify the URL of the HTML tests runner and the reporter to use.");
}

var page = require("webpage").create();

var url = system.args[1];
var lastResourceError = null;

page.onError = function(message, trace) {
    var error = message;

    if (trace && trace.length) {
        trace.forEach(function(traceEntry) {
            error = error + "\n";
            error = error + traceEntry.file + ": " + traceEntry.line + (traceEntry.function ? " (in function \"" + traceEntry.function + "\")" : "");
        });
    }

    fail(error);
};

page.onResourceError = function(resourceError) {
    lastResourceError = resourceError;
};

page.onConsoleMessage = function(message) {
    if (message.indexOf("##TEST_ENDED##") !== -1) {
        // Workaround for the message "Unsafe JavaScript attempt to access frame with URL from frame with URL";
        setTimeout(function() {
            exit();
        }, 0);
    } else {
        write(message);
    }
};

page.open(url, function(status) {
    if (status !== "success") {
        fail("Error opening url \"" + lastResourceError.url + "\"\n" + lastResourceError.errorString + ".");
    }
});

function fail(reason) {
    setTimeout(function() {
        writeLine(reason);
        exit(1);
    }, 0);
}

function exit(code) {
    if (typeof code === "undefined") {
        phantom.exit(0);
    } else {
        phantom.exit(code);
    }
}

function write(text) {
    system.stdout.write(text);
}

function writeLine(text) {
    system.stdout.writeLine(text);
}
