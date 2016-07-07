// Shared privates
// ---------------------------------

(function() {
    _.isBrowser = function() {
        return typeof document === "object";
    };

    _.isDebug = function() {
        if (typeof window === "object") {
            return window.gsoft.debug;
        }

        return global.gsoft.debug;
    };

    _.formatString = function() {
        var args = arguments;
        var format = Array.prototype.shift.apply(args);

        return format.replace(/\{(\d+)\}/g, function(m, n) {
            return args[n];
        });
    };
})();