(function(helpers, dataSampler) {
    "use strict";
    
    describe("bindings.href", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Set the link href when the value is a string", function() {
            var url = dataSampler.generateString(10);
            
            containerElement.innerHTML = `<a data-bind=\"href: '${url}'\"></a>`;
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("a")[0];

            expect(element.getAttribute("href")).toBe(url);
        });
        
        it("Set the link href when the value is an observable", function() {
            var url = dataSampler.generateString(10);
            
            containerElement.innerHTML = `<a data-bind=\"href: ko.observable('${url}')\"></a>`;
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("a")[0];

            expect(element.getAttribute("href")).toBe(url);
        });
        
        it("When the value is an observable and the value change, update the link href", function() {
            containerElement.innerHTML = "<a data-bind=\"href: $root.href\"></a>";
            
            var viewModel = {
                href: ko.observable(dataSampler.generateString(10))
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var url = dataSampler.generateString(10);
            viewModel.href(url);
            
            var element = containerElement.getElementsByTagName("a")[0];

            expect(element.getAttribute("href")).toBe(url);
        });
        
        it("Do nothing when the value is null", function() {
            containerElement.innerHTML = "<a data-bind=\"href: null\"></a>";
            
            var element = containerElement.getElementsByTagName("a")[0];
            
            expect(element.getAttribute("href")).toBeNull();
        });
        
        it("Do nothing when the observable underlying value is null", function() {
            containerElement.innerHTML = "<a data-bind=\"href: ko.observable(null)\"></a>";
            
            var element = containerElement.getElementsByTagName("a")[0];
            
            expect(element.getAttribute("href")).toBeNull();
        });
    });
})(test.helpers,
   test.dataSampler);