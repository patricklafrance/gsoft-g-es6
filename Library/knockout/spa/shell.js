(function($, serviceRegistry, defaultRouter, defaultViewProvider, defaultViewRenderer, defaultRouteRegistry, defaultRouteUrlResolver, utils, ensure, mediator) {
    var shell = gsoft.spa.shell = {
        _router: null,
        _viewProvider: null,
        _viewRenderer: null,
        _routeRegistry: null,
        _routeUrlResolver: null,
        
        _debug: false,
        _started: false,
        _containerElement: null,

        // summary:
        //         Starts the application.
        // options: Object
        //      containerElement: A DOM element
        //              A DOM element that will act as a placeholder for the views content.
        //      debug: Boolean
        //              An optional boolean to determine if the application should be start in debug mode.
        //      callback: Function
        //              An optional callback that is call when the application is started. 
        start: function(options) {
            ensure(options, "options", "Shell.start").isObject();
            ensure(options.containerElement, "options.containerElement", "Shell.start").isDomElement();
            
            if (this._started) {
                throw new gsoft.InvalidOperationError("Shell.start - The Knockout SPA application has already been started.");
            }
            
            this._containerElement = options.containerElement;
            this._setDebug(options.debug);
            this._startRouter();
            this._started = true;

            if (!utils.isNull(options) && utils.isFunction(options.callback)) {
                options.callback();
            }
        },
        
        _setDebug: function(activate) {
            if (activate === true) {
                this._debug = gsoft.debug = true;
            }
        },
        
        _startRouter: function() {
            this._router.start();
        },
        
        // summary:
        //         Indicate if the application is in debug mode.
        // returns:
        //         A boolean.
        isDebug: function() {
            return this._debug;
        },
        
        // summary:
        //         Register a service.
        // options: Object
        //         name: String
        //              A service name.
        //         factory: Function
        //              A factory to create an instance of the service. When the factory function is called, the shell will be provided as parameter.         
        registerService: function(options) {
            ensure(options, "options", "Shell.registerService").isObject();
            
            serviceRegistry.add(options.name, options.factory);
        },
        
        // summary:
        //         Retrieve a service with the specified @name.
        // name: String
        //         A service name.
        // returns:
        //         A service.
        getService: function(name) {
            var factory = serviceRegistry.find(name);
            
            if (utils.isNull(factory)) {
                throw new gsoft.ArgumentError("Shell.getService - The service named {0} is not registered.".format(name));
            }
            
            return factory(this);
        },
        
        // summary:
        //         Register a page.
        // options: Object
        //          name: String
        //              An optional route name.
        //          url: String
        //              A route URL.
        //          viewUrl: String
        //              A view URL.
        //          cacheView: Boolean
        //              When false, the view will not be cached.
        //          aliases: Array
        //              An optional array with URLs (String) that will be redirected to the registered page when activated.
        //          viewModelFactory: Function
        //              A function that returns a KO view model to bind.
        //          viewModelBinder: ViewModelBinder
        //              An optional view model binder.
        registerPage: function(options) {
            ensure(options, "options", "shell.registerPage").isObject();
            
            if (!utils.isNull(options.aliases)) {
                ensure(options.aliases, "options.aliases", "Shell.aliases").isArray();
            }
            
            this._addRoute({
                name: options.name,
                url: options.url,
                viewUrl: options.viewUrl,
                viewModelBinder: options.viewModelBinder,
                viewModelFactory: options.viewModelFactory,
                cacheView: options.cacheView
            });
            
            if (utils.isArray(options.aliases)) {
                var that = this;
                
                options.aliases.forEach(function(alias) {
                    that._addAliasRoute({
                        url: alias,
                        redirectTo: {
                            name: options.name
                        }
                    });
                });
            }
        },
        
        _addRoute: function(options) {
            var that = this;
            
            // jscs:disable requireBlocksOnNewline
            ensure(options.url, "url", "Shell.registerPage").isNotNullOrEmpty();
            ensure(options.viewUrl, "viewUrl").isTrue(function(x) { return !utils.isNullOrEmpty(x) || utils.isFunction(x); }, "Shell.registerPage viewUrl must be a non empty string or a function.");
            ensure(options.viewModelBinder, "viewModelBinder", "Shell.registerPage")._isViewModelBinder();  
            // jscs:enable requireBlocksOnNewline
            
            if (utils.isNullOrEmpty(options.name)) {
                options.name = options.url;
            }
            
            if (utils.isNull(options.viewModelBinder)) {
                if (utils.isFunction(options.viewModelFactory)) {
                    options.viewModelBinder = new gsoft.spa.SimpleViewModelBinder(options.viewModelFactory);
                } else {
                    options.viewModelBinder = new gsoft.spa.DummyViewModelBinder();
                }
            }
            
            var onEnter = function(url, parameters) {
                var viewUrl = options.viewUrl;

                if (utils.isFunction(viewUrl)) {
                    viewUrl = viewUrl(parameters);
                }

                that._onEnterRoute({
                    url: options.url,
                    viewUrl: viewUrl,
                    parameters: parameters,
                    cacheView: options.cacheView,
                    viewModelBinder: options.viewModelBinder
                });
            };
            
            var onExit = function(exitedCallback, canExitCallback) {
                // The path.js exit event take an optionnal boolean return value to indicate if the exit
                // will be done asynchronously with the callback. The exit will be considered asynchronous, if true is returned.
                return that._onExitRoute(options.viewModelBinder, canExitCallback);
            };

            this._router.addRoute(options.url, onEnter, {
                onExit: onExit
            });
            
            switch (options.url) {
                case "#/":
                    this.setApplicationRootRoute("#/");
                    break;
                case "#/404":
                    this.set404Route("#/404");
                    break;
            }

            // Add the route to the shell route registry to support URL resolution.
            this._routeRegistry.add(options.name, options.url);
        },
    
        _onEnterRoute: function(options) {
            var that = this;

            this._publishPageChanging(options.url, options.viewUrl, options.parameters);

            // 1- Fetch the view and inject the response HTML into the DOM.
            // 2- Bind the KO view model to the view.
            // 3- Publish an event telling that the page transition is done.
            this._fetchView({
                url: options.viewUrl,
                useCache: options.cacheView,
                callback: function() {
                    options.viewModelBinder.bind(that._containerElement, new gsoft.spa.PageContext(that), options.parameters).done(function() {
                        that._publishPageChanged(options.url, options.viewUrl, options.parameters);
                    });
                }
            });
        },
          
        _onExitRoute: function(viewModelBinder, canExitCallback) {
            // When the browser "Back button" is click before the view model is bound to the view, it results in unbindding an unbound view model
            // which cause a failure. This check prevent that case.
            if (viewModelBinder.isBound()) {
                var that = this;
                
                var clear = function() {
                    that._viewRenderer.clear(that._containerElement);
                };
                
                // If the return value is undefined, the route will be exited normally.
                // If unbind return a value, it means that we must deal with the possibility that the route exit might be canceled by the view model. 
                // In that case the return value must be a boolean value or a promise. 
                var result = viewModelBinder.unbind();
                
                if (utils.isDefined(result)) {
                    var canExit = function() {
                        clear();
                        canExitCallback(true);
                    };
                    
                    var cannotExit = function() {
                        canExitCallback(false);
                    };
                    
                    if (utils.isBoolean(result)) {
                        if (result === true) {
                            canExit();
                        } else {
                            cannotExit();
                        }
                    } else {
                        ensure(result, "viewModelBinder.unbind", "Shell._onExitRoute")._isjQueryPromise();

                        // Exit the route.
                        result.done(function() {
                            canExit();
                        });

                        // Do not exit the route.
                        result.fail(function() {
                            cannotExit();
                        });
                    }
                    
                    return true;
                } else {
                    clear();
                }
            }
            
            return false;
        },
        
        _fetchView: function(options) {
            var that = this;
            var useCache = options.useCache;   
            
            if (utils.isUndefined(useCache)) {
                useCache = true;

                if (options.url.indexOf("?") !== -1) {
                    useCache = false;
                }
            }

            this._viewProvider.get(options.url, useCache).done(function(view) {
                that._viewRenderer.render(that._containerElement, view);
                options.callback.call(that, view);
            });
        },
            
        _addAliasRoute: function(options) {
            var that = this;
            
            this._router.addRoute(options.url, function(url, routeParameters) {
                var redirectUrl = that.getRouteUrl(options.redirectTo.name, routeParameters);
                
                utils.spa._navigate(redirectUrl);
            });
        },
        
        // summary:
        //         Set a @route as the application root.
        // route: String | Object
        //         A route that will be run everytime the root of the application is requested.
        //         If the route is an object it should follow the following specification:
        //              name: String
        //                  A route name.
        //              parameters: Object
        //                  An object that contains key / value associations for every parameters of the routes.
        setApplicationRootRoute: function(route) {
            ensure(route, "route", "Shell.setApplicationRootRoute").isNotNull();

            var routeUrl = null;

            if (utils.isString(route)) {
                ensure(route, "route", "Shell.setApplicationRootRoute").isNotEmpty();

                routeUrl = route;
            } else if (utils.isObject(route)) {
                ensure(route.name, "route.name", "Shell.setApplicationRootRoute").isNotNullOrEmpty();

                routeUrl = this.getRouteUrl(route.name, route.parameters);
            } else {
                throw new gsoft.InvalidOperationError("Shell.setApplicationRootRoute - The application root URL is invalid.");
            }

            this._router.setRoot(routeUrl);    

            utils.trace("[SHELL] {0} is the root route.".format(routeUrl));
        },
            
        // summary:
        //         Set a @route as the 404 route.
        // route: String | Object
        //         A route that will be run everytime an unregistered route is requested.
        //         If the route is an object it should follow the following specification:
        //              name: String
        //                  A route name.
        //              parameters: Object
        //                  An object that contains key / value associations for every parameters of the routes.
        set404Route: function(route) {
            ensure(route, "route", "Shell.set404Route").isNotNull();

            var that = this;
            var routeUrl = null;

            if (utils.isString(route)) {
                ensure(route, "route", "Shell.set404Route").isNotEmpty();

                routeUrl = route;
            } else if (utils.isObject(route)) {
                ensure(route.name, "route.name", "Shell.set404Route").isNotNullOrEmpty();

                routeUrl = this.getRouteUrl(route.name, route.parameters);
            } else {
                throw new gsoft.InvalidOperationError("Shell.set404Route - The 404 URL is invalid.");
            }

            this._router.set404Handler(function() {
                that._router.runRoute(routeUrl);
            });

            utils.trace("[SHELL] {0} is the 404 route.".format(routeUrl));
        },
        
        // summary:
        //          Subscribe to a @channel. Everytime an event is published to that @channel 
        //          the @callback will be called with the event value.
        // channel: String
        //          A channel to suscribe to.
        // callback: Function
        //          An handler to call when an event is published on the @channel.
        // options: Object
        //          An optional object with options. Options can be:
        //             - priority: The subscriber priority. A subscriber with an higher will be notified
        //               before a subscriber with a lower priority.
        // returns:
        //         An object that contains informations about the subscription and a function to 
        //         unsuscribe from the @channel.
        subscribe: function() {
            return mediator.subscribe.apply(mediator, arguments);
        },
        
        // summary:
        //          Subscribe to a @channel for a single event. When the first event is published, the subscriber
        //          will be automatically unsubscribed from the @channel.
        // channel: String
        //          A channel to suscribe to.
        // callback: Function
        //          An handler to call when an event is published on the @channel.
        // options: Object
        //          An optional object with options. Options can be:
        //             - priority: The subscriber priority. A subscriber with an higher will be notified
        //               before a subscriber with a lower priority.
        // returns:
        //         An object that contains informations about the subscription and a function to 
        //         unsuscribe from the @channel.
        subscribeOnce: function() {
            return mediator.subscribeOnce.apply(mediator, arguments);
        },
        
        // summary:
        //          unsubscribe from a @channel.
        // channel: String
        //          A channel to unsubscribe from.
        // callback: Function
        //          A callback function that was specified when the subscription to the @channel
        //          was made.
        unsubscribe: function() {
            mediator.unsubscribe.apply(mediator, arguments);
        },
        
        // summary:
        //          Publish a @value to a @channel.
        // channel: String
        //          A channel to publish to.
        // value(s): Object
        //          The value(s) to publish on the @channel.
        publish: function() {
            mediator.publish.apply(mediator, arguments);
        },
        
        // summary:
        //         Publish an error to the error channel of the mediator.
        // source: String
        //         The source of the error.
        // errorType: String
        //         The type of error.
        // value: Object
        //         An optional value.
        publishError: function(source, errorType, value) {
            ensure(source, "source", "Shell.publishError").isNotNullOrEmpty();
            ensure(errorType, "errorType", "Shell.publishError").isNotNullOrEmpty();
            
            mediator.publish(gsoft.spa.Channel.Error, {
                source: source,
                errorType: errorType,
                data: value
            });
        },
            
        // summary:
        //         Adds an handler that is called when an error occurs.
        // callback: Function
        //         An event handler.
        // predicate: Function
        //         An optional function to filter the published events.
        onError: function(callback, predicate) {
            mediator.subscribe(gsoft.spa.Channel.Error, callback, predicate);
        },
        
        _publishPageChanging: function(targetUrl, targetViewUrl, targetParameters) {
            mediator.publishSilently(gsoft.spa.Channel.PageChanging, {
                pageUrl: targetUrl,
                viewUrl: targetViewUrl,
                parameters: targetParameters
            });
        },

        // summary:
        //         Adds an handler that is called before a page change.
        // callback: Function
        //         An event handler.
        // predicate: Function
        //         An optional function to filter the published events.
        onPageChanging: function(callback, predicate) {
            mediator.subscribe(gsoft.spa.Channel.PageChanging, callback, predicate);
        },

        _publishPageChanged: function(url, viewUrl, parameters) {
            mediator.publishSilently(gsoft.spa.Channel.PageChanged, {
                pageUrl: url,
                viewUrl: viewUrl,
                parameters: parameters
            });
        },
        
        // summary:
        //         Adds an handler that is called after a page changed.
        // callback: Function
        //         An event handler
        // predicate: Function
        //         An optional function to filter the published events.
        onPageChanged: function(callback, predicate) {
            mediator.subscribe(gsoft.spa.Channel.PageChanged, callback, predicate);
        },
        
        // summary:
        //         Gets the routes URL that match the combinaison of the specified @module, @name and @routeParameters.
        // route: String
        //         A route name.
        // parameters: Object
        //         An object that contains key / value associations for every parameters of the routes.
        // returns:
        //         An URL.
        getRouteUrl: function(name, parameters) {
            ensure(name, "name", "Shell.getRouteUrl").isNotNullOrEmpty();

            return this._routeUrlResolver.getRouteUrl(this._routeRegistry, name, parameters);
        },
        
        // summary:
        //         Replace the native router by @newRouter.
        // newRouter: Object
        //         A router instance.
        setRouter: function(newRouter) {
            ensure(newRouter, "newRouter", "Shell.setRouter")._isRouter();
            
            this._router =  newRouter;
        },
        
        // summary:
        //         Replace the native view provider by @newViewProvider.
        // newViewProvider: Object
        //         A view provider instance.
        setViewProvider: function(newViewProvider) {
            ensure(newViewProvider, "newViewProvider", "Shell.setViewProvider")._isViewProvider();

            this._viewProvider = newViewProvider;
        },
            
        // summary:
        //         Replace the native view renderer by @newViewRenderer.
        // newViewRenderer: Object
        //         A view renderer instance.
        setViewRenderer: function(newViewRenderer) {
            ensure(newViewRenderer, "newViewRenderer", "Shell.setViewRenderer")._isViewRenderer();

            this._viewRenderer = newViewRenderer;
        },
            
        // summary:
        //         Replace the native route registry by @newRouteRegistry.
        // newRouteRegistry: Object
        //         A route registry instance.
        setRouteRegistry: function(newRouteRegistry) {
            ensure(newRouteRegistry, "newRouteRegistry", "Shell.setRouteRegistry")._isRouteRegistry();

            this._routeRegistry = newRouteRegistry;
        },
            
        // summary:
        //         Replace the native route URL resolver by @newRouteUrlResolver.
        // newRouteUrlResolver: Object
        //         A route URL resolver instance.
        setRouteUrlResolver: function(newRouteUrlResolver) {
            ensure(newRouteUrlResolver, "newRouteUrlResolver", "Shell.setRouteUrlResolver")._isRouteUrlResolver();

            this._routeUrlResolver = newRouteUrlResolver;
        }
    };
 
    // Bootstrap the shell with the default services.
    shell.setRouter(defaultRouter);
    shell.setViewProvider(defaultViewProvider);
    shell.setViewRenderer(defaultViewRenderer);
    shell.setRouteRegistry(defaultRouteRegistry);
    shell.setRouteUrlResolver(defaultRouteUrlResolver);

    // Define shortcuts for the most frequently used functions.
    gsoft.spa.action = gsoft.spa.shell.getRouteUrl.bind(gsoft.spa.shell);
    gsoft.spa.registerPage = gsoft.spa.shell.registerPage.bind(gsoft.spa.shell);
    gsoft.spa.registerService = gsoft.spa.shell.registerService.bind(gsoft.spa.shell);
    gsoft.spa.getService = gsoft.spa.shell.getService.bind(gsoft.spa.shell);
})(jQuery, 
   gsoft.spa.serviceRegistry,
   gsoft.spa.router,
   gsoft.spa.viewProvider,
   gsoft.spa.viewRenderer,
   gsoft.spa.routeRegistry,
   gsoft.spa.routeUrlResolver,
   gsoft.utils,
   gsoft.ensure,
   gsoft.mediator);