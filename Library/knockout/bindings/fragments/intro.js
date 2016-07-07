(function() {
    "use strict";

    var gsoft = null;

    if (typeof require === "object") {
        gsoft = require("gsoft");
    } else if (typeof window === "object") {
        gsoft = window.gsoft;
    }