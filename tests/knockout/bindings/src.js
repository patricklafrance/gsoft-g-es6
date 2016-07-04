(function(helpers, dataSampler) {
    "use strict";
    
    describe("bindings.src", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Set the image src when the value is a string", function() {
            var url = dataSampler.generateString(10);
            
            containerElement.innerHTML = "<img data-bind=\"src: '{0}'\" />".format(url);
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("img")[0];

            expect(element.getAttribute("src")).toBe(url);
        });
        
        it("Set the image src when the value is an observable", function() {
            var url = dataSampler.generateString(10);
            
            containerElement.innerHTML = "<img data-bind=\"src: ko.observable('{0}')\" />".format(url);
            
            ko.applyBindings({}, containerElement);
            
            var element = containerElement.getElementsByTagName("img")[0];

            expect(element.getAttribute("src")).toBe(url);
        });
        
        it("When the value is an observable and the value change, update the image src", function() {
            containerElement.innerHTML = "<img data-bind=\"src: $root.src\" />";
            
            var viewModel = {
                src: ko.observable(dataSampler.generateString(10))
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            var url = dataSampler.generateString(10);
            viewModel.src(url);
            
            var element = containerElement.getElementsByTagName("img")[0];

            expect(element.getAttribute("src")).toBe(url);
        });
        
        it("Do nothing when the value is null", function() {
            containerElement.innerHTML = "<img data-bind=\"src: null\" />";
            
            var element = containerElement.getElementsByTagName("img")[0];
            
            expect(element.getAttribute("src")).toBeNull();
        });
        
        it("Do nothing when the observable underlying value is null", function() {
            containerElement.innerHTML = "<img data-bind=\"src: ko.observable(null)\" />";
            
            var element = containerElement.getElementsByTagName("img")[0];
            
            expect(element.getAttribute("src")).toBeNull();
        });
    });
})(test.helpers,
   test.dataSampler);