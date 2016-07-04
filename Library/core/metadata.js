// Metadata
// ---------------------------------

(function() {
    gsoft.version = "@@VERSION@@";
    
    // When true, additional informations will be output to the console and additional function will be visible 
    // on the library objects.
    gsoft.debug = false;
    
    if (_.isBrowser()) {
        // When true, the shims are always use instead of the native functions. This is usefull to test all the shims in any browsers.
        // To active add an attribute "data-force-shims" with the value "true" to the script tag of this library.
        var scriptElement = document.querySelector("script[src*=\"gsoft.js\"][data-force-shims=\"true\"]");

        if (scriptElement) {
            gsoft.forceShims = true;
        }
    }
})();