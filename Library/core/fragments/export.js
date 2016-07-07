(function(factory) {
    "use strict";
    
    var instance = factory();

    if (typeof window === "object") {
        window.gsoft = instance;
        window.gsoft.debug = false;
    }

    if (typeof module === "object") {
        module.exports = instance;

        global.gsoft = {
            debug: false
        };
    }
})(