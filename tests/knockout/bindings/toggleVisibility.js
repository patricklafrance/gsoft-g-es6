(function(helpers) {
    "use strict";
    
    describe("bindings.toggleVisibility", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("When a click event happen and the value is true, update the value to false", function() {
            containerElement.innerHTML = "<a href=\"#\" data-bind=\"toggleVisibility: $root.isHidden\"></a>";
            
            var viewModel = {
                isHidden: ko.observable(true)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            expect(viewModel.isHidden()).toBeTruthy();
        });
        
        it("When a click event happen and the value is false, update the value to true", function() {
            containerElement.innerHTML = "<a href=\"#\" data-bind=\"toggleVisibility: $root.isHidden\"></a>";
            
            var viewModel = {
                isHidden: ko.observable(false)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            expect(viewModel.isHidden()).toBeFalsy();
        });
        
        it("When the underlying value is null, do not update the value", function() {
            containerElement.innerHTML = "<a href=\"#\" data-bind=\"toggleVisibility: isHidden\"></a>";
            
            var viewModel = {
                isHidden: ko.observable(null)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            expect(viewModel.isHidden()).toBeNull();
        });
        
        it("When the value is not an observable, throw an exception", function() {
            containerElement.innerHTML = "<a href=\"#\" data-bind=\"toggleVisibility: 123\"></a>";
            
            var viewModel = {
                isHidden: ko.observable(null)
            };
            
            expect(function() {
                ko.applyBindings(viewModel, containerElement);
            }).toThrow();
        });
    });
})(test.helpers);