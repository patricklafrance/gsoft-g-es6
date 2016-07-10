(function(helpers, dataSampler) {
    "use strict";
    
    function removeEmptySpaces(str) {
        return str.replace(/\s/g, "");
    }
    
    describe("debugging.binding.toJSON", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Set the JSON when the value is a string", function() {
            containerElement.innerHTML = "<pre data-bind=\"toJSON: $root\"></pre>";
            
            var value = dataSampler.generateString(10);
            
            var viewModel = {
                prop: ko.observable(value)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var element = containerElement.getElementsByTagName("pre")[0];
            
            expect(removeEmptySpaces(element.innerHTML)).toBe(`{\"prop\":\"${value}\"}`);
        });
        
        it("Set the JSON when the value is an observable", function() {
            containerElement.innerHTML = "<pre data-bind=\"toJSON: ko.observable($root)\"></pre>";
            
            var value = dataSampler.generateString(10);
            
            var viewModel = {
                prop: ko.observable(value)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var element = containerElement.getElementsByTagName("pre")[0];
            
            expect(removeEmptySpaces(element.innerHTML)).toBe(`{\"prop\":\"${value}\"}`);
        });
        
        it("Do nothing when the value is null", function() {
            containerElement.innerHTML = "<pre data-bind=\"toJSON: null\"></pre>";
            
            var element = containerElement.getElementsByTagName("pre")[0];
            
            expect(element.innerHTML).toBe("");
        });
        
        it("Do nothing when the observable underlying value is null", function() {
            containerElement.innerHTML = "<pre data-bind=\"toJSON: ko.observable(null)\"></pre>";
            
            var element = containerElement.getElementsByTagName("pre")[0];
            
            expect(element.innerHTML).toBe("");
        });
    });
})(test.helpers,
   test.dataSampler);