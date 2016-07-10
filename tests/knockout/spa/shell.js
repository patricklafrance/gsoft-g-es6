// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler, undefined) {
    "use strict";
    
    var DummyViewProvider = {
        get: function() {
            var deferred = $.Deferred();
            deferred.resolveWith(this);

            return deferred.promise();
        }
    };

    beforeEach(function() {
        gsoft.spa.shell._started = false;
    });

    describe("spa.shell", function() {
        describe("start", function() {
            it("When the options parameter is not an object, throw an exception", function() {
                expect(function() { gsoft.spa.shell.start(null); }).toThrow();
                expect(function() { gsoft.spa.shell.start(undefined); }).toThrow();
                expect(function() { gsoft.spa.shell.start(1); }).toThrow();
                expect(function() { gsoft.spa.shell.start("foo"); }).toThrow();
            });
            
            it("When the container element is not a DOM element, throw an exception", function() {
                expect(function() { gsoft.spa.shell.start({}); }).toThrow();
                expect(function() { gsoft.spa.shell.start({ containerElement: null }); }).toThrow();
                expect(function() { gsoft.spa.shell.start({ containerElement: undefined }); }).toThrow();
                expect(function() { gsoft.spa.shell.start({ containerElement: {} }); }).toThrow();
                expect(function() { gsoft.spa.shell.start({ containerElement: 1 }); }).toThrow();
            });
            
            it("Always start the router", function() {
                spyOn(gsoft.spa.router, "start");

                gsoft.spa.shell.start({ containerElement: document.createElement("div") });

                expect(gsoft.spa.router.start).toHaveBeenCalled();
            });

            it("Cannot start twice", function() {
                expect(function() { gsoft.spa.shell.start({ containerElement: document.createElement("div") }); }).not.toThrow();
                expect(function() { gsoft.spa.shell.start({ containerElement: document.createElement("div") }); }).toThrow();
            });

            it("When a callback is specified, call the callback when the SPA is started", function() {
                var callCount = 0;
                
                gsoft.spa.shell.start({
                    containerElement: document.createElement("div"),
                    callback: function() {
                        callCount += 1;
                    }
                });

                expect(callCount).toBe(1);
            });
            
            it("When the debug option is true, start the SPA in debug mode", function() {
                var oldTrace = gsoft.utils.trace;
                gsoft.utils.trace = helpers.noop;
                
                gsoft.spa.shell.start({
                    debug: true,
                    containerElement: document.createElement("div")
                });
                
                expect(gsoft.spa.shell.isDebug()).toBe(true);
                
                gsoft.utils.trace = oldTrace;
                gsoft.debug = false;
                gsoft.spa.shell._debug = false;
            });
        });
        
        describe("registerService", function() {
            it("When the service options is not an object, throw an exception", function() {
                expect(function() { gsoft.spa.shell.registerService(""); }).toThrow();
                expect(function() { gsoft.spa.shell.registerService(null); }).toThrow();
                expect(function() { gsoft.spa.shell.registerService(undefined); }).toThrow();
            });
            
            describe("When this is a valid service", function() {
                it("Add the service to the registry", function() {
                    spyOn(gsoft.spa.serviceRegistry, "add");

                    gsoft.spa.shell.registerService({
                        name: dataSampler.generateString(10),
                        factory: helpers.noop
                    });

                    expect(gsoft.spa.serviceRegistry.add).toHaveBeenCalled();
                });
                
                it("Can register a service with the alias", function() {
                    spyOn(gsoft.spa.serviceRegistry, "add");

                    gsoft.spa.registerService({ name: dataSampler.generateString(10), factory: helpers.noop });

                    expect(gsoft.spa.serviceRegistry.add).toHaveBeenCalled();
                });
            });
        });
        
        describe("getService", function() {
            it("When the service has not been registered, throw an exception", function() {
                expect(function() { gsoft.spa.shell.getService(dataSampler.generateString(10)); }).toThrow();
            });
            
            it("When the service has been registered, return a service instance", function() {
                var serviceName = dataSampler.generateString(10);
                var service = dataSampler.generateString(10);
                
                var factory = function() {
                    return service;
                };
                
                gsoft.spa.shell.registerService({ name: serviceName, factory: factory });
                
                var instance = gsoft.spa.shell.getService(serviceName);
                
                expect(instance).toBe(service);
            });
        });
        
        describe("registerPage", function() {
            it("When the route is not an object, throw an exception", function() {
                expect(function() { gsoft.spa.shell.registerPage(null); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage(undefined); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage(1); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage("aaa"); }).toThrow();
            });
            
            it("When the url is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: null, viewUrl: dataSampler.generateString(10) }); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: undefined, viewUrl: dataSampler.generateString(10) }); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: "", viewUrl: dataSampler.generateString(10) }); }).toThrow();
            });
            
            it("When viewUrl is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: null }); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: undefined }); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: "" }); }).toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10) }); }).not.toThrow();
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: helpers.noop }); }).not.toThrow();
            });
            
            it("When viewModelBinder is not and null and is not a view model binder, throw an exception", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10), viewModelBinder: "" }); }).toThrow();
            });
            
            it("Can add a route without a view model binder", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10) }); }).not.toThrow();
            });
            
            it("Can add a route without a view model factory", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10) }); }).not.toThrow();
            });
            
            it("Can add a route without a view model binder and a view model factory", function() {
                expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10) }); }).not.toThrow();
            });
            
            describe("When this is a valid route", function() {
                it("Add the route to the router", function() {
                    var url = dataSampler.generateString(10);

                    gsoft.spa.shell.registerPage({
                        url: url, 
                        viewUrl: dataSampler.generateString(10)
                    });

                    expect(Path.routes.defined[url]).toBeDefined();
                });
                
                it("Add the route to the registry", function() {
                    spyOn(gsoft.spa.shell._routeRegistry, "add");

                    gsoft.spa.shell.registerPage({
                        url: dataSampler.generateString(10), 
                        viewUrl: dataSampler.generateString(10)
                    });

                    expect(gsoft.spa.shell._routeRegistry.add).toHaveBeenCalled();
                });
                
                it("When route name is not specified, set the route url as the route name", function() {
                    spyOn(gsoft.spa.shell._routeRegistry, "add");

                    var url = dataSampler.generateString(10);

                    gsoft.spa.shell.registerPage({
                        url: url, 
                        viewUrl: dataSampler.generateString(10)
                    });

                    expect(gsoft.spa.shell._routeRegistry.add.calls.mostRecent().args[1]).toEqual(url);
                });
                
                describe("When this is a known route", function() {
                    beforeEach(function() {
                        gsoft.spa.shell.setViewProvider(DummyViewProvider);
                    });

                    afterEach(function() {
                        gsoft.spa.shell.setViewProvider(gsoft.spa.viewProvider);
                    });

                    it("When the route URL is #/, set the route as the application root", function() {
                        gsoft.spa.shell.registerPage({ 
                            url: "#/",  
                            viewUrl: "#/"
                        });

                        expect(Path.routes.root).toBe("#/");
                    });

                    it("When the route URL is #/404, set the route as the 400 route", function() {
                        var url = "#/404";

                        spyOn(gsoft.spa.router, "runRoute");

                        gsoft.spa.shell.registerPage({
                            url: url,
                            viewUrl: url
                        });
                        
                        Path.dispatch(dataSampler.generateString(10));

                        expect(gsoft.spa.router.runRoute).toHaveBeenCalledWith(url);
                    });
                });
            });
            
            describe("When this is an invalid route", function() {
                it("Do not add the route to the router", function() {
                    var url = dataSampler.generateString(10);

                    try {
                        gsoft.spa.shell.registerPage({
                            url: url, 
                            viewUrl: null
                        });
                    }
                    catch (e) {
                    }

                    expect(Path.routes.defined[url]).toBeUndefined();
                });
            });
            
            describe("Aliases", function() {
                it("When alias URL is null or empty, throw an exception", function() {
                    expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10), aliases: [""] }); }).toThrow();
                    expect(function() { gsoft.spa.shell.registerPage({ url: dataSampler.generateString(10), viewUrl: dataSampler.generateString(10), aliases: [null] }); }).toThrow();
                });
                
                describe("When this is a valid route", function() {
                    it("Add the route to the router", function() {
                        var alias = dataSampler.generateString(10);

                        gsoft.spa.shell.registerPage({
                            url: dataSampler.generateString(10),
                            viewUrl: dataSampler.generateString(10),
                            aliases: [alias]
                        });

                        expect(Path.routes.defined[alias]).toBeDefined();
                    });
                });

                describe("When this is an invalid route", function() {
                    it("Do not add the route to the router", function() {
                        var routesCount = Path.routes.defined.length;

                        try {
                            gsoft.spa.shell.addAliasRoute({
                                url: dataSampler.generateString(10), 
                                viewUrl: dataSampler.generateString(10),
                                aliases: [""]
                            });
                        }
                        catch (e) {
                        }

                        expect(Path.routes.defined.length).toBe(routesCount);
                    });
                });
            });

            describe("View caching", function() {
                var routeUrl = null;
                var viewUrl = null;

                beforeEach(function() {
                    routeUrl = dataSampler.generateString(10);
                    viewUrl = dataSampler.generateString(10);

                    gsoft.spa.shell.setViewProvider(DummyViewProvider);
                });

                afterEach(function() {
                    gsoft.spa.shell.setViewProvider(gsoft.spa.viewProvider);
                });

                describe("When cacheView is undefined", function() {
                    it("Cache the view", function() {
                        spyOn(DummyViewProvider, "get").and.callThrough();
                
                        gsoft.spa.shell.registerPage({
                            url: routeUrl,
                            viewUrl: viewUrl
                        });

                        Path.dispatch(routeUrl);

                        expect(DummyViewProvider.get).toHaveBeenCalledWith(viewUrl, true);
                    });

                    it("When the route URL has view parameters, do not cache the view", function() {
                        spyOn(DummyViewProvider, "get").and.callThrough();
                
                        gsoft.spa.shell.registerPage({
                            url: routeUrl,
                            viewUrl: function() {
                                return `${viewUrl}?bar=1`;
                            }
                        });

                        Path.dispatch(routeUrl);

                        expect(DummyViewProvider.get).toHaveBeenCalledWith(viewUrl + "?bar=1", false);
                    });
                });

                describe("When cacheView is true", function() {
                    it("Cache the view", function() {
                        spyOn(DummyViewProvider, "get").and.callThrough();
                
                        gsoft.spa.shell.registerPage({
                            url: routeUrl,
                            viewUrl: viewUrl,
                            cacheView: true
                        });

                        Path.dispatch(routeUrl);

                        expect(DummyViewProvider.get).toHaveBeenCalledWith(viewUrl, true);
                    });

                    it("When the route URL has view parameters, cache the view", function() {
                        spyOn(DummyViewProvider, "get").and.callThrough();
                
                        gsoft.spa.shell.registerPage({
                            url: routeUrl,
                            viewUrl: function() {
                                return `${viewUrl}?bar=1`;
                            },
                            cacheView: true
                        });

                        Path.dispatch(routeUrl);

                        expect(DummyViewProvider.get).toHaveBeenCalledWith(viewUrl + "?bar=1", true);
                    });
                });

                it("When cacheView is false, do not cache the view", function() {
                    spyOn(DummyViewProvider, "get").and.callThrough();
                
                    gsoft.spa.shell.registerPage({
                        url: routeUrl,
                        viewUrl: viewUrl,
                        cacheView: false
                    });

                    Path.dispatch(routeUrl);

                    expect(DummyViewProvider.get).toHaveBeenCalledWith(viewUrl, false);
                });
            });
        });

        describe("setApplicationRootRoute", function() {
            it("Can set the route as the application root with a string URL", function() {
                var url = dataSampler.generateString(10);

                gsoft.spa.shell.setApplicationRootRoute(url);

                expect(Path.routes.root).toBe(url);
            });

            describe("When the route is an object", function() {
                it("When the route name is null or empty, throw an exception", function() {
                    expect(function() { gsoft.spa.shell.setApplicationRootRoute({ name: null }); }).toThrow();
                    expect(function() { gsoft.spa.shell.setApplicationRootRoute({ name: "" }); }).toThrow();
                });

                it("Can set the route as the application root", function() {
                    var url = dataSampler.generateString(10);
                    var name = dataSampler.generateString(10);

                    gsoft.spa.shell.registerPage({
                        name: name,
                        url: url,
                        viewUrl: url
                    });
                    
                    gsoft.spa.shell.setApplicationRootRoute({
                        name: name
                    });

                    expect(Path.routes.root).toBe(url);
                });
            });
        });

        describe("set404Route", function() {
            beforeEach(function() {
                gsoft.spa.shell.setViewProvider(DummyViewProvider);
            });

            afterEach(function() {
                gsoft.spa.shell.setViewProvider(gsoft.spa.viewProvider);
            });

            it("Can set the route as the rescue route with a string URL", function() {
                var url = dataSampler.generateString(10);

                spyOn(gsoft.spa.router, "runRoute");

                gsoft.spa.shell.registerPage({
                    url: url,
                    viewUrl: url
                });
                
                gsoft.spa.shell.set404Route(url);

                Path.dispatch(dataSampler.generateString(10));

                expect(gsoft.spa.router.runRoute).toHaveBeenCalledWith(url);
            });

            describe("When the route is an object", function() {
                it("When the route module is null or empty", function() {
                    expect(function() { gsoft.spa.shell.set404Route({ name: dataSampler.generateString(10) }); }).toThrow();
                    expect(function() { gsoft.spa.shell.set404Route({ name: dataSampler.generateString(10) }); }).toThrow();
                });

                it("When the route name is null or empty", function() {
                    expect(function() { gsoft.spa.shell.set404Route({ name: null }); }).toThrow();
                    expect(function() { gsoft.spa.shell.set404Route({ name: "" }); }).toThrow();
                });

                it("Can set the route as the rescue route", function() {
                    var url = dataSampler.generateString(10);
                    var name = dataSampler.generateString(10);

                    spyOn(gsoft.spa.router, "runRoute");

                    gsoft.spa.registerPage({
                        name: name,
                        url: url,
                        viewUrl: url
                    });

                    gsoft.spa.shell.set404Route({
                        name: name
                    });

                    Path.dispatch(dataSampler.generateString(10));

                    expect(gsoft.spa.router.runRoute).toHaveBeenCalledWith(url);
                });
            });
        });

        describe("getRouteUrl", function() {
            it("When name is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.shell.getRouteUrl(dataSampler.generateString(10), null); }).toThrow();
                expect(function() { gsoft.spa.shell.getRouteUrl(dataSampler.generateString(10), undefined); }).toThrow();
                expect(function() { gsoft.spa.shell.getRouteUrl(dataSampler.generateString(10), ""); }).toThrow();
            });

            it("When route is registred, returns the route url", function() {
                var name = dataSampler.generateString(10);
                var url = dataSampler.generateString(10);

                gsoft.spa.shell.registerPage({ url: url, viewUrl: dataSampler.generateString(10), name: name });
                
                expect(gsoft.spa.shell.getRouteUrl(name)).toBe(url);
            });

            it("when route is not registred, throw an exception", function() {
                expect(function() { gsoft.spa.shell.getRouteUrl(dataSampler.generateString(10)); }).toThrow();
            });

            it("When route has parameters, returns route url with parameters", function() {
                var name = dataSampler.generateString(10);
                var url = "#/" + dataSampler.generateString(10) + "/:param1(/:param2)/:param3(/:param4)";

                gsoft.spa.shell.registerPage({
                    url: url,
                    viewUrl: dataSampler.generateString(10),
                    name: name
                });

                var parameters = {
                    param1: dataSampler.generateString(10),
                    param2: dataSampler.generateString(10),
                    param3: dataSampler.generateString(10)
                };

                expect(gsoft.spa.shell.getRouteUrl(name, parameters)).toBe(url.replace(":param1", parameters.param1).replace("(/:param2)", "/" + parameters.param2).replace(":param3", parameters.param3).replace("(/:param4)", ""));
            });

            it("Can get a route URL with the 'action' alias", function() {
                var name = dataSampler.generateString(10);
                var url = dataSampler.generateString(10);

                gsoft.spa.shell.registerPage({
                    url: url,
                    viewUrl: dataSampler.generateString(10),
                    name: name
                });
                
                expect(gsoft.spa.action(name)).toBe(url);
            });
        });
        
        describe("publishError", function() {
            it("When source is null, throw an exception", function() {
                expect(function() { gsoft.spa.shell.publishError(null, dataSampler.generateString(10), null); }).toThrow();
                expect(function() { gsoft.spa.shell.publishError(undefined, dataSampler.generateString(10), null); }).toThrow();
            });

            it("When errorType is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.shell.publishError(dataSampler.generateString(10), null, null); }).toThrow();
                expect(function() { gsoft.spa.shell.publishError(dataSampler.generateString(10), undefined, null); }).toThrow();
                expect(function() { gsoft.spa.shell.publishError(dataSampler.generateString(10), "", null); }).toThrow();
            });

            describe("Always pass a value object as argument having", function() {
                it("Source", function() {
                    var works = false;
                    var source = dataSampler.generateString(10);

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(value) {
                        if (value.source === source) {
                            works = true;
                        }
                    });

                    gsoft.spa.shell.publishError(source, dataSampler.generateString(10), null);

                    expect(works).toBeTruthy();
                });

                it("ErrorType", function() {
                    var works = false;
                    var errorType = dataSampler.generateString(10);

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(value) {
                        if (value.errorType === errorType) {
                            works = true;
                        }
                    });

                    gsoft.spa.shell.publishError(dataSampler.generateString(10), errorType, null);

                    expect(works).toBeTruthy();
                });

                it("Data", function() {
                    var works = false;
                    var data = dataSampler.generateString(10);

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(value) {
                        if (value.data === data) {
                            works = true;
                        }
                    });

                    gsoft.spa.shell.publishError(dataSampler.generateString(10), dataSampler.generateString(10), data);

                    expect(works).toBeTruthy();
                });
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline