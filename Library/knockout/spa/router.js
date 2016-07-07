// Hash router
// ---------------------------------

(function(utils, mediator) {
    spa.router = {
        // summary:
        //         Ensure that a @parameter respect the specified assertions.
        // url: String
        //         The URL of the route.
        // callback: Function
        //         An handler to call everytime the route is triggered.
        // options: Object
        //         An optional object that contains additional informations about the route.
        //
        //         isDefault: Determine if the route is the landing route.
        //         onEnter: An handler to call everytime the route is entered.
        //         onExit: An handler to call everytime the route is left.
        // returns:
        //         An object that contains informations about the route and a function to 
        //         execute the route.
        addRoute: function(url, callback, options) {
            gsoft.ensure(url, "url", "Router.addRoute").isNotNullOrEmpty();
            gsoft.ensure(callback, "callback", "Router.addRoute").isFunction();

            var route = Path.map(url).to(function() {
                utils.trace(_.formatString("[SHELL] Entered route {0}", url));

                mediator.publishSilently("g-spa-enteredRoute", {
                    url: url,
                    parameters: this.params
                });

                callback.apply(null, [url, this.params]);
            });
                
            utils.trace(_.formatString("[SHELL] {0} route has been registred", url));
            
            options = options || {};

            route.exit(function(canExitCallback) {
                utils.trace(_.formatString("[SHELL] Exited route {0}", url));

                mediator.publishSilently("g-spa-exitedRoute", url);

                if (utils.isFunction(options.onExit)) {
                    return options.onExit(url, canExitCallback);
                }
                
                return false;
            });
            
            return {
                url: url,
                run: function() {
                    route.run();
                }
            };
        },

        // summary:
        //         Triggered the route matching the @url.
        // url: String
        //         The URL of the route.
        runRoute: function(url) {
            gsoft.ensure(url, "url", "Router.runRoute").isNotNullOrEmpty();

            var route = Path.match(url, true);

            if (utils.isNull(route)) {
                throw new gsoft.ArgumentError(_.formatString("Router.runRoute - {0} does not match any registered route", url));
            }

            route.run();
        },

        // summary:
        //         Set a @route as the application root.
        // route: String
        //         A route.
        setRoot: function(route) {
            gsoft.ensure(route, "route", "Router.setDefaultRoute").isNotNullOrEmpty();

            Path.root(route);

            utils.trace(_.formatString("[SHELL] {0} is the default route", route));
        },

        // summary:
        //         Set an @handler to call everytime an unregistered URL is entered.
        // handler: Function
        //         An handler.
        set404Handler: function(handler) {
            gsoft.ensure(handler, "handler", "Router.set404Handler").isFunction();

            Path.rescue(handler);
        },
        
        // summary:
        //         Starts the routing engine.
        start: function() {
            utils.trace("[SHELL] Starting router");

            Path.listen();
        }
    };
})(gsoft.utils,
   gsoft.mediator);