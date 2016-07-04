(function(helpers, dataSampler) {
    "use strict";
    
    describe("debugging.binding.toConsole", function() {
        var containerElement = null;
        
        beforeEach(function() {
            containerElement = document.createElement("div");
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.dom.removeElementFromBody(containerElement);
        });
        
        it("Log data to console", function() {
            spyOn(gsoft.utils, "trace");
            
            containerElement.innerHTML = "<div data-bind=\"toConsole: $root\"></div>";
            
            var value = dataSampler.generateString(10);
            
            var viewModel = {
                prop: ko.observable(value)
            };
            
            ko.applyBindings(viewModel, containerElement);
            
            expect(gsoft.utils.trace).toHaveBeenCalledWith(viewModel);
        });
    });
})(test.helpers,
   test.dataSampler);