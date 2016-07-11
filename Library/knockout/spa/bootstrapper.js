// Bootstrapper
// ---------------------------------

(function(mediator, shell) {
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
            shell.setApplicationRootRoute(route);

            return this;
        },

        use404Route: function(route) {
            shell.set404Route(route);

            return this;
        },

        onError: function(callback, predicate) {
            shell.onError(callback, predicate);

            return this;
        },

        onPageChanging: function(callback, predicate) {
            shell.onPageChanging(callback, predicate);

            return this;
        },

        onPageChanged: function(callback, predicate) {
            shell.onPageChanged(callback, predicate);

            return this;
        },

        onBeforeHttpRequest: function(callback) {
            mediator.subscribe(spa.Channel.HttpBeforeRequest, function() {
                callback.apply(null, arguments);
            });

            return this;
        },

        onHttpRequestSucceeded: function(callback) {
            mediator.subscribe(spa.Channel.HttpRequestSucceeded, function() {
                callback.apply(null, arguments);
            });

            return this;
        },

        onHttpRequestCompleted: function(callback) {
            mediator.subscribe(spa.Channel.HttpRequestCompleted, function() {
                callback.apply(null, arguments);
            });

            return this;
        },

        start: function(options) {
            shell.start(options);

            return this;
        }
    };
})(gsoft.mediator,
   spa.shell);