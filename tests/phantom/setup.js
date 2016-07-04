(function() {
    "use strict";
    
    if (/PhantomJS/.test(navigator.userAgent)) {
        var phantomReporter = null;

        if (window.location.href.indexOf("teamcity") !== -1) {
            phantomReporter = new jasmineReporters.PhantomTeamCityReporter({
                print: function(message) {
                    console.log(message);
                }
            });
        } else if (window.location.href.indexOf("visual-studio") !== -1) {
            phantomReporter = new jasmineReporters.PhantomVisualStudioReporter({
                print: function(message) {
                    console.log(message);
                }
            });
        } else {
            phantomReporter = new jasmineReporters.PhantomConsoleReporter({
                print: function(message) {
                    console.log(message);
                }
            });
        }

        jasmine.getEnv().addReporter(phantomReporter);
    }
})();