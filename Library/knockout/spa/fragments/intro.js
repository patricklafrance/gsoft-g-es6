function() {
    "use strict";

    var gsoft = null;
    var spa = {};

    if (typeof module === "object") {
        gsoft = require("gsoft");
    } 
    else if (typeof window === "object") {
        if (window.GSOFT_UNIT_TESTS === true) {
            gsoft = window.gsoft;
        }
    }

    // Namespace for private functions shared accross modules.
    var _ = spa._ = {};