(function(factory) {
    "use strict";
    
    var instance = factory();

    if (typeof window === "object") {
        if (window.GSOFT_UNIT_TESTS === true) {
            window.gsoft.spa.services = instance;
        }
    }

    if (typeof module === "object") {
        module.exports = instance;
    }
})(