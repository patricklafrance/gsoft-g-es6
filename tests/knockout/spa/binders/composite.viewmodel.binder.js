/* jshint -W031 */
// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler, undefined) {
    "use strict";

    describe("spa.CompositeViewModelBinder", function() {
        function createBinding(viewModel, bindingElementAccessor) {
            if (helpers.isNull(viewModel)) {
                viewModel = {
                    bind: function() {
                        return new $.Deferred().promise();
                    }
                };
            }

            return {
                viewModelFactory: function() {
                    return viewModel;
                },
                bindingElementAccessor: helpers.isFunction(bindingElementAccessor) ? bindingElementAccessor : function() {
                    return document.createElement("div");
                }
            };
        }

        function createResolvingViewModel() {
            return {
                bind: function() {
                    var deferred = new $.Deferred();
                    deferred.resolve();

                    return deferred.promise();
                }
            };
        }

        function createFailingViewModel() {
            return {
                bind: function() {
                    var deferred = new $.Deferred();
                    deferred.reject();

                    return deferred.promise();
                }
            };
        }

        describe("ctor", function() {
            it("When bindings is not an array, throw an exception", function() {
                expect(function() { new gsoft.spa.CompositeViewModelBinder(null); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder(undefined); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder(""); }).toThrow();
            });

            it("When bindings is an empty array, throw an exception", function() {
                expect(function() { new gsoft.spa.CompositeViewModelBinder([]); }).toThrow();
            });

            it("When a binding does not match the expected contract, throw an exception", function() {
                expect(function() { new gsoft.spa.CompositeViewModelBinder([{ viewModelFactory: helpers.noop }]); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder([{ viewModelFactory: {}, bindingElementAccessor: helpers.noop }]); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder([{ bindingElementAccessor: helpers.noop }]); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder([{ viewModelFactory: helpers.noop, bindingElementAccessor: {} }]); }).toThrow();
                expect(function() { new gsoft.spa.CompositeViewModelBinder([createBinding()]); }).not.toThrow();
            });
        });

        describe("bind", function() {
            it("Always call the view model bind function of every bindings", function() {
                var count = 0;

                var viewModel = {
                    bind: function() {
                        count += 1;

                        return new $.Deferred().promise();
                    }
                };

                var binder = new gsoft.spa.CompositeViewModelBinder([createBinding(viewModel), createBinding(viewModel), createBinding(viewModel)]);
                binder.bind(document.createElement("div"));

                expect(count).toBe(3);
            });

            it("Always pass the view model parameters to the view model factory function", function() {
                var works = false;

                var parameters = {
                    value: dataSampler.generateString(10)
                };

                var binding = {
                    viewModelFactory: function(viewModelParameters) {
                        if (helpers.areEquals(viewModelParameters, parameters)) {
                            works = true;
                        }

                        return createResolvingViewModel();
                    },
                    bindingElementAccessor: function() {
                        return document.createElement("div");
                    }
                };

                var binder = new gsoft.spa.CompositeViewModelBinder([binding]);
                binder.bind(document.createElement("div"), parameters);

                expect(works).toBeTruthy();
            });

            describe("When all the bindings are bounds", function() {
                it("The returned promise done handler is triggered", function(done) {
                    var works = false;
                    var binding = createBinding(createResolvingViewModel());
                    var binder = new gsoft.spa.CompositeViewModelBinder([binding, binding, binding]);

                    binder.bind(document.createElement("div")).done(function() {
                        works = true;
                    });
                    
                    setTimeout(function() {
                        expect(works).toBeTruthy();
                        done();
                    }, 0);
                });
            });

            describe("When a binding fail", function() {
                it("The returned promise fail handler is triggered", function(done) {
                    var works = false;
                    var binder = new gsoft.spa.CompositeViewModelBinder([createBinding(createResolvingViewModel()), createBinding(createFailingViewModel())]);

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
                    var binder = new gsoft.spa.CompositeViewModelBinder([createBinding(createResolvingViewModel()), createBinding(createFailingViewModel())]);

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        if (error.source === gsoft.spa.Component.CompositeViewModelBinder &&
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
            it("Always try to call the view model dispose function of every bindings", function() {
                var count = 0;

                var viewModel = createResolvingViewModel();
                
                viewModel.dispose = function() {
                    count += 1;
                };

                var binding = createBinding(viewModel);
                var binder = new gsoft.spa.CompositeViewModelBinder([binding, binding, binding]);

                binder.bind(document.createElement("div"));
                binder.unbind();

                expect(count).toBe(3);
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

/* jshint +W031 */
// jscs:enable requireBlocksOnNewline