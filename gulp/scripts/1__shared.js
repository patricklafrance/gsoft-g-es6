/* jshint -W097, -W079 */

"use strict";

global.scripts = {
    files: {},
    folders: {}
};

global.scripts.folders.distribution = {
    core: "dist/core",
    knockout: "dist/knockout"
};

global.scripts.files.core = {
    sources: [
        "library/core/privates.js",
        "library/core/metadata.js",
        "library/core/utils.js",
        "library/core/error.js",
        "library/core/ensure.js",
        "library/core/mediator.js"
    ],
    fragments: {
        pre: ["library/core/fragments/notes.js", "library/core/fragments/export.js", "library/core/fragments/intro.js"],
		post: ["library/core/fragments/outro.js"]
    }
};

global.scripts.files.core.widgets = {
    sources: {
        notifier: ["library/core/widgets/notifier.js", "library/core/widgets/notifier.sample.css"]
    },
    fragments: {
        pre: ["library/core/widgets/fragments/notes.js"],
        post: []
    }
};

global.scripts.files.knockout = {};

global.scripts.files.knockout.spa = {
    sources: [
        "library/knockout/spa/constants.js",
        "library/knockout/spa/utils.js",
        "library/knockout/spa/ensure.js",
        "library/knockout/spa/mediator.js",
        "library/knockout/spa/route.js",
        "library/knockout/spa/route.registry.js",
        "library/knockout/spa/route.resolver.js",
        "library/knockout/spa/router.js",
        "library/knockout/spa/view.provider.js",
        "library/knockout/spa/view.renderer.js",
        "library/knockout/spa/binders/base.viewmodel.binder.js",
        "library/knockout/spa/binders/dummy.viewmodel.binder.js",
        "library/knockout/spa/binders/composite.viewmodel.binder.js",
        "library/knockout/spa/binders/simple.viewmodel.binder.js",
        "library/knockout/spa/view.renderer.js",
        "library/knockout/spa/service.registry.js",
        "library/knockout/spa/shell.js",
        "library/knockout/spa/binding.action.js",
        "library/knockout/spa/page.viewmodel.js",
        "library/knockout/spa/page.context.js",
        "library/knockout/spa/component.loader.js"
    ],
    fragments: {
        pre: ["library/knockout/spa/fragments/notes.js", "library/knockout/spa/fragments/intro.js"],
        post: ["library/knockout/spa/fragments/outro.js"]
    }
};

global.scripts.files.knockout.spa.es6 = {
    sources: [
        "library/knockout/spa-es6/page.viewmodel.js"
    ],
    fragments: {
        pre: ["library/knockout/spa-es6/fragments/notes.js", "library/knockout/spa-es6/fragments/intro.js"],
        post: ["library/knockout/spa-es6/fragments/outro.js"]
    }
};

global.scripts.files.knockout.spa.typescript = {
    sources: [
        "library/knockout/spa-typescript/gsoft.ko.spa.typescript.ts"
    ]
};

global.scripts.files.knockout.spa.services = {
    sources: [
        "library/knockout/spa-services/service.http.js",
        "library/knockout/spa-services/service.objectNavigator.js"
    ],
    fragments: {
        pre: ["library/knockout/spa-services/fragments/notes.js", "library/knockout/spa-services/fragments/intro.js"],
        post: ["library/knockout/spa-services/fragments/outro.js"]
    }
};

global.scripts.files.knockout.bindings = {
    sources: [
        "library/knockout/bindings/href.js",
        "library/knockout/bindings/src.js",
        "library/knockout/bindings/hidden.js",
        "library/knockout/bindings/toggle.js",
        "library/knockout/bindings/click.js",
        "library/knockout/bindings/disabledCssClass.js",
        "library/knockout/bindings/disabledText.js",
        "library/knockout/bindings/optionsBooleanValue.js"
    ],
    fragments: {
        pre: ["library/knockout/bindings/fragments/notes.js", "library/knockout/bindings/fragments/intro.js"],
        post: ["library/knockout/bindings/fragments/outro.js"]
    }
};

global.scripts.files.knockout.observableArray = {
    sources: [
        "library/knockout/observableArray/observableArray.extensions.js"
    ]
};


global.scripts.files.knockout.debugging = {
    sources: [
        "library/knockout/debugging/binding.toConsole.js",
        "library/knockout/debugging/binding.toJson.js",
        "library/knockout/debugging/observable.extensions.js"
    ],
    fragments: {
        pre: ["library/knockout/debugging/fragments/notes.js", "library/knockout/debugging/fragments/intro.js"],
        post: ["library/knockout/debugging/fragments/outro.js"]
    }
};