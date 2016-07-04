(function(dataSampler) {
    "use strict";

    describe("spa.routeRegistry", function() {
        describe("add", function() {
            it("Can add a route", function() {
                var routeName = dataSampler.generateString(10);
                var url = dataSampler.generateString(10);

                gsoft.spa.routeRegistry.add(routeName, url);

                expect(gsoft.spa.routeRegistry._routes[routeName].url).toBe(url);
            });

            it("Can add the same route twice", function() {
                var routeName = dataSampler.generateString(10);
                var url = dataSampler.generateString(10);

                expect(function() {
                    gsoft.spa.routeRegistry.add(routeName, url);
                    gsoft.spa.routeRegistry.add(routeName, url);
                }).not.toThrow();
            });
        });

        describe("find", function() {
            it("When the route is registred, returns the route", function() {
                var routeName = dataSampler.generateString(10);
                var url = dataSampler.generateString(10);

                gsoft.spa.routeRegistry.add(dataSampler.generateString(10), dataSampler.generateString(10));
                gsoft.spa.routeRegistry.add(dataSampler.generateString(10), dataSampler.generateString(10));
                gsoft.spa.routeRegistry.add(routeName, url);
                gsoft.spa.routeRegistry.add(dataSampler.generateString(10), dataSampler.generateString(10));

                var route = gsoft.spa.routeRegistry.find(routeName);

                expect(route).not.toBeNull();
                expect(route.url).toBe(url);
            });

            it("When the route is not registred, returns null", function() {
                var route = gsoft.spa.routeRegistry.find(dataSampler.generateString(10));

                expect(route).toBeNull();
            });
        });
    });
})(test.dataSampler);