// Namespace
// ---------------------------------

(function() {
    // summary:
    //          Create one or more new namespaces or extend existings. 
    // arguments:
    //          An infinite number of string representing the namespace to create. A namespace
    //          level is represent by a dot ('.').
    // example:
    //          gsoft.namespace("gsoft.administration")
    //          gsoft.namespace("gsoft.hr", "gsoft.hr.team", ...)
    gsoft.namespace = function() {
        var o = null;
        var i = null;
        var j = null;
        var d = null;

        for (i = 0; i < arguments.length; i = i + 1) {
            d = arguments[i].split(".");
            o = window[d[0]] = window[d[0]] || {};

            for (j = 1; j < d.length; j = j + 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }

        return o;
    };
})();