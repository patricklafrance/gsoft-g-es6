(function(helpers) {
    "use strict";
    
    describe("bindings.hidden", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Hide the element when the value is true", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: true\"></div>";
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("div")[0];

            expect(element.style.display).toBe("none");
        });
        
        it("Do not hide the element when the value is false", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: false\"></div>";
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("div")[0];

            expect(element.style.display).not.toBe("none");
        });
        
        it("Hide the element when the value is an observable and the value is true", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: ko.observable(true)\"></div>";
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("div")[0];

            expect(element.style.display).toBe("none");
        });
        
        it("Do not hide the element when the value is an observable and the value is false", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: ko.observable(false)\"></div>";
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("div")[0];

            expect(element.style.display).not.toBe("none");
        });
        
        it("When the value is an observable and the value change, update the element visibility", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: $root.isHidden\"></div>";
            
            var viewModel = {
                isHidden: ko.observable(false)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            viewModel.isHidden(true);
            
            var element = containerElement.getElementsByTagName("div")[0];

            expect(element.style.display).toBe("none");
        });
        
        it("Do nothing when the value is null", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: null\"></div>";
            
            var element = containerElement.getElementsByTagName("div")[0];
            
            expect(element.style.display).toBe("");
        });
        
        it("Do nothing when the observable underlying value is null", function() {
            containerElement.innerHTML = "<div data-bind=\"hidden: ko.observable(null)\"></div>";
            
            var element = containerElement.getElementsByTagName("div")[0];
            
            expect(element.style.display).toBe("");
        });
    });
})(test.helpers);