// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler, undefined) {
    "use strict";

    describe("spa.ensure", function() {
        function createViewModel() {
            return {
                bind: helpers.noop
            };
        }

        describe("_isViewModel", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isViewModel(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isViewModel(); }).toThrow();
            });

            it("When bind is not a function, throw an exception", function() {
                expect(function() { gsoft.spa.ensure({})._isViewModel(); }).toThrow();
            });

            it("When is a view model, do nothing", function() {
                expect(function() { gsoft.spa.ensure(createViewModel())._isViewModel(); }).not.toThrow();
            });
        });

        describe("_isBinding", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isBinding(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isBinding(); }).toThrow();
            });

            it("When viewModelFactory is not a function, throw an exception", function() {
                var binding = {
                    viewModelFactory: {},
                    bindingElementAccessor: helpers.noop
                };

                expect(function() { gsoft.spa.ensure(binding)._isBinding(); }).toThrow();
            });

            it("When bindingElementAccessor is not a function, throw an exception", function() {
                var binding = {
                    viewModelFactory: helpers.noop
                };  

                expect(function() { gsoft.spa.ensure(binding)._isBinding(); }).toThrow();
            });

            it("When is a binding, do nothing", function() {
                var binding = {
                    viewModelFactory: helpers.noop,
                    bindingElementAccessor: helpers.noop
                };

                expect(function() { gsoft.spa.ensure(binding)._isBinding(); }).not.toThrow();
            });
        });

        describe("_isViewModelBinder", function() {
            it("When is null, do not throw", function() {
                expect(function() { gsoft.spa.ensure(null)._isViewModelBinder(); }).not.toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isViewModelBinder(); }).not.toThrow();
            });

            describe("When is not null", function() {
                it("When bind is not a function, throw an exception", function() {
                    var binder = {
                        unbind: helpers.noop,
                        isBound: helpers.noop
                };

                    expect(function() { gsoft.spa.ensure(binder)._isViewModelBinder(); }).toThrow();
                });

                it("When unbind is not a function, throw an exception", function() {
                    var binder = {
                        bind: helpers.noop,
                        isBound: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(binder)._isViewModelBinder(); }).toThrow();
                });

                it("When isBound is not a function, throw an exception", function() {
                    var binder = {
                        unbind: helpers.noop,
                        bind: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(binder)._isViewModelBinder(); }).toThrow();
                });

                it("When is a view model binder, do nothing", function() {
                    var binder = {
                        bind: helpers.noop,
                        unbind: helpers.noop,
                        isBound: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(binder)._isViewModelBinder(); }).not.toThrow();
                });
            });
        });

        describe("_isViewProvider", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isViewProvider(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isViewProvider(); }).toThrow();
            });

            describe("When is not null", function() {
                it("When get is not a function, throw an exception", function() {
                    expect(function() { gsoft.spa.ensure({})._isViewProvider(); }).toThrow();
                });

                it("When is a view provider, do nothing", function() {
                    var viewProvider = {
                        get: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(viewProvider)._isViewProvider(); }).not.toThrow();
                });
            });
        });

        describe("_isViewRenderer", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isViewRenderer(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isViewRenderer(); }).toThrow();
            });

            describe("When is not null", function() {
                it("When render is not a function, throw an exception", function() {
                    var viewRenderer = {
                        clear: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(viewRenderer)._isViewRenderer(); }).toThrow();
                });

                it("When clear is not a function, throw an exception", function() {
                    var viewRenderer = {
                        render: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(viewRenderer)._isViewRenderer(); }).toThrow();
                });

                it("When is a view provider, do nothing", function() {
                    var viewRenderer = {
                        render: helpers.noop,
                        clear: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(viewRenderer)._isViewRenderer(); }).not.toThrow();
                });
            });
        });

        describe("_isRouteRegistry", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isRouteRegistry(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isRouteRegistry(); }).toThrow();
            });

            describe("When is not null", function() {
                it("When add is not a function, throw an exception", function() {
                    expect(function() { gsoft.spa.ensure({ find: helpers.noop })._isRouteRegistry(); }).toThrow();
                });

                it("When find is not a function, throw an exception", function() {
                    expect(function() { gsoft.spa.ensure({ add: helpers.noop })._isRouteRegistry(); }).toThrow();
                });

                it("When is a view provider, do nothing", function() {
                    var routeRegistry = {
                        add: helpers.noop,
                        find: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(routeRegistry)._isRouteRegistry(); }).not.toThrow();
                });
            });
        });

        describe("_isRouteUrlResolver", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isRouteUrlResolver(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isRouteUrlResolver(); }).toThrow();
            });

            describe("When is not null", function() {
                it("When getRouteUrl is not a function, throw an exception", function() {
                    expect(function() { gsoft.spa.ensure({})._isRouteUrlResolver(); }).toThrow();
                });

                it("When is a view provider, do nothing", function() {
                    var routeUrlResolver = {
                        getRouteUrl: helpers.noop
                    };

                    expect(function() { gsoft.spa.ensure(routeUrlResolver)._isRouteUrlResolver(); }).not.toThrow();
                });
            });
        });

        describe("_isjQueryPromise", function() {
            it("When is null, throw an exception", function() {
                expect(function() { gsoft.spa.ensure(null)._isjQueryPromise(); }).toThrow();
                expect(function() { gsoft.spa.ensure(undefined)._isjQueryPromise(); }).toThrow();
            });

            it("When is not implementing a jQuery promise property, throw an exception", function() {
                var partialPromise1 = {
                    fail: helpers.noop
                };

                var partialPromise2 = {
                    done: helpers.noop
                };

                expect(function() { gsoft.spa.ensure(partialPromise1)._isjQueryPromise(); }).toThrow();
                expect(function() { gsoft.spa.ensure(partialPromise2)._isjQueryPromise(); }).toThrow();
            });

            it("When is a jQuery promise, do nothing", function() {
                expect(function() { gsoft.spa.ensure(new $.Deferred().promise())._isjQueryPromise(); }).not.toThrow();
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline