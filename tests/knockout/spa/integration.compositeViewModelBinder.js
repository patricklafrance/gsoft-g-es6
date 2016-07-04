// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler) {
    "use strict";
    
    function createViewModel(onDisposed) {
        return {
            hello: "Hello world!",

            bind: function(element) {
                var deferred = new $.Deferred();
                deferred.resolve();

                ko.applyBindings(this, element);

                return deferred.promise();
            },

            dispose: onDisposed
        };
    }
    
    function createViewModelFactory(onDisposed) {
        return function() {
            return createViewModel(onDisposed);
        };
    }
    
    function createBinding(viewModelFactory, bindingElementSelector) {
        return {
            viewModelFactory: viewModelFactory,
            bindingElementAccessor: function(element) {
                return element.querySelector(bindingElementSelector);
            }
        };
    }
    
    function registerPage(url, binding1, binding2) {
        gsoft.spa.shell.registerPage({
            url: url, 
            viewUrl: url, 
            viewModelBinder: new gsoft.spa.CompositeViewModelBinder([binding1, binding2])
        });
    }
    
    // ---------------------------------
    
    describe("spa.integration.compositeViewModelBinder", function() {
        var routeUrl = null;
        var containerElement = null;
        var view = "<span class=\"binding-element-1\" data-bind=\"text: hello\"></span><span class=\"binding-element-2\" data-bind=\"text: hello\"></span>";
        var disposeCount = 0;

        beforeEach(function() {
            helpers.ajax.install();
            
            routeUrl = dataSampler.generateString(10);
            containerElement = document.createElement("div");
            
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.ajax.uninstall();
            helpers.dom.removeElementFromBody(containerElement);
            
            disposeCount = 0;
        });
        
        describe("When the canDispose function is not implemented", function() {
            beforeEach(function() {
                var binding1 = createBinding(createViewModelFactory(function() { disposeCount += 1; }), ".binding-element-1");
                var binding2 = createBinding(createViewModelFactory(function() { disposeCount += 1; }), ".binding-element-2");

                registerPage(routeUrl, binding1, binding2);

                gsoft.spa.shell.start({
                    containerElement: containerElement
                });
            });
            
            describe("When the route is runned", function() {
                it("Fetch the view from the server", function() {
                    gsoft.spa.router.runRoute(routeUrl);

                    expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).not.toBeTruthy();
                });

                it("Bind the view model", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    expect(containerElement.querySelector(".binding-element-1")).not.toBeNull();
                    expect(containerElement.querySelector(".binding-element-1").innerHTML).toBe("Hello world!");
                    expect(containerElement.querySelector(".binding-element-2")).not.toBeNull();
                    expect(containerElement.querySelector(".binding-element-2").innerHTML).toBe("Hello world!");
                });

                it("Page changing events are published throught the mediator", function() {
                    var count = 0;

                    gsoft.spa.shell.onPageChanging(function(targetPage) {
                        if (targetPage.pageUrl === routeUrl) {
                            count += 1;
                        }
                    });

                    gsoft.spa.shell.onPageChanged(function(page) {
                        if (page.pageUrl === routeUrl) {
                            count += 1;
                        }
                    });

                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    expect(count).toBe(2);
                });
            });

            describe("When the route is exited", function() {
                it("Dispose the view model", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(2);
                });

                it("Clear the bindings on the DOM element", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(containerElement.querySelector(".binding-element-1")).not.toBeNull();
                    expect(containerElement.querySelector(".binding-element-2")).not.toBeNull();
                    expect(helpers.isNull(ko.dataFor(containerElement.querySelector(".binding-element-1")))).toBeTruthy();
                    expect(helpers.isNull(ko.dataFor(containerElement.querySelector(".binding-element-1")))).toBeTruthy();
                });
            });
        });
        
        describe("When the canDispose function is implemented on all the bindings", function() {
            var binding1CanDisposeReturnValue = null;
            var binding2CanDisposeReturnValue = null;
            
            beforeEach(function() {
                var binding1 = createBinding(function() {
                    var viewModel = createViewModel(function() {
                        disposeCount += 1;
                    });
                    
                    viewModel.canDispose = function() {
                        return binding1CanDisposeReturnValue;
                    };
                    
                    return viewModel;
                }, ".binding-element-1");
                
                var binding2 = createBinding(function() {
                    var viewModel = createViewModel(function() {
                        disposeCount += 1;
                    });
                    
                    viewModel.canDispose = function() {
                        return binding2CanDisposeReturnValue;
                    };
                    
                    return viewModel;
                }, ".binding-element-2");
                    
                registerPage(routeUrl, binding1, binding2);

                gsoft.spa.shell.start({
                    containerElement: containerElement
                });
            });
            
            describe("When all the bindings viewModel.canDispose return a boolean value", function() {
                it("When all the values are true, dispose the bindings", function() {
                    binding1CanDisposeReturnValue = true;
                    binding2CanDisposeReturnValue = true;
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(2);
                });
                
                it("When all the values are true, the exit callback is called with true", function() {
                    binding1CanDisposeReturnValue = true;
                    binding2CanDisposeReturnValue = true;
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    var canExit = null;
                    
                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit(function(value) {
                        canExit = value;
                    });
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                    
                    expect(canExit).toBeTruthy();
                });
                
                it("When all the values are false, do not dispose the bindings", function() {
                    binding1CanDisposeReturnValue = false;
                    binding2CanDisposeReturnValue = false;
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(0);
                });
                
                it("When all the values are false, the exit callback is called with false", function() {
                    binding1CanDisposeReturnValue = false;
                    binding2CanDisposeReturnValue = false;
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    var canExit = null;
                    
                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit(function(value) {
                        canExit = value;
                    });
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                    
                    expect(canExit).toBeFalsy();
                });
                
                describe("When a single value is false, do not dispose the bindings", function() {
                    it("When the first binding value is false", function() {
                        binding1CanDisposeReturnValue = false;
                        binding2CanDisposeReturnValue = true;

                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse(view);

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit($.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                    
                    it("When a subsequent binding value is false", function() {
                        binding1CanDisposeReturnValue = true;
                        binding2CanDisposeReturnValue = false;

                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse(view);

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit($.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                    
                    it("The exit callback is called with false", function() {
                        binding1CanDisposeReturnValue = true;
                        binding2CanDisposeReturnValue = false;

                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse(view);

                        var canExit = null;

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(function(value) {
                            canExit = value;
                        });
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(canExit).toBeFalsy();
                    });
                });
            });
            
            describe("When all the bindings viewModel.canDispose return a promise", function() {
                it("When all the promises resolve, dispose the bindings", function() {
                    var deferred1 = new $.Deferred();
                    deferred1.resolve();
                    
                    var deferred2 = new $.Deferred();
                    deferred2.resolve();
                    
                    binding1CanDisposeReturnValue = deferred1.promise();
                    binding2CanDisposeReturnValue = deferred2.promise();
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(2);
                });
                
                it("When all the promises are rejected, do not dispose the bindings", function() {
                    var deferred1 = new $.Deferred();
                    deferred1.reject();
                    
                    var deferred2 = new $.Deferred();
                    deferred2.reject();
                    
                    binding1CanDisposeReturnValue = deferred1.promise();
                    binding2CanDisposeReturnValue = deferred2.promise();
                    
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(0);
                });
                
                describe("When a single promise is rejected, do not dispose the bindings", function() {
                    it("When the first binding promise is rejected", function() {
                        var deferred1 = new $.Deferred();
                        deferred1.reject();

                        var deferred2 = new $.Deferred();
                        deferred2.resolve();

                        binding1CanDisposeReturnValue = deferred1.promise();
                        binding2CanDisposeReturnValue = deferred2.promise();

                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse(view);

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit($.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                    
                    it("When a subsequent binding promise is rejected", function() {
                        var deferred1 = new $.Deferred();
                        deferred1.resolve();

                        var deferred2 = new $.Deferred();
                        deferred2.reject();

                        binding1CanDisposeReturnValue = deferred1.promise();
                        binding2CanDisposeReturnValue = deferred2.promise();

                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse(view);

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit($.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                });
            });
            
            describe("When the bindings viewModel.canDispose return a mix of boolean values and promises", function() {
                it("When the boolean value is true and the promise resolve, dispose the bindings", function() {
                    binding1CanDisposeReturnValue = true;
                    
                    var deferred2 = new $.Deferred();
                    deferred2.resolve();

                    binding2CanDisposeReturnValue = deferred2.promise();

                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(2);
                });
                
                it("When the boolean value is true and the promise is rejected, do not dispose the bindings", function() {
                    var deferred1 = new $.Deferred();
                    deferred1.reject();
                    
                    binding1CanDisposeReturnValue = deferred1.promise();
                    binding2CanDisposeReturnValue = true;

                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(0);
                });
                
                it("When the boolean value is false and the promise resolve, do not dispose the bindings", function() {
                    binding1CanDisposeReturnValue = false;
                    
                    var deferred2 = new $.Deferred();
                    deferred2.resolve();
                    
                    binding2CanDisposeReturnValue = deferred2.promise();

                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(0);
                });
                
                it("When the boolean value is false and the promise is rejected, do not dispose the bindings", function() {
                    var deferred1 = new $.Deferred();
                    deferred1.reject();
                    
                    binding1CanDisposeReturnValue = deferred1.promise();
                    binding2CanDisposeReturnValue = false;

                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit($.noop);
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(0);
                });
            });
        });
        
        describe("When a single binding implement viewModel.canDispose", function() {
            var canDisposeReturnValue = null;
            
            beforeEach(function() {
                var binding1 = createBinding(createViewModelFactory(function() { disposeCount += 1; }), ".binding-element-1");
                
                var binding2 = createBinding(function() {
                    var viewModel = createViewModel(function() {
                        disposeCount += 1;
                    });
                    
                    viewModel.canDispose = function() {
                        return canDisposeReturnValue;
                    };
                    
                    return viewModel;
                }, ".binding-element-2");
                    
                registerPage(routeUrl, binding1, binding2);

                gsoft.spa.shell.start({
                    containerElement: containerElement
                });
            });
            
            it("When the value is true, dispose the bindings", function() {
                canDisposeReturnValue = true;
                
                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                Path.routes.defined[routeUrl].do_exit($.noop);
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                expect(disposeCount).toBe(2);
            });
            
            it("When the value is false, do not dispose the bindings", function() {
                canDisposeReturnValue = false;
                
                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                Path.routes.defined[routeUrl].do_exit($.noop);
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                expect(disposeCount).toBe(0);
            });
            
            it("When the promise resolve, dispose the bindings", function() {
                var deferred = new $.Deferred();
                deferred.resolve();
                
                canDisposeReturnValue = deferred.promise();
                
                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                Path.routes.defined[routeUrl].do_exit($.noop);
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                expect(disposeCount).toBe(2);
            });
            
            it("When the promise is rejected, do not dispose the bindings", function() {
                var deferred = new $.Deferred();
                deferred.reject();
                
                canDisposeReturnValue = deferred.promise();
                
                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                Path.routes.defined[routeUrl].do_exit($.noop);
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                expect(disposeCount).toBe(0);
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline