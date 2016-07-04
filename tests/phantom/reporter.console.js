(function(global) {
    var exportObject = null;

    if (typeof module !== "undefined" && module.exports) {
        exportObject = exports;
    } else {
        exportObject = global.jasmineReporters = global.jasmineReporters || {};
    }
    
    exportObject.PhantomConsoleReporter = function(options) {
        var includeStackTrace = options.includeStackTrace || false;
        var specificationCount;
        var failureCount;
        var failedSpecifications = [];
        var pendingCount;

        var ansi = {
            green: "\x1B[32m",
            red: "\x1B[31m",
            yellow: "\x1B[33m",
            none: "\x1B[0m"
        };

        this.jasmineStarted = function() {
            specificationCount = 0;
            failureCount = 0;
            pendingCount = 0;
        };

        this.jasmineDone = function() {
            printNewline();

            if (failedSpecifications.length > 0) {
                printNewline();
                print("Failures: ");
                printNewline();
            }

            for (var i = 0; i < failedSpecifications.length; i += 1) {
                printSpecificationFailureDetails(i, failedSpecifications[i]);
                printNewline();
            }

            printSummary();
            printNewline();

            print("##TEST_ENDED##");
        };

        this.specDone = function(result) {
            specificationCount += 1;

            if (result.status === "pending") {
                pendingCount += 1;

                print(colored("yellow", "*"));
            } 
            else if (result.status === "passed") {
                print(colored("green", "."));
            } 
            else if (result.status === "failed") {
                failureCount += 1;
                failedSpecifications.push(result);

                print(colored("red", "F"));
            }
        };

        function print(message) {
            options.print(message);
        }

        function printNewline() {
            options.print("\n");
        }

        function printSpecificationFailureDetails(index, result) {
            printNewline();
            print((index + 1) + ") ");
            print(result.fullName);

            for (var i = 0; i < result.failedExpectations.length; i += 1) {
                var failedExpectation = result.failedExpectations[i];

                printNewline();
                print(indent((index + 1) + "." + (i + 1) + ") ", 0));
                print(colored("red", failedExpectation.message));

                if (includeStackTrace) {
                    printNewline();
                    print(indent(failedExpectation.stack, 4));
                }
            }

            printNewline();
        }

        function printSummary() {
            var summary = specificationCount + " " + pluralize("specification", specificationCount) + ", " + failureCount + " " + pluralize("failure", failureCount);

            if (pendingCount) {
                summary += ", " + pendingCount + " pending " + pluralize("specification", pendingCount);
            }

            printNewline();
            print(summary);
            printNewline();
        }

        function colored(color, str) {
            return ansi[color] + str + ansi.none;
        }

        function indent(str, spaces) {
            var lines = (str || "").split("\n");
            var newArray = [];

            for (var i = 0; i < lines.length; i += 1) {
                newArray.push(repeat(" ", spaces).join("") + lines[i]);
            }

            return newArray.join("\n");
        }

        function pluralize(str, count) {
            return count == 1 ? str : str + "s";
        }

        function repeat(thing, times) {
            var array = [];

            for (var i = 0; i < times; i + 1) {
                array.push(thing);
            }

            return array;
        }
    };
})(this);
