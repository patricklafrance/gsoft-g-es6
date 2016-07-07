(function(helpers) {
    "use strict";
    
    describe("bindings.optionsBooleanValue", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Can read a boolean value", function() {
            // Not sure why, but if I use real quotes, the options bindings doesn't render properly.
            var options = "[{&quot;text&quot;:&quot;Foo&quot;,&quot;value&quot;:&quot;true&quot;},{&quot;text&quot;:&quot;Bar&quot;,&quot;value&quot;:&quot;false&quot;}]";
            
            containerElement.innerHTML = `<select id=\"foo\" data-bind=\"options: ${options}, optionsText: 'text', optionsValue: 'value', optionsBooleanValue: $root.value\"></select>`
            
            var viewModel = {
                value: ko.observable(false)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var select = document.getElementById("foo");
            
            expect(select.value).toBe("false");
        });
        
        it("Can write a boolean value", function() {
            // Not sure why, but if I use real quotes, the options bindings doesn't render properly.
            var options = "[{&quot;text&quot;:&quot;Foo&quot;,&quot;value&quot;:&quot;true&quot;},{&quot;text&quot;:&quot;Bar&quot;,&quot;value&quot;:&quot;false&quot;}]";
            
            containerElement.innerHTML = `<select id=\"foo\" data-bind=\"options: ${options}, optionsText: 'text', optionsValue: 'value', optionsBooleanValue: $root.value\"></select>`;
            
            var viewModel = {
                value: ko.observable(false)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var select = document.getElementById("foo");
            select.value = "true";
            helpers.dom.triggerEvent(select, "change");

            expect(viewModel.value.peek()).toBe(true);
        });
        
        it("Can update a boolean value", function() {
            // Not sure why, but if I use real quotes, the options bindings doesn't render properly.
            var options = "[{&quot;text&quot;:&quot;Foo&quot;,&quot;value&quot;:&quot;true&quot;},{&quot;text&quot;:&quot;Bar&quot;,&quot;value&quot;:&quot;false&quot;}]";
            
            containerElement.innerHTML = `<select id=\"foo\" data-bind=\"options: ${options}, optionsText: 'text', optionsValue: 'value', optionsBooleanValue: $root.value\"></select>`;
            
            var viewModel = {
                value: ko.observable(false)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            viewModel.value(true);
            
            var select = document.getElementById("foo");
            
            expect(select.value).toBe("true");
        });
    });
})(test.helpers);