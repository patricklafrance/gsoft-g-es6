// Shared privates
// ---------------------------------

(function() {
    // Caching the shift array prototype function give a small performance boost.
    // This is used when manipulating function arguments. Since arguments is
    // an "Array like" it doesn't implements the native array manipulation functions.
    var shift = Array.prototype.shift;

    _.formatString = function() {
        var args = arguments;
        var format = shift.apply(args);

        return format.replace(/\{(\d+)\}/g, function(m, n) {
            return args[n];
        });
    };
})();