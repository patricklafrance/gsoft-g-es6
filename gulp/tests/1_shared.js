/* jshint -W097, -W079 */

"use strict";

var spawn = require("child_process").spawn;

global.tests = {
    specifications: {},
    folders: {}
};

global.tests.folders.specifications = "tests/specifications";

global.tests.specifications.core = {
    filename: "core.specifications.js",
    sources: [
        "tests/core/utils.js",
        "tests/core/string.js",
        "tests/core/array.js",
        "tests/core/error.js",
        "tests/core/ensure.js",
        "tests/core/date.js",
        "tests/core/namespace.js",
        "tests/core/noconflict.js",
        "tests/core/mediator.js"
    ]
};

global.tests.specifications.core.legacy = {
    filename: "core.legacy.specifications.js",
    sources: [
        "tests/core/legacy/utils.js",
        "tests/core/legacy/ensure.js",
        "tests/core/legacy/date.js",
        "tests/core/legacy/mediator.js"
    ]
};

global.tests.specifications.core.widgets = {
    filename: "core.widgets.specifications.js",
    sources: [
        "tests/core/widgets/notifier.js"
    ]
};

global.tests.specifications.knockout = {};

global.tests.specifications.knockout.spa = {
    filename: "ko.spa.specifications.js",
    sources: [
        "tests/knockout/spa/utils.js",
        "tests/knockout/spa/ensure.js",
        "tests/knockout/spa/route.js",
        "tests/knockout/spa/route.registry.js",
        "tests/knockout/spa/route.resolver.js",
        "tests/knockout/spa/router.js",
        "tests/knockout/spa/service.registry.js",
        "tests/knockout/spa/view.provider.js",
        "tests/knockout/spa/binders/composite.viewmodel.binder.js",
        "tests/knockout/spa/binders/simple.viewmodel.binder.js",
        "tests/knockout/spa/module.activator.js",
        "tests/knockout/spa/shell.js",
        "tests/knockout/spa/integration.simpleViewModelBinder.js",
        "tests/knockout/spa/integration.compositeViewModelBinder.js",
        "tests/knockout/spa/integration.withoutViewModelBinder.js",
        "tests/knockout/spa/integration.aliasjs",
        "tests/knockout/spa/integration.events.js",
        "tests/knockout/spa/binding.action.js",
        "tests/knockout/spa/page.viewmodel.js",
        "tests/knockout/spa/component.loader.js"
    ]
};

global.tests.specifications.knockout.spa.es6 = {
    filename: "ko.spa.es6.specifications.js",
    sources: [
        "tests/knockout/spa-es6/page.viewmodel.js"
    ]
};

global.tests.specifications.knockout.spa.services = {
    filename: "ko.spa.services.specifications.js",
    sources: [
        "tests/knockout/spa-services/service.http.js",
        "tests/knockout/spa-services/service.objectNavigator.js"
    ]
};

global.tests.specifications.knockout.bindings = {
    filename: "ko.bindings.specifications.js",
    sources: [
        "tests/knockout/bindings/href.js",
        "tests/knockout/bindings/src.js",
        "tests/knockout/bindings/hidden.js",
        "tests/knockout/bindings/toggle.js",
        "tests/knockout/bindings/click.js",
        "tests/knockout/bindings/disabledCssClass.js",
        "tests/knockout/bindings/disabledText.js",
        "tests/knockout/bindings/optionsBooleanValue.js"
    ]
};

global.tests.specifications.knockout.observableArray = {
    filename: "ko.observableArray.specifications.js",
    sources: [
        "tests/knockout/observableArray/observableArray.extensions.js"
    ]
};

global.tests.specifications.knockout.debugging = {
    filename: "ko.debugging.specifications.js",
    sources: [
        "tests/knockout/debugging/binding.toJson.js",
        "tests/knockout/debugging/binding.toConsole.js",
        "tests/knockout/debugging/observable.extensions.js"
    ]
};

global.tests.runPhantom = function(runner, callback) {
    if (global.isTeamCity) {
        runner = runner + "?teamcity=1";
    } else if (global.isVisualStudio) {
        runner = runner + "?visual-studio=1";
    }

    var child = spawn("external/phantom/phantomjs.exe", ["tests/phantom/runner.js", runner], { stdio: "inherit" });

    child.on("close", function() {
        callback();
    });
};