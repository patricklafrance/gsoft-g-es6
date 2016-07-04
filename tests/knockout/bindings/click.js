// jscs:disable requireBlocksOnNewline

(function(helpers) {
    "use strict";
    
    describe("bindings.click", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
    
        it("When the enable binding is true, the click event is triggered", function() {
            var wasCalled = false;

            containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, enable: true\"></a>";

            var viewModel = {
                onClick: function() {
                    wasCalled = true;
                }
            };

            ko.applyBindings(viewModel, containerElement);
            helpers.dom.triggerEvent(document.getElementById("foo"), "click");

            expect(wasCalled).toBeTruthy();
        });

        it("When the enable binding is false, the click event is not triggered", function() {
            var wasCalled = false;

            containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, enable: false\"></a>";

            var viewModel = {
                onClick: function() {
                    wasCalled = true;
                }
            };

            ko.applyBindings(viewModel, containerElement);
            helpers.dom.triggerEvent(document.getElementById("foo"), "click");

            expect(wasCalled).toBeFalsy();
        });

        it("When the disable binding is true, the click event is not triggered", function() {
            var wasCalled = false;

            containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, disable: true\"></a>";

            var viewModel = {
                onClick: function() {
                    wasCalled = true;
                }
            };

            ko.applyBindings(viewModel, containerElement);
            helpers.dom.triggerEvent(document.getElementById("foo"), "click");

            expect(wasCalled).toBeFalsy();
        });

        it("When the disable binding is false, the click event is not triggered", function() {
            var wasCalled = false;

            containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, disable: false\"></a>";

            var viewModel = {
                onClick: function() {
                    wasCalled = true;
                }
            };

            ko.applyBindings(viewModel, containerElement);
            helpers.dom.triggerEvent(document.getElementById("foo"), "click");

            expect(wasCalled).toBeTruthy();
        });
        
        describe("When the enable binding value is an observable", function() {
            it("It works when value is true", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, enable: $root.isEnabled\"></a>";

                var viewModel = {
                    isEnabled: ko.observable(true),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeTruthy();
            });
            
            it("It works when value is false", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, enable: $root.isEnabled\"></a>";

                var viewModel = {
                    isEnabled: ko.observable(false),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeFalsy();
            });
            
            it("When the value changed, the CSS class is reevaluated", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, enable: $root.isEnabled\"></a>";

                var viewModel = {
                    isEnabled: ko.observable(false),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isEnabled(true);
                
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeTruthy();
            });
        });

        describe("When the disable binding value is an observable", function() {
            it("It works when the value is true", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, disable: $root.isDisabled\"></a>";

                var viewModel = {
                    isDisabled: ko.observable(true),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeFalsy();
            });
            
            it("It works when the value is false", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, disable: $root.isDisabled\"></a>";

                var viewModel = {
                    isDisabled: ko.observable(false),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeTruthy();
            });
            
            
            it("When the value changed, the CSS class is reevaluated", function() {
                var wasCalled = false;

                containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick, disable: $root.isDisabled\"></a>";

                var viewModel = {
                    isDisabled: ko.observable(false),
                    onClick: function() {
                        wasCalled = true;
                    }
                };

                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isDisabled(true);
                
                helpers.dom.triggerEvent(document.getElementById("foo"), "click");

                expect(wasCalled).toBeFalsy();
            });
        });
        
        it("When the enable and disable bindings are not specified, nothing happens", function() {
            containerElement.innerHTML = "<a id=\"foo\" href=\"#\" data-bind=\"click: $root.onClick\"></a>";
            
            var viewModel = {
                onClick: helpers.noop
            };

            expect(function() { ko.applyBindings(viewModel, containerElement); }).not.toThrow();
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline