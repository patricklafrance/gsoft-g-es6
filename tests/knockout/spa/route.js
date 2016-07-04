/* jshint -W031 */
// jscs:disable requireBlocksOnNewline

(function(dataSampler, undefined) {
    "use strict";

    describe("spa.route", function() {
        it("When name is null or empty, throw an exception", function() {
            expect(function() { new gsoft.spa.Route(null, dataSampler.generateString(10)); }).toThrow();
            expect(function() { new gsoft.spa.Route(undefined, dataSampler.generateString(10)); }).toThrow();
            expect(function() { new gsoft.spa.Route("", dataSampler.generateString(10)); }).toThrow();
        });

        it("When url is null or empty, throw an exception", function() {
            expect(function() { new gsoft.spa.Route(dataSampler.generateString(10), null); }).toThrow();
            expect(function() { new gsoft.spa.Route(dataSampler.generateString(10), undefined); }).toThrow();
            expect(function() { new gsoft.spa.Route(dataSampler.generateString(10), ""); }).toThrow();
        });

        describe("When there is no parameters", function() {
            it("Returns the route URL", function() {
                var route = new gsoft.spa.Route(dataSampler.generateString(10), "#/my-route");

                expect(route.getUrl()).toBe(route.url);
            });
        });

        describe("When there is required parameters", function() {
            it("When all the parameters are specified, returns the route URL with the specified parameters", function() {
                var route = new gsoft.spa.Route(dataSampler.generateString(10), "#/my-route/:param1/:param2/:param3");

                var parameters = {
                    param1: dataSampler.generateString(10),
                    param2: dataSampler.generateString(10),
                    param3: dataSampler.generateString(10)
                };

                expect(route.getUrl(parameters)).toBe(route.url.replace(":param1", parameters.param1).replace(":param2", parameters.param2).replace(":param3", parameters.param3));
            });

            it("When there is unspecified parameters, throw an exception", function() {
                var route = new gsoft.spa.Route(dataSampler.generateString(10), "#/my-route/:param1/:param2/:param3");

                var parameters = {
                    param1: dataSampler.generateString(10),
                    param2: dataSampler.generateString(10)
                };

                expect(function() { route.getUrl(parameters); }).toThrow();
            });
        });

        describe("When there is optionnal parameters", function() {
            it("When there is parameters, returns the route URL with the specified parameters", function() {
                var route = new gsoft.spa.Route(dataSampler.generateString(10), "#/my-route(/:param1)(/:param2)(/:param3)");

                var parameters = {
                    param1: dataSampler.generateString(10),
                    param2: dataSampler.generateString(10),
                    param3: dataSampler.generateString(10)
                };

                expect(route.getUrl(parameters)).toBe(route.url.replace("(/:param1)", "/" + parameters.param1).replace("(/:param2)", "/" + parameters.param2).replace("(/:param3)", "/" + parameters.param3));
            });

            it("Removes the unspecified parameters placeholders", function() {
                var route = new gsoft.spa.Route(dataSampler.generateString(10), "#/my-route(/:param1)(/:param2)(/:param3)");

                var parameters = {
                    param1: dataSampler.generateString(10),
                    param3: dataSampler.generateString(10)
                };

                expect(route.getUrl(parameters)).toBe(route.url.replace("(/:param1)", "/" + parameters.param1).replace("(/:param2)", "").replace("(/:param3)", "/" + parameters.param3));
            });
        });
    });
})(test.dataSampler);

/* jshint +W031 */
// jscs:enable requireBlocksOnNewline