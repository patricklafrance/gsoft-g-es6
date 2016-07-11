// jscs:disable requireBlocksOnNewline

(function($, helpers) {
    "use strict";
    
    describe("spa.viewModel", function() {
        describe("bind", function() {
            it("When element is not a DOM element, throw an exception", function() {
                var viewModel = $.extend({}, gsoft.spa.viewModel);
                
                expect(function() { viewModel.bind(null); }).toThrow();
                expect(function() { viewModel.bind(undefined); }).toThrow();
                expect(function() { viewModel.bind({}); }).toThrow();
                expect(function() { viewModel.bind(""); }).toThrow();
                expect(function() { viewModel.bind(1); }).toThrow();
            });
            
            it("Apply the binding with the specified view model and DOM element", function() {
                spyOn(ko, "applyBindings");
                
                var element = document.createElement("div");
                var viewModel = $.extend({}, gsoft.spa.viewModel, {});
                
                viewModel.bind(element);
                
                expect(ko.applyBindings).toHaveBeenCalledWith(viewModel, element);
            });
            
            describe("When _beforeBind is defined", function() {
                it("Call the function before applying the bindings", function() {
                    var beforeBindWasCalled = false;
                    var beforeBindWasCalledBefore = false;
                    
                    var viewModel = $.extend({}, gsoft.spa.viewModel, {
                        _beforeBind: function() {
                            beforeBindWasCalled = true;
                        }
                    });
                    
                    spyOn(ko, "applyBindings").and.callFake(function() {
                        beforeBindWasCalledBefore = beforeBindWasCalled;
                    });
                    
                    viewModel.bind(document.createElement("div"));
                    
                    expect(beforeBindWasCalledBefore).toBeTruthy();
                });
                
                describe("When _beforeBind return nothing", function() {
                    var viewModel = $.extend({}, gsoft.spa.viewModel, {
                        _beforeBind: helpers.noop()
                    });
                    
                    it("The bindings are applyied", function() {
                        spyOn(ko, "applyBindings");
                        
                        viewModel.bind(document.createElement("div"));
                        
                        expect(ko.applyBindings).toHaveBeenCalled();
                    });
                    
                    it("A promise is returned", function() {
                        var promise = viewModel.bind(document.createElement("div"));
                        
                        expect(promise).not.toBeNull();
                        expect(promise.done).toBeDefined();
                    });
                });
                
                describe("When _beforeBind return a promise", function() {
                    var beforeBindDeferred = null;
                    
                    var viewModel = $.extend({}, gsoft.spa.viewModel, {
                        _beforeBind: function() {
                            beforeBindDeferred = new $.Deferred();

                            return beforeBindDeferred.promise();
                        }
                    });
                    
                    it("The bindings are applyied when the promise resolve successfully", function() {
                        spyOn(ko, "applyBindings");
                        
                        viewModel.bind(document.createElement("div"));
                        
                        expect(ko.applyBindings).not.toHaveBeenCalled();
                        
                        beforeBindDeferred.resolve();
                        
                        expect(ko.applyBindings).toHaveBeenCalled();
                    });
                    
                    it("The bindings are not applyied when the promise fail", function() {
                        spyOn(ko, "applyBindings");
                        
                        viewModel.bind(document.createElement("div"));
                        
                        expect(ko.applyBindings).not.toHaveBeenCalled();
                        
                        beforeBindDeferred.fail();
                        
                        expect(ko.applyBindings).not.toHaveBeenCalled();
                    });
                    
                    it("A promise is returned and the promise is resolved when the _beforeBind promise is resolved", function() {
                        var wasResolved = false;
                        
                        var promise = viewModel.bind(document.createElement("div"));
                        
                        promise.done(function() {
                            wasResolved = true;
                        });
                        
                        expect(wasResolved).toBeFalsy();
                        
                        beforeBindDeferred.resolve();
                        
                        expect(wasResolved).toBeTruthy();
                    });
                });
            });
            
            it("When _beforeBind is not defined, return a resolved promise", function() {
                var isResolved = false;
                var viewModel = $.extend({}, gsoft.spa.viewModel, {});
                
                var promise = viewModel.bind(document.createElement("div"));
                
                promise.done(function() {
                    isResolved = true;
                });
                
                expect(isResolved).toBeTruthy();
            });
            
            describe("When _afterBind is defined", function() {
                var afterBindWasCalled = false;
                
                var viewModel = $.extend({}, gsoft.spa.viewModel, {
                    _afterBind: function() {
                        afterBindWasCalled = true;
                    }
                });
                
                it("Call the function after the bindings are applied", function() {
                    var wasCalledBefore = false;
                    
                    spyOn(ko, "applyBindings").and.callFake(function() {
                        wasCalledBefore = afterBindWasCalled;
                    });
                    
                    viewModel.bind(document.createElement("div"));
                    
                    expect(wasCalledBefore).toBeFalsy();
                });
                
                it("A resolved promise is returned", function() {
                    var isResolved = false;
                    
                    var promise = viewModel.bind(document.createElement("div"));
                
                    promise.done(function() {
                        isResolved = true;
                    });
                    
                    expect(isResolved).toBeTruthy();
                });
            });
            
            describe("When _afterBind is not defined", function() {
                it("A resolved promise is returned", function() {
                    var isResolved = false;
                    var viewModel = $.extend({}, gsoft.spa.viewModel, {});

                    var promise = viewModel.bind(document.createElement("div"));

                    promise.done(function() {
                        isResolved = true;
                    });

                    expect(isResolved).toBeTruthy();
                });
            });
        });
    });
})(jQuery,
   test.helpers);

// jscs:enable requireBlocksOnNewline