(function(global) {
    var exportObject = null;

    if (typeof module !== "undefined" && module.exports) {
        exportObject = exports;
    } else {
        exportObject = global.jasmineReporters = global.jasmineReporters || {};
    }
    
    exportObject.PhantomTeamCityReporter = function(options) {
        this.jasmineDone = function() {
            print("##TEST_ENDED##");
        };

        this.suiteStarted = function(suite) {
            printTeamCity("testSuiteStarted", {
                name: suite.description,
                captureStandardOutput:  "true"
            });
        };

        this.suiteDone = function(suite) {
            printTeamCity("testSuiteFinished", {
                name: suite.description
            });
        };

        this.specStarted = function(specification) {
            printTeamCity("testStarted", {
                name: specification.description,
                captureStandardOutput: "true"
            });
        };

        this.specDone = function(specification) {
            if (specification.status === "pending" || specification.status === "disabled") {
                printTeamCity("testIgnored", {
                    name: specification.description
                });
            }
            else if (specification.status === "failed" && specification.failedExpectations.length > 0) {
                // TeamCity specifies there should only be a single "testFailed" message, so we'll only grab the first failedExpectation
                var failedExpectation = specification.failedExpectations[0];

                printTeamCity("testFailed", {
                    name: specification.description,
                    message: failedExpectation.message,
                    details: failedExpectation.stack
                });
            }

            printTeamCity("testFinished", {
                name: specification.description
            });
        };

        function print(message) {
            options.print(message);
        }

        function printTeamCity(message, attributes) {
            var str = "##teamcity[" + message;

            if (typeof(attributes) === "object") {
                for (var property in attributes) {
                    if (attributes.hasOwnProperty(property)) {
                        str += " " + property + "='" + escapeTeamCityString(attributes[property]) + "'";
                    }
                }
            }

            str += "]";

            print(str);
        }

        function escapeTeamCityString(message) {
            if (!message) {
                return "";
            }

            return message.toString().replace(/\|/g, "||")
                .replace(/\'/g, "|'")
                .replace(/\n/g, "|n")
                .replace(/\r/g, "|r")
                .replace(/\u0085/g, "|x")
                .replace(/\u2028/g, "|l")
                .replace(/\u2029/g, "|p")
                .replace(/\[/g, "|[")
                .replace(/]/g, "|]");
        }
    };
})(this);
