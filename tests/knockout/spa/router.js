// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler, undefined) {
    "use strict";

    describe("spa.router", function() {
        describe("addRoute", function() {
            it("When url is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.router.addRoute(null, helpers.noop, null); }).toThrow();
                expect(function() { gsoft.spa.router.addRoute(undefined, helpers.noop, null); }).toThrow();
                expect(function() { gsoft.spa.router.addRoute("", helpers.noop, null); }).toThrow();
            });

            it("When callback is not a function, throw an exception", function() {
                expect(function() { gsoft.spa.router.addRoute(dataSampler.generateString(10), null, null); }).toThrow();
                expect(function() { gsoft.spa.router.addRoute(dataSampler.generateString(10), "", null); }).toThrow();
            });

            it("Always add the route to the registry", function() {
                var url = dataSampler.generateString(10);

                gsoft.spa.router.addRoute(url, helpers.noop);

                expect(!helpers.isNull(Path.routes.defined[url])).toBeTruthy();
            });

            describe("Always return an object having", function() {
                it("Run", function() {
                    var route = gsoft.spa.router.addRoute(dataSampler.generateString(10), helpers.noop);

                    expect(helpers.isFunction(route.run)).toBeTruthy();
                });
            });

            describe("When a registered route is entered", function() {
                it("Always call the route callback", function() {
                    var works = false;
                    var url = dataSampler.generateString(10);

                    var route = gsoft.spa.router.addRoute(url, function(targetUrl) {
                        if (targetUrl === url) {
                            works = true;
                        }
                    });

                    route.run();

                    expect(works).toBeTruthy();
                });

                it("Always publish throught the mediator", function() {
                    var works = false;
                    var url = dataSampler.generateString(10);

                    gsoft.mediator.subscribe("g-spa-enteredRoute", function(targetRoute) {
                        if (targetRoute.url === url) {
                            works = true;
                        }
                    });

                    var route = gsoft.spa.router.addRoute(url, helpers.noop);
                    route.run();

                    expect(works).toBeTruthy();
                });
            });

            describe("When a registered route is exited", function() {
                it("Always publish throught the mediator", function() {
                    var works = false;
                    var url = dataSampler.generateString(10);

                    gsoft.mediator.subscribe("g-spa-exitedRoute", function() {
                        if (arguments[0] === url) {
                            works = true;
                        }
                    });

                    gsoft.spa.router.addRoute(url, helpers.noop);
                    
                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[url].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(works).toBeTruthy();
                });

                it("Always call the onExit handler when specified", function() {
                    var works = false;
                    var url = dataSampler.generateString(10);

                    gsoft.spa.router.addRoute(url, helpers.noop, {
                        onExit: function() {
                            if (arguments[0] === url) {
                                works = true;
                            }
                        }
                    });

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[url].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(works).toBeTruthy();
                });
            });
        });

        describe("runRoute", function() {
            it("When url is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.router.runRoute(null); }).toThrow();
                expect(function() { gsoft.spa.router.runRoute(undefined); }).toThrow();
                expect(function() { gsoft.spa.router.runRoute(""); }).toThrow();
            });

            it("When route is not registered, throw an exception", function() {
                expect(function() { gsoft.spa.router.runRoute(dataSampler.generateString(10)); }).toThrow();
            });

            it("Can run route with parameters", function() {
                var works = false;
                var url = dataSampler.generateString(10);

                gsoft.spa.router.addRoute(url + "/:param1", function(_, routeParameters) {
                    works = routeParameters.param1 === "foo";
                });

                gsoft.spa.router.runRoute(url + "/foo");

                expect(works).toBeTruthy();
            });

            it("Can run route without parameter", function() {
                var works = false;
                var url = dataSampler.generateString(10);

                gsoft.spa.router.addRoute(url, function() {
                    works = true;
                });

                gsoft.spa.router.runRoute(url);

                expect(works).toBeTruthy();
            });

            it("When the route has an optional parameter that is not supplied, the route paramter should be empty.", function() {
                var works = false;
                var url = dataSampler.generateString(10);

                gsoft.spa.router.addRoute(url + "/bar(/:param1)", function(_, routeParameters) {
                    works = helpers.isUndefined(routeParameters.param1);
                });

                gsoft.spa.router.runRoute(url + "/bar");

                expect(works).toBeTruthy();
            });

            it("When the route has an optional parameter that is supplied, the route parameter should be set.", function() {
                var works = false;
                var url = dataSampler.generateString(10);

                gsoft.spa.router.addRoute(url + "/bar(/:param1)", function(_, routeParameters) {
                    works = routeParameters.param1 === "foo";
                });

                gsoft.spa.router.runRoute(url + "/bar/foo");

                expect(works).toBeTruthy();
            });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline