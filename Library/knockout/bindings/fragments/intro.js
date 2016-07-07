(function() {
    "use strict";

    var gsoft = null;

    if (typeof module === "object") {
        gsoft = require("gsoft");
    } 
    else if (typeof window === "object") {
        if (window.GSOFT_UNIT_TESTS === true) {
            gsoft = window.gsoft;
        }
    }