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
    
    function registerPage(url, viewUrl, viewModelAccessor) {
        gsoft.spa.shell.registerPage({
            url: url,
            viewUrl: viewUrl,
            viewModelBinder: new gsoft.spa.SimpleViewModelBinder(viewModelAccessor)
        });
    }
    
    // ---------------------------------
    
    describe("spa.integration.simpleViewModelBinder", function() {
        var routeUrl = null;
        var viewUrl = null;
        var containerElement = null;
        var disposeCount = 0;
        
        beforeEach(function() {
            helpers.ajax.install();

            routeUrl = dataSampler.generateString(10);
            viewUrl = dataSampler.generateString(10);
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
                registerPage(routeUrl, viewUrl, createViewModelFactory(function() {
                    disposeCount += 1;
                }));

                gsoft.spa.shell.start({ containerElement: containerElement });
            });

            describe("When the route is runned", function() {
                it("Fetch the view from the server", function() {
                    gsoft.spa.router.runRoute(routeUrl);

                    expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).not.toBeTruthy();
                });

                it("Bind the view model", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                    expect(containerElement.getElementsByTagName("span").length).toBe(1);
                    expect(containerElement.getElementsByTagName("span")[0].innerHTML).toBe("Hello world!");
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
                    helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                    expect(count).toBe(2);
                });
            });

            describe("When the route is exited", function() {
                it("Dispose the view model", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(disposeCount).toBe(1);
                });

                it("Clear the bindings on the DOM element", function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                    expect(containerElement.getElementsByTagName("span").length).toBe(1);
                    expect(helpers.isNull(ko.dataFor(containerElement))).toBeTruthy();
                });
            });
        });
        
        describe("When the canDispose function is implemented", function() {
            var canDisposeReturnValue = null;
            
            beforeEach(function() {
                registerPage(routeUrl, viewUrl, function() {
                    var viewModel = createViewModel(function() {
                        disposeCount += 1;
                    });

                    viewModel.canDispose = function() {
                        return canDisposeReturnValue;
                    };
                    
                    return viewModel;
                });
                
                gsoft.spa.shell.start({ containerElement: containerElement });
            });
            
            afterEach(function() {
                canDisposeReturnValue = null;
            });
            
            describe("When the route is exited", function() {
                describe("When canDispose returns a boolean", function() {
                    it("When canDispose returns true, dispose the view model", function() {
                        canDisposeReturnValue = true;
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(helpers.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(1);
                    });
                    
                    it("When canDispose returns true, the exit callback is called with true", function() {
                        canDisposeReturnValue = true;
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        var canExit = null;
                        
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(function(value) {
                            canExit = value;
                        });
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(canExit).toBeTruthy();
                    });
                    
                    it("When canDispose returns false, do not dispose the view model", function() {
                        canDisposeReturnValue = false;
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(helpers.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                    
                    it("When canDispose returns false, the exit callback is called with false", function() {
                        canDisposeReturnValue = false;
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        var canExit = null;
                        
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(function(value) {
                            canExit = value;
                        });
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(canExit).toBeFalsy();
                    });
                });
                
                describe("When canDispose returns a promise", function() {
                    it("When the promise resolve, dispose the view model", function() {
                        var deferred = new $.Deferred();
                        deferred.resolve();
                        
                        canDisposeReturnValue = deferred.promise();
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(helpers.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(1);
                    });
                    
                    it("When the promise resolve, the exit callback is called with true", function() {
                        var deferred = new $.Deferred();
                        deferred.resolve();
                        
                        canDisposeReturnValue = deferred.promise();
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        var canExit = null;
                        
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(function(value) {
                            canExit = value;
                        });
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(canExit).toBeTruthy();
                    });
                    
                    it("When the promise is rejected, do not dispose the view model", function() {
                        var deferred = new $.Deferred();
                        deferred.reject();
                        
                        canDisposeReturnValue = deferred.promise();
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(helpers.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(disposeCount).toBe(0);
                    });
                    
                    it("When the promise is rejected, the exit callback is called with false", function() {
                        var deferred = new $.Deferred();
                        deferred.reject();
                        
                        canDisposeReturnValue = deferred.promise();
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        var canExit = null;
                        
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(function(value) {
                            canExit = value;
                        });
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

                        expect(canExit).toBeFalsy();
                    });
                });
                
                it("When canDispose returns something else than a bool or a promise, throw an exception", function() {
                    function run(returnValue) {
                        canDisposeReturnValue = returnValue;
                        
                        gsoft.spa.router.runRoute(routeUrl);
                        helpers.ajax.setupSuccessfulGetResponse("<span data-bind=\"text: hello\"></span>");

                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        Path.routes.defined[routeUrl].do_exit(helpers.noop);
                        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                    }
                    
                    expect(function() { run(null); }).toThrow();
                    expect(function() { run(undefined); }).toThrow();
                    expect(function() { run(1); }).toThrow();
                    expect(function() { run({}); }).toThrow();
                });
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline