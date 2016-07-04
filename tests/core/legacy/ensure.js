// jscs:disable requireBlocksOnNewline

(function() { 
    "use strict";
    
    describe("ensure", function() {
        describe("isjQueryElement", function() {
            it("When no message is specified and assertion fail, use the default message", function() {
                expect(function() { gsoft.ensure(null).isjQueryElement(); }).toThrow(new gsoft.ArgumentError("Parameter must be a jQuery element."));
            });

            it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                expect(function() { gsoft.ensure(null, "parameterName").isjQueryElement(); }).toThrow(new gsoft.ArgumentError("parameterName must be a jQuery element."));
            });

            it("When a context is specified and assertion fail, use the default message with the context", function() {
                expect(function() { gsoft.ensure(null, "parameterName", "context").isjQueryElement(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a jQuery element."));
            });

            it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                expect(function() { gsoft.ensure(null).isjQueryElement("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
            });

            it("When is a DOM element, throw an exception", function() {
                expect(function() { gsoft.ensure(document.createElement("div")).isjQueryElement(); }).toThrow();
            });

            it("When is a jQuery element, do not throw any exception", function() {
                expect(function() { gsoft.ensure($("<div/>")).isjQueryElement(); }).not.toThrow();
            });
        });
    });
})();

// jscs:enable requireBlocksOnNewline