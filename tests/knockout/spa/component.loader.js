(function(helpers, dataSampler) {
    "use strict";

    describe("When the component view model is provided with a factory function", function() {
        it("The view model factory receive the SPA page context as a parameter", function() {
            var wasProvided = false;

            var ComponentViewModel = function(context) {
                if (helpers.isNull(context) === false && helpers.isFunction(context.getService)) {
                    wasProvided = true;
                }
            };

            gsoft.spa.componentLoader.loadViewModel(dataSampler.generateString(10), ComponentViewModel, function(factory) {
                factory({}, {});
            });

            expect(wasProvided).toBeTruthy();
        });

        it("The view model factory receive the parameters passed to the component as a parameter", function() {
            var wasProvided = false;

            var ComponentViewModel = function(context, params) {
                if (helpers.isNull(params) === false && params.foo === "bar") {
                    wasProvided = true;
                }
            };

            gsoft.spa.componentLoader.loadViewModel(dataSampler.generateString(10), ComponentViewModel, function(factory) {
                factory({ foo: "bar" }, {});
            });

            expect(wasProvided).toBeTruthy();
        });

        it("When the view model as a \"_beforeBind\" function, the function is called", function() {
            var wasCalled = false;

            var ComponentViewModel = function() {
                this._beforeBind = function() {
                    wasCalled = true;
                }
            };

            gsoft.spa.componentLoader.loadViewModel(dataSampler.generateString(10), ComponentViewModel, function(factory) {
                factory({}, {});
            });

            expect(wasCalled).toBeTruthy();
        });

        it("When the view model as a \"_afterBind\" function, the function is called", function(done) {
            var wasCalled = false;

            var ComponentViewModel = function() {
                this._afterBind = function() {
                    wasCalled = true;
                }
            };

            gsoft.spa.componentLoader.loadViewModel(dataSampler.generateString(10), ComponentViewModel, function(factory) {
                factory({}, {});
            });

            setTimeout(function() {
                expect(wasCalled).toBeTruthy();
                done();
            }, 0);
        });

        it("When \"data-resources\" is specified, the view model factory receive the specified resources", function() {
            var wasProvided = false;
            var dataResources = dataSampler.generateString(10);

            var firstChildElement = document.createElement("div");
            firstChildElement.setAttribute("data-resources", dataResources);

            var containerElement = document.createElement("div");
            containerElement.appendChild(firstChildElement);

            var ComponentViewModel = function(context, params, resources) {
                if (dataResources === resources) {
                    wasProvided = true;
                }
            };

            gsoft.spa.componentLoader.loadViewModel(dataSampler.generateString(10), ComponentViewModel, function(factory) {
                factory({}, { element: containerElement });
            });

            expect(wasProvided).toBeTruthy();
        });
    });
})(test.helpers,
   test.dataSampler);