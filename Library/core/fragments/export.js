(function(factory) {
    "use strict";
    
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        var instance = factory();

        // CommonJS.
        if (typeof exports === "object") {
            /* jshint -W020 */
            exports = instance;
            /* jshint +W020 */
        }
        
        // Node.js and Browserify.
        if (typeof module === "object") {
            module.exports = instance;
        }
    }
    else if (typeof define === "function" && define.amd) {
        // AMD.
        define("gsoft", [], factory);
    } 
    else {
        var target = null;
        
        if (typeof global === "object") {
            target = global;
        } else {
            target = window;
        }

        // Expose globally.
        target.gsoft = factory();
        
        // Map over the actual "g" in case of overwrite.
        var _g = target.g;

        // Expose as a "g".
        target.g = target.gsoft;

        // summary:
        //         Rollback the "g" alias and restore the old value to target.g.
        // description:
        //        This function is only available if the library is not loaded throught a module
        //        system since the library will not be exposed globally.
        // returns:
        //         The library.
        target.gsoft.noConflict = function() {
            if (target.g === target.gsoft) {
                target.g = _g;
            }

            return target.gsoft;
        };
    }
})(