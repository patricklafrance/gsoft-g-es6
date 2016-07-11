/* jshint -W031 */
// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler, undefined) {
    "use strict";

    describe("spa.SimpleViewModelBinder", function() {
        function createResolvingViewModel() {
            return {
                bind: function() {
                    var deferred = new $.Deferred();
                    deferred.resolve();

                    return deferred.promise();
                }
            };
        }

        function createResolvingViewModelAccessor() {
            return function() {
                return createResolvingViewModel();
            };
        }

        function createFailingViewModelAccessor() {
            return function() {
                return {
                    bind: function() {
                        var deferred = new $.Deferred();
                        deferred.reject();

                        return deferred.promise();
                    }
                };
            };
        }

        describe("ctor", function() {
            it("When the view model accessor is not a function, throw an exception", function() {
                expect(function() { new gsoft.spa.SimpleViewModelBinder(null); }).toThrow();
                expect(function() { new gsoft.spa.SimpleViewModelBinder(undefined); }).toThrow();
                expect(function() { new gsoft.spa.SimpleViewModelBinder({}); }).toThrow();
                expect(function() { new gsoft.spa.SimpleViewModelBinder(helpers.noop); }).not.toThrow();
            });
        });

        describe("bind", function() {
            it("When the view model accessor does not returns a view model, throw an exception", function() {
                var binder = new gsoft.spa.SimpleViewModelBinder(function() {
                    return {};
                });

                expect(function() { binder.bind(document.createElement("div")); }).toThrow();
            });

            it("Always pass the view model parameters to the view model accessor function", function() {
                var works = false;

                var parameters = {
                    value: dataSampler.generateString(10)
                };

                var viewModelAccessor = function(viewModelParameters) {
                    if (helpers.areEquals(viewModelParameters, parameters)) {
                        works = true;
                    }

                    return createResolvingViewModel();
                };

                var binder = new gsoft.spa.SimpleViewModelBinder(viewModelAccessor);
                binder.bind(document.createElement("div"), parameters);

                expect(works).toBeTruthy();
            });

            it("When \"data-resources\" is specified, the view model accessor receive the specified resources", function() {
                var works = false;
                var dataResources = dataSampler.generateString(10);

                var firstChildElement = document.createElement("div");
                firstChildElement.setAttribute("data-resources", dataResources);

                var containerElement = document.createElement("div");
                containerElement.appendChild(firstChildElement);

                var viewModelAccessor = function(viewModelParameters, resources) {
                    if (dataResources === resources) {
                        works = true;
                    }

                    return createResolvingViewModel();
                };

                var binder = new gsoft.spa.SimpleViewModelBinder(viewModelAccessor);
                binder.bind(containerElement, {});

                expect(works).toBeTruthy();
            });

            it("Always call the view model bind function", function() {
                var works = false;

                var viewModel = {
                    bind: function() {
                        works = true;

                        return new $.Deferred().promise();
                    }
                };

                var binder = new gsoft.spa.SimpleViewModelBinder(function() {
                    return viewModel;
                });

                binder.bind(document.createElement("div"));

                expect(works).toBeTruthy();
            });

            describe("When the view model is bound", function() {
                it("The returned promise done handler is triggered", function(done) {
                    var works = false;
                    var binder = new gsoft.spa.SimpleViewModelBinder(createResolvingViewModelAccessor());

                    binder.bind(document.createElement("div")).done(function() {
                        works = true;
                    });
                    
                    setTimeout(function() {
                        expect(works).toBeTruthy();
                        done();
                    }, 0);
                });
            });

            describe("When the view model binding fail", function() {
                it("The returned promise fail handler is triggered", function(done) {
                    var works = false;
                    var binder = new gsoft.spa.SimpleViewModelBinder(createFailingViewModelAccessor());

                    binder.bind(document.createElement("div")).fail(function() {
                        works = true;
                    });
                    
                    setTimeout(function() {
                        expect(works).toBeTruthy();
                        done();
                    }, 0);
                });

                it("Publish the error throught the mediator", function() {
                    var works = false;
                    var binder = new gsoft.spa.SimpleViewModelBinder(createFailingViewModelAccessor());

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        if (error.source === gsoft.spa.Component.SimpleViewModelBinder &&
                            error.errorType === "BindingFailed") {
                            works = true;
                        }
                    });

                    binder.bind(document.createElement("div"));

                    expect(works).toBeTruthy();
                });
            });
        });

        describe("unbind", function() {
            it("Always try to call the view model dispose function", function() {
                var works = false;

                var viewModel = createResolvingViewModel();
                viewModel.dispose = function() {
                    works = true;
                };

                var binder = new gsoft.spa.SimpleViewModelBinder(function() {
                    return viewModel;
                });

                binder.bind(document.createElement("div"));
                binder.unbind();

                expect(works).toBeTruthy();
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

/* jshint +W031 */
// jscs:enable requireBlocksOnNewline