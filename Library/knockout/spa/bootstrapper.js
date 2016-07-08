// Bootstrapper
// ---------------------------------

(function() {
    spa.bootstrapper = {
        requireAll: function(context) {
            context.keys().forEach(context);

            return this;
        },

        useCustomComponentLoader: function() {
            ko.components.loaders.unshift(spa.componentLoader);

            return this;
        },

        useApplicationRootRoute: function(route) {
            spa.shell.setApplicationRootRoute(route);

            return this;
        },

        use404Route: function(route) {
            spa.shell.set404Route(route);

            return this;
        },

        onError: function(callback, predicate) {
            spa.shell.onError(callback, predicate);

            return this;
        },

        onPageChanging: function(callback, predicate) {
            spa.shell.onPageChanging(callback, predicate);

            return this;
        },

        onPageChanged: function(callback, predicate) {
            spa.shell.onPageChanged(callback, predicate);

            return this;
        },

        start: function(options) {
            spa.shell.start(options);

            return this;
        }
    };
})();