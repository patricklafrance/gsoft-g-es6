// jscs:disable requireBlocksOnNewline

(function(helpers) {
    "use strict";
    
    describe("bindings.disabledCssClass", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("When the enable binding is true, the CSS class is not on the element", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', enable: true\"></button>";
            
            ko.applyBindings({}, containerElement);
            
            var button = document.getElementsByTagName("button")[0];
            
            expect(button.classList.contains("foo")).toBeFalsy();
        });
        
        it("When the enable binding is false, the CSS class is on the element", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', enable: false\"></button>";
            
            ko.applyBindings({}, containerElement);
            
            var button = document.getElementsByTagName("button")[0];
            
            expect(button.classList.contains("foo")).toBeTruthy();
        });
        
        it("When the disable binding is true, the CSS class is on the element", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', disable: true\"></button>";
            
            ko.applyBindings({}, containerElement);
            
            var button = document.getElementsByTagName("button")[0];
            
            expect(button.classList.contains("foo")).toBeTruthy();
        });
        
        it("When the disable binding is false, the CSS class is not on the element", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', disable: false\"></button>";
            
            ko.applyBindings({}, containerElement);
            
            var button = document.getElementsByTagName("button")[0];
            
            expect(button.classList.contains("foo")).toBeFalsy();
        });
        
        describe("When the enable binding value is an observable", function() {
            it("It works when value is true", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', enable: isEnabled\"></button>";
            
                var viewModel = {
                    isEnabled: ko.observable(true)
                };
                
                ko.applyBindings(viewModel, containerElement);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeFalsy();
            });
            
            it("It works when value is false", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', enable: isEnabled\"></button>";
            
                var viewModel = {
                    isEnabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeTruthy();
            });
            
            it("When the value changed, the CSS class is reevaluated", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', enable: isEnabled\"></button>";
            
                var viewModel = {
                    isEnabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isEnabled(true);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeFalsy();
            });
        });
        
        describe("When the disable binding value is an observable", function() {
            it("It works when value is true", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', disable: isDisabled\"></button>";
            
                var viewModel = {
                    isDisabled: ko.observable(true)
                };
                
                ko.applyBindings(viewModel, containerElement);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeTruthy();
            });
            
            it("It works when value is false", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', disable: isDisabled\"></button>";
            
                var viewModel = {
                    isDisabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeFalsy();
            });
            
            it("When the value changed, the CSS class is reevaluated", function() {
                containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo', disable: isDisabled\"></button>";
            
                var viewModel = {
                    isDisabled: ko.observable(false)
                };
                
                ko.applyBindings(viewModel, containerElement);
                
                viewModel.isDisabled(true);

                var button = document.getElementsByTagName("button")[0];

                expect(button.classList.contains("foo")).toBeTruthy();
            });
        });
        
        it("When the value is an observable, throw an exception", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: ko.observable('foo'), disable: true\"></button>";

            expect(function() { ko.applyBindings({}, containerElement); }).toThrow();
        });
        
        it("When the enable and disable bindings are not specified, throw an exception", function() {
            containerElement.innerHTML = "<button data-bind=\"disabledCssClass: 'foo'\"></button>";

            expect(function() { ko.applyBindings({}, containerElement); }).toThrow();
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline