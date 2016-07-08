function() {
    "use strict";

    var gsoft = null;
    var spa = null;

    if (typeof module === "object") {
        gsoft = require("gsoft");
        spa = require("gsoft-ko-spa");
    } 
    else if (typeof window === "object") {
        if (window.GSOFT_UNIT_TESTS === true) {
            gsoft = window.gsoft;
            spa = window.gsoft.spa;
        }
    }