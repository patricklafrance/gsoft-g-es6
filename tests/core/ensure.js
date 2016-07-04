// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler, undefined) {
    "use strict";

    describe("ensure", function() {
        describe("ensure", function() {
            it("Can call ensure with any type of parameters", function() {
                expect(function() { gsoft.ensure(null); }).not.toThrow();
                expect(function() { gsoft.ensure(undefined); }).not.toThrow();
                expect(function() { gsoft.ensure(""); }).not.toThrow();
                expect(function() { gsoft.ensure(dataSampler.generateString(5)); }).not.toThrow();
                expect(function() { gsoft.ensure(1); }).not.toThrow();
                expect(function() { gsoft.ensure(true); }).not.toThrow();
                expect(function() { gsoft.ensure(helpers.noop); }).not.toThrow();
            });
        
            it("Can set assertions", function() {
                expect(helpers.isFunction(gsoft.ensure(dataSampler.generateString(5)).isNotEmpty)).toBeTruthy();
            });
        
            it("Can chain assertions", function() {
                expect(helpers.isFunction(gsoft.ensure(dataSampler.generateString(5)).isNotEmpty().isNotEmpty)).toBeTruthy();
            });
        
            it("When chaining assertions, parameters are passed between context", function() {
                expect(function() { gsoft.ensure(dataSampler.generateString(5), "parameterName", "context").isNotEmpty().isFunction(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a function."));
            });

            it("Can extend assertions object", function() {
                gsoft.ensure.assertions.customAssertion = helpers.noop;

                expect(helpers.isFunction(gsoft.ensure("").customAssertion)).toBeTruthy();
            });
        });

        describe("assertions", function() {
            describe("isNotNull", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isNotNull(); }).toThrow(new gsoft.ArgumentNullError(null, "Parameter cannot be null."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isNotNull(); }).toThrow(new gsoft.ArgumentNullError(null, "parameterName cannot be null."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isNotNull(); }).toThrow(new gsoft.ArgumentNullError(null, "context - parameterName cannot be null."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isNotNull("assertionMessage"); }).toThrow(new gsoft.ArgumentNullError(null, "assertionMessage"));
                });

                it("When is not null, do not throw any exception", function() {
                    expect(function() { gsoft.ensure("").isNotNull(); }).not.toThrow();
                });
            });

            describe("isNotEmpty", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure("").isNotEmpty(); }).toThrow(new gsoft.ArgumentError("Parameter cannot be empty."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure("", "parameterName").isNotEmpty(); }).toThrow(new gsoft.ArgumentError("parameterName cannot be empty."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure("", "parameterName", "context").isNotEmpty(); }).toThrow(new gsoft.ArgumentError("context - parameterName cannot be empty."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure("").isNotEmpty("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is an empty array, throw an exception", function() {
                    expect(function() { gsoft.ensure([]).isNotEmpty(); }).toThrow();
                });

                it("When is not empty, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(dataSampler.generateString(5)).isNotEmpty(); }).not.toThrow();
                    expect(function() { gsoft.ensure([dataSampler.generateString(5)]).isNotEmpty(); }).not.toThrow();
                });
            });

            describe("isNotNullOrEmpty", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure("").isNotNullOrEmpty(); }).toThrow(new gsoft.ArgumentError("Parameter cannot be empty."));
                    expect(function() { gsoft.ensure(null).isNotNullOrEmpty(); }).toThrow(new gsoft.ArgumentNullError(null, "Parameter cannot be null."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure("", "parameterName").isNotNullOrEmpty(); }).toThrow(new gsoft.ArgumentError("parameterName cannot be empty."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure("", "parameterName", "context").isNotNullOrEmpty(); }).toThrow(new gsoft.ArgumentError("context - parameterName cannot be empty."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure("").isNotNullOrEmpty("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is not null or empty, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(dataSampler.generateString(5)).isNotNullOrEmpty(); }).not.toThrow();
                });
            });

            describe("isFunction", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isFunction(); }).toThrow(new gsoft.ArgumentError("Parameter must be a function."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isFunction(); }).toThrow(new gsoft.ArgumentError("parameterName must be a function."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isFunction(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a function."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isFunction("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is a function, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(helpers.noop).isFunction(); }).not.toThrow();
                });
            });
            
            describe("isDate", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isDate(); }).toThrow(new gsoft.ArgumentError("Parameter must be a date."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isDate(); }).toThrow(new gsoft.ArgumentError("parameterName must be a date."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isDate(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a date."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isDate("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is a date, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(new Date(2015, 1, 1)).isDate(); }).not.toThrow();
                });
            });
            
            describe("isNumber", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isNumber(); }).toThrow(new gsoft.ArgumentError("Parameter must be a number."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isNumber(); }).toThrow(new gsoft.ArgumentError("parameterName must be a number."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isNumber(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a number."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isNumber("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is a number, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(1).isNumber(); }).not.toThrow();
                    
                    /* jshint -W053 */
                    expect(function() { gsoft.ensure(new Number(1)).isNumber(); }).not.toThrow();
                    /* jshint +W053 */
                });
            });

            describe("isArray", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isArray(); }).toThrow(new gsoft.ArgumentError("Parameter must be an array."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isArray(); }).toThrow(new gsoft.ArgumentError("parameterName must be an array."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isArray(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be an array."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isArray("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is an array, do not throw any exception", function() {
                    expect(function() { gsoft.ensure([]).isArray(); }).not.toThrow();
                });
            });

            describe("isObject", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isObject(); }).toThrow(new gsoft.ArgumentError("Parameter must be an object."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isObject(); }).toThrow(new gsoft.ArgumentError("parameterName must be an object."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isObject(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be an object."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isObject("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is an object, do not throw any exception", function() {
                    var PrototypeObject = function() {
                    };

                    expect(function() { gsoft.ensure({}).isObject(); }).not.toThrow();
                    expect(function() { gsoft.ensure(new PrototypeObject()).isObject(); }).not.toThrow();
                });
            });

            describe("isTrue", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isTrue(); }).toThrow(new gsoft.ArgumentError("Parameter is invalid."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isTrue(); }).toThrow(new gsoft.ArgumentError("parameterName is invalid."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isTrue(); }).toThrow(new gsoft.ArgumentError("context - parameterName is invalid."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isTrue(null, "assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When value is true and no evaluator has been specified, do not throw an exception", function() {
                    expect(function() { gsoft.ensure(true).isTrue(); }).not.toThrow();
                });

                it("When value is false and no evaluator has been specified, throw an exception", function() {
                    expect(function() { gsoft.ensure(false).isTrue(); }).toThrow();
                });

                it("When evaluator evaluates to false, throw an exception", function() {
                    expect(function() { gsoft.ensure("").isTrue(function() { return false; }); }).toThrow();
                });

                it("When evaluator evaluates to true, do not throw any exception", function() {
                    expect(function() { gsoft.ensure("").isTrue(function() { return true; }); }).not.toThrow();
                });
            });
            
            describe("isDomElement", function() {
                it("When no message is specified and assertion fail, use the default message", function() {
                    expect(function() { gsoft.ensure(null).isDomElement(); }).toThrow(new gsoft.ArgumentError("Parameter must be a DOM element."));
                });

                it("When a parameter name is specified and assertion fail, use the default message with the parameter name", function() {
                    expect(function() { gsoft.ensure(null, "parameterName").isDomElement(); }).toThrow(new gsoft.ArgumentError("parameterName must be a DOM element."));
                });

                it("When a context is specified and assertion fail, use the default message with the context", function() {
                    expect(function() { gsoft.ensure(null, "parameterName", "context").isDomElement(); }).toThrow(new gsoft.ArgumentError("context - parameterName must be a DOM element."));
                });

                it("When an assertion message is specified and assertion fail, use the specified assertion message", function() {
                    expect(function() { gsoft.ensure(null).isDomElement("assertionMessage"); }).toThrow(new gsoft.ArgumentError("assertionMessage"));
                });

                it("When is a DOM element, do not throw any exception", function() {
                    expect(function() { gsoft.ensure(document.createElement("div")).isDomElement(); }).not.toThrow();
                });
            });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline