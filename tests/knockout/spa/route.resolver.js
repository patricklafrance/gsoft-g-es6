(function(dataSampler) {
    "use strict";

    describe("spa.routeUrlResolver", function() {
        describe("getRouteUrl", function() {
            it("When routes is registred, returns route url", function() {
                var routeUrl = dataSampler.generateString(10);

                var routeRegistry = {
                    find: function() {
                        return {
                            getUrl: function() {
                                return routeUrl;
                            }
                        };
                    }
                };

                expect(gsoft.spa.routeUrlResolver.getRouteUrl(routeRegistry, dataSampler.generateString(10), dataSampler.generateString(10))).toBe(routeUrl);
            });

            it("When route is not registred, throw an exception", function() {
                var routeRegistry = {
                    find: function() {
                        return null;
                    }
                };

                expect(function() { 
                    gsoft.spa.routeUrlResolver.getRouteUrl(routeRegistry, dataSampler.generateString(10), dataSampler.generateString(10)); 
                }).toThrow();
            });
        });
    });
})(test.dataSampler);