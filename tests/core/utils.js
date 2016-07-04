(function(helpers, dataSampler, undefined) {
    "use strict";

    describe("utils", function() {
        describe("isDefined", function() {
            it("Return false when the value is undefined", function() {
                expect(gsoft.utils.isDefined(undefined)).toBeFalsy();
            });

            it("Return true when the value is an object", function() {
                expect(gsoft.utils.isDefined({})).toBeTruthy();
            });

            it("Return true when the value is something else that is defined", function() {
                expect(gsoft.utils.isDefined(true)).toBeTruthy();
                expect(gsoft.utils.isDefined(1)).toBeTruthy();
                expect(gsoft.utils.isDefined("")).toBeTruthy();
                expect(gsoft.utils.isDefined(helpers.noop)).toBeTruthy();
            });
        });
        
        describe("isUndefined", function() {
            it("Return true when the value is undefined", function() {
                expect(gsoft.utils.isUndefined(undefined)).toBeTruthy();
            });

            it("Return false when the value is an object", function() {
                expect(gsoft.utils.isUndefined({})).toBeFalsy();
            });

            it("Return false when the value is something else that is defined", function() {
                expect(gsoft.utils.isUndefined(true)).toBeFalsy();
                expect(gsoft.utils.isUndefined(1)).toBeFalsy();
                expect(gsoft.utils.isUndefined("")).toBeFalsy();
                expect(gsoft.utils.isUndefined(helpers.noop)).toBeFalsy();
            });
        });
        
        describe("isNotNull", function() {
            it("Return false when the value is undefined", function() {
                expect(gsoft.utils.isNotNull(undefined)).toBeFalsy();
            });

            it("Return false when the value is null", function() {
                expect(gsoft.utils.isNotNull(null)).toBeFalsy();
            });

            it("Return true when the value is an object", function() {
                expect(gsoft.utils.isNotNull({})).toBeTruthy();
            });

            it("Return true when the value is something that is defined and non null", function() {
                expect(gsoft.utils.isNotNull(true)).toBeTruthy();
                expect(gsoft.utils.isNotNull(1)).toBeTruthy();
                expect(gsoft.utils.isNotNull("")).toBeTruthy();
                expect(gsoft.utils.isNotNull(helpers.noop)).toBeTruthy();
            });
        });

        describe("isNull", function() {
            it("Return true when the value is undefined", function() {
                expect(gsoft.utils.isNull(undefined)).toBeTruthy();
            });

            it("Return true when the value is null", function() {
                expect(gsoft.utils.isNull(null)).toBeTruthy();
            });

            it("Return false when the value is an object", function() {
                expect(gsoft.utils.isNull({})).toBeFalsy();
            });

            it("Return false when the value is something that is defined and non null", function() {
                expect(gsoft.utils.isNull(true)).toBeFalsy();
                expect(gsoft.utils.isNull(1)).toBeFalsy();
                expect(gsoft.utils.isNull("")).toBeFalsy();
                expect(gsoft.utils.isNull(helpers.noop)).toBeFalsy();
            });
        });

        describe("isNullOrEmpty", function() {
            it("Return true when the value is undefined", function() {
                expect(gsoft.utils.isNullOrEmpty(undefined)).toBeTruthy();
            });

            it("Return true when the value is null", function() {
                expect(gsoft.utils.isNullOrEmpty(null)).toBeTruthy();
            });

            it("Return true when the value is an empty string", function() {
                expect(gsoft.utils.isNullOrEmpty("")).toBeTruthy();
            });

            it("Return false when the value is a non empty string", function() {
                expect(gsoft.utils.isNullOrEmpty(dataSampler.generateString(10))).toBeFalsy();
            });

            it("Return false when the value is an object", function() {
                expect(gsoft.utils.isNullOrEmpty({})).toBeFalsy();
            });

            it("Return false when the value is something that is defined and non null", function() {
                expect(gsoft.utils.isNullOrEmpty(true)).toBeFalsy();
                expect(gsoft.utils.isNullOrEmpty(1)).toBeFalsy();
                expect(gsoft.utils.isNullOrEmpty(helpers.noop)).toBeFalsy();
            });
        });

        describe("isString", function() {
            it("Return true when the value is a string", function() {
                expect(gsoft.utils.isString("")).toBeTruthy();
            });

            it("Return false when the value is not a string", function() {
                expect(gsoft.utils.isString({})).toBeFalsy();
                expect(gsoft.utils.isString([])).toBeFalsy();
                expect(gsoft.utils.isString(true)).toBeFalsy();
                expect(gsoft.utils.isString(1)).toBeFalsy();
                expect(gsoft.utils.isString(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isString(null)).toBeFalsy();
                expect(gsoft.utils.isString(undefined)).toBeFalsy();
            });
        });
        
        describe("isNumber", function() {
            it("Return true when the value is a number", function() {
                expect(gsoft.utils.isNumber(1)).toBeTruthy();
                
                /* jshint -W053 */
                expect(gsoft.utils.isNumber(new Number(1))).toBeTruthy();
                /* jshint +W053 */
            });

            it("Return false when the value is not a number", function() {
                expect(gsoft.utils.isNumber("")).toBeFalsy();
                expect(gsoft.utils.isNumber({})).toBeFalsy();
                expect(gsoft.utils.isNumber([])).toBeFalsy();
                expect(gsoft.utils.isNumber(true)).toBeFalsy();
                expect(gsoft.utils.isNumber(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isNumber(null)).toBeFalsy();
                expect(gsoft.utils.isNumber(undefined)).toBeFalsy();
            });
        });
        
        describe("isBoolean", function() {
            it("Return true when the value is a boolean", function() {
                expect(gsoft.utils.isBoolean(true)).toBeTruthy();
                expect(gsoft.utils.isBoolean(false)).toBeTruthy();
                
                /* jshint -W053 */
                expect(gsoft.utils.isBoolean(new Boolean(true))).toBeTruthy();
                /* jshint +W053 */
            });

            it("Return false when the value is not a boolean", function() {
                expect(gsoft.utils.isBoolean("")).toBeFalsy();
                expect(gsoft.utils.isBoolean({})).toBeFalsy();
                expect(gsoft.utils.isBoolean([])).toBeFalsy();
                expect(gsoft.utils.isBoolean(1)).toBeFalsy();
                expect(gsoft.utils.isBoolean(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isBoolean(null)).toBeFalsy();
                expect(gsoft.utils.isBoolean(undefined)).toBeFalsy();
            });
        });

        describe("isDate", function() {
            it("Return true when the value is a date", function() {
                expect(gsoft.utils.isDate(new Date())).toBeTruthy();
            });

            it("Return false when the value is not a date", function() {
                expect(gsoft.utils.isDate("")).toBeFalsy();
                expect(gsoft.utils.isDate({})).toBeFalsy();
                expect(gsoft.utils.isDate([])).toBeFalsy();
                expect(gsoft.utils.isDate(true)).toBeFalsy();
                expect(gsoft.utils.isDate(1)).toBeFalsy();
                expect(gsoft.utils.isDate(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isDate(null)).toBeFalsy();
                expect(gsoft.utils.isDate(undefined)).toBeFalsy();
            });
        });
        
        describe("isRegExp", function() {
            it("Return true when the value is a RegExp", function() {
                expect(gsoft.utils.isRegExp(/^foo(bar)?$/i)).toBeTruthy();
                expect(gsoft.utils.isRegExp(new RegExp(/^foo(bar)?$/i))).toBeTruthy();
            });

            it("Return false when the value is not a RegExp", function() {
                expect(gsoft.utils.isRegExp("")).toBeFalsy();
                expect(gsoft.utils.isRegExp({})).toBeFalsy();
                expect(gsoft.utils.isRegExp([])).toBeFalsy();
                expect(gsoft.utils.isRegExp(true)).toBeFalsy();
                expect(gsoft.utils.isRegExp(1)).toBeFalsy();
                expect(gsoft.utils.isRegExp(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isRegExp(null)).toBeFalsy();
                expect(gsoft.utils.isRegExp(undefined)).toBeFalsy();
            });
        });
        
        describe("isFunction", function() {
            it("Return true when the value is a function", function() {
                expect(helpers.isFunction(helpers.noop)).toBeTruthy();
            });
            
            it("Return false when the value is not a function", function() {
                expect(gsoft.utils.isDate("")).toBeFalsy();
                expect(gsoft.utils.isDate({})).toBeFalsy();
                expect(gsoft.utils.isDate(true)).toBeFalsy();
                expect(gsoft.utils.isDate(1)).toBeFalsy();
                expect(gsoft.utils.isDate(null)).toBeFalsy();
                expect(gsoft.utils.isDate(undefined)).toBeFalsy();
            });
        });
        
        describe("isArray", function() {
            it("Return true when the value is an array", function() {
                expect(gsoft.utils.isArray([])).toBeTruthy();
                expect(gsoft.utils.isArray([1])).toBeTruthy();
                
                /* jshint -W009 */
                expect(gsoft.utils.isArray(new Array())).toBeTruthy();
                /* jshint +W009 */
            });
            
            it("Return false when the value is not an array", function() {
                expect(gsoft.utils.isArray("")).toBeFalsy();
                expect(gsoft.utils.isArray({})).toBeFalsy();
                expect(gsoft.utils.isArray(true)).toBeFalsy();
                expect(gsoft.utils.isArray(1)).toBeFalsy();
                expect(gsoft.utils.isArray(null)).toBeFalsy();
                expect(gsoft.utils.isArray(undefined)).toBeFalsy();
            });
        });
        
        describe("isObject", function() {
            it("Return true when the value is an object literal", function() {
                expect(gsoft.utils.isObject({})).toBeTruthy();
            });

            it("Return true when the value is a prototype object", function() {
                var PrototypedObject = function() {
                };

                expect(gsoft.utils.isObject(new PrototypedObject())).toBeTruthy();
            });

            it("Return false when the value is not an object", function() {
                expect(gsoft.utils.isObject("")).toBeFalsy();
                expect(gsoft.utils.isObject(true)).toBeFalsy();
                expect(gsoft.utils.isObject(1)).toBeFalsy();
                expect(gsoft.utils.isObject(helpers.noop)).toBeFalsy();
                expect(gsoft.utils.isObject([])).toBeFalsy();
                expect(gsoft.utils.isObject(new Date())).toBeFalsy();
                expect(gsoft.utils.isObject(null)).toBeFalsy();
                expect(gsoft.utils.isObject(undefined)).toBeFalsy();
                
                /* jshint -W053 */
                expect(gsoft.utils.isObject(new Number(1))).toBeFalsy();
                /* jshint +W053 */
            });
        });
        
        if (helpers.isBrowser()) {
            describe("isDomElement", function() {
                it("When is a DOM element, returns true", function() {
                    var element = document.createElement("div");

                    expect(gsoft.utils.isDomElement(element)).toBeTruthy();
                });

                it("When is not a DOM element, return false", function() {
                    expect(gsoft.utils.isDomElement("")).toBeFalsy();
                    expect(gsoft.utils.isDomElement({})).toBeFalsy();
                    expect(gsoft.utils.isDomElement(true)).toBeFalsy();
                    expect(gsoft.utils.isDomElement(1)).toBeFalsy();
                    expect(gsoft.utils.isDomElement(helpers.noop)).toBeFalsy();
                    expect(gsoft.utils.isDomElement([])).toBeFalsy();
                    expect(gsoft.utils.isDomElement(null)).toBeFalsy();
                    expect(gsoft.utils.isDomElement(undefined)).toBeFalsy();
                });
            });
        }
        
        // ---------------------------------
        
        describe("arrayRemoveAt", function() {
            var array = [0, 1, 2, 3, 1, 5];

            it("Can remove the first value", function() {
                gsoft.utils.arrayRemoveAt(array, 0);

                expect(array.length).toBe(5);
                expect(array[0]).toBe(1);
            });

            it("Can remove the last value", function() {
                gsoft.utils.arrayRemoveAt(array, 4);

                expect(array.length).toBe(4);
                expect(array[3]).toBe(1);
            });

            it("Can remove a value at the middle", function() {
                gsoft.utils.arrayRemoveAt(array, 2);

                expect(array.length).toBe(3);
                expect(array[2]).toBe(1);
            });

            it("When the index is out of range, do nothing", function() {
                gsoft.utils.arrayRemoveAt(array, 999);

                expect(array.length).toBe(3);
            });

            it("Return the removed item", function() {
                expect(gsoft.utils.arrayRemoveAt(array, 2)).toBe(1);
            });
        });
        
        // ---------------------------------
        
        describe("objectForEach", function() {
            it("Action is called for every properties that is owned by the object", function() {
                var values = [];
                
                var obj = {
                    prop1: dataSampler.generateString(10),
                    prop2: dataSampler.generateString(10)
                };
                
                gsoft.utils.objectForEach(obj, function(value) {
                    values.push(value);
                });
                
                expect(values[0]).toBe(obj.prop1);
                expect(values[1]).toBe(obj.prop2);
            });
            
            it("Action is not called for properties that are not owned by the object", function() {
                var wasCalled = false;
                
                Object.yo = "";
                
                var obj = {};
                
                gsoft.utils.objectForEach(obj, function() {
                    wasCalled = true;
                });
                
                delete Object.yo;
                
                expect(wasCalled).toBeFalsy();
            });
            
            describe("The specified action is always called with", function() {
                it("The property value", function() {
                    var values = [];

                    var obj = {
                        prop1: dataSampler.generateString(10),
                        prop2: dataSampler.generateString(10)
                    };

                    gsoft.utils.objectForEach(obj, function(value) {
                        values.push(value);
                    });

                    expect(values[0]).toBe(obj.prop1);
                    expect(values[1]).toBe(obj.prop2);
                });
                
                it("The property key", function() {
                    var keys = [];

                    var obj = {
                        prop1: dataSampler.generateString(10),
                        prop2: dataSampler.generateString(10)
                    };

                    gsoft.utils.objectForEach(obj, function(value, propertyKey) {
                        keys.push(propertyKey);
                    });

                    expect(keys[0]).toBe("prop1");
                    expect(keys[1]).toBe("prop2");
                });
            });
            
            it("When a context is specified, the action is called with the context", function() {
                var context = { 
                    foo: 1 
                };
                
                var obj = {
                    prop1: dataSampler.generateString(10)
                };
                
                var providedContext = null;
                
                gsoft.utils.objectForEach(obj, function() {
                    providedContext = this;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        // ---------------------------------
        
        describe("clonePlainObject", function() {
            it("Primitive properties are cloned", function() {
                var original = {
                    str: "Original value",
                    integer: 1,
                    bool: true
                };

                var clone = gsoft.utils.clonePlainObject(original);

                clone.str = "Clone value";
                clone.integer = 2;
                clone.bool = false;

                expect(original.str).toBe("Original value");
                expect(original.integer).toBe(1);
                expect(original.bool).toBe(true);
            });
            
            it("Function properties are cloned", function() {
                var original = {
                    fct: function() {
                        return "Original value";
                    }
                };

                var clone = gsoft.utils.clonePlainObject(original);

                clone.fct = function() {
                    return "Clone value";
                };

                expect(original.fct()).toBe("Original value");
            });
            
            it("Date properties are cloned", function() {
                var original = {
                    date: new Date(2015, 1, 1)
                };
                
                var clone = gsoft.utils.clonePlainObject(original);
                
                clone.date = new Date(1999, 10, 10);
                
                expect(original.date.getFullYear()).toBe(2015);
                expect(original.date.getMonth()).toBe(1);
                expect(original.date.getDate()).toBe(1);
            });
            
            it("Array properties are cloned", function() {
                var original = {
                    array: ["Original value 1", "Original value 2"]
                };

                var clone = gsoft.utils.clonePlainObject(original);

                clone.array[0] = "Clone value 1";
                clone.array[1] = "Clone value 2";

                expect(original.array[0]).toBe("Original value 1");
                expect(original.array[1]).toBe("Original value 2");
            });

            it("Nested properties are cloned", function() {
                var original = {
                    nested1: {
                        nested2: {
                            str: "Original value"
                        }
                    }
                };

                var clone = gsoft.utils.clonePlainObject(original);
                clone.nested1.nested2.str = "Update value";

                expect(original.nested1.nested2.str).toBe("Original value");
            });
        });
        
        describe("cloneArray", function() {
            it("Current values are cloned", function() {
                var original = ["Original value 1", "Original value 2"];
                var clone = gsoft.utils.cloneArray(original);

                clone[0] = "Clone value 1";
                clone[1] = "Clone value 2";

                expect(original[0]).toBe("Original value 1");
                expect(original[1]).toBe("Original value 2");
            });

            it("Values added on clone are not added to the original array", function() {
                var original = ["Original value 1", "Original value 2"];
                var clone = gsoft.utils.cloneArray(original);

                clone.push("Clone value 1");

                expect(original.length).toBe(2);
            });

            it("Values removed from clone are not removed from the original array", function() {
                var original = ["Original value 1", "Original value 2"];
                var clone = gsoft.utils.cloneArray(original);

                clone.pop();

                expect(original.length).toBe(2);
            });
        });
        
        // ---------------------------------
        
        describe("trace", function() {
            var logCallCount = null;
            var logCallArguments = null;

            var originalLog = null;
            var originalDebug = null;
            
            beforeEach(function() {
                logCallCount = 0;
                logCallArguments = null;

                originalLog = console.log;
                originalDebug = gsoft.debug;

                console.log = function() {
                    logCallCount += 1;
                    logCallArguments = arguments;
                };
            });
            
            afterEach(function() {
                console.log = originalLog;
                gsoft.debug = originalDebug;
            });

            describe("When the library is in debug mode", function() {
                beforeEach(function() {
                    gsoft.debug = true;
                });

                it("Log to the console", function() {
                    gsoft.utils.trace("");
                
                    expect(logCallCount).toBe(1);
                });

                it("When multiple values are provided, pass them to the console", function() {
                    gsoft.utils.trace("", "", "");
                
                    expect(logCallArguments.length).toBe(3);
                });
            });
            
            it("When the library is not in debug mode, do not log to the console", function() {
                gsoft.debug = false;
                gsoft.utils.trace("");
                
                expect(logCallCount).toBe(0);
            });
        });

        describe("groupTrace", function() {
            var groupCollapsedCount = null;
            var groupCollapsedArguments = null;

            var groupEndCount = null;

            var logCallCount = null;
            var logCallArguments = null;

            var originalGroupCollapsed = null;
            var originalGroupEnd = null;
            var originalLog = null;

            var originalDebug = null;

            beforeEach(function() {
                groupCollapsedCount = 0;
                groupEndCount = 0;
                logCallCount = 0;
                logCallArguments = null;

                originalGroupCollapsed = console.groupCollapsed;
                originalGroupEnd = console.groupEnd;
                originalLog = console.log;
                
                originalDebug = gsoft.debug;

                console.groupCollapsed = function() {
                    groupCollapsedCount += 1;
                    groupCollapsedArguments = arguments;
                };

                console.groupEnd = function() {
                    groupEndCount += 1;
                };

                console.log = function() {
                    logCallCount += 1;
                    logCallArguments = arguments;
                };
            });
            
            afterEach(function() {
                console.groupCollapsed = originalGroupCollapsed;
                console.groupEnd = originalGroupEnd;
                console.log = originalLog;

                gsoft.debug = originalDebug;
            });

            describe("When the library is in debug mode", function() {
                beforeEach(function() {
                    gsoft.debug = true;
                });

                it("When values parameter is null, do nothing", function() {
                    gsoft.utils.groupTrace(null);
                
                    expect(groupCollapsedCount).toBe(0);
                    expect(groupEndCount).toBe(0);
                    expect(logCallCount).toBe(0);
                });

                it("When 0 value are provided, do nothing", function() {
                    gsoft.utils.groupTrace([]);
                
                    expect(groupCollapsedCount).toBe(0);
                    expect(groupEndCount).toBe(0);
                    expect(logCallCount).toBe(0);
                });

                describe("When 1 value is provided", function() {
                    it("console.groupCollapsed is called", function() {
                        gsoft.utils.groupTrace([[""]]);
                
                        expect(groupCollapsedCount).toBe(1);
                    });

                    it("console.groupEnd is called", function() {
                        gsoft.utils.groupTrace([[""]]);
                
                        expect(groupEndCount).toBe(1);
                    });
                });

                describe("When multiple values are provided", function() {
                    it("console.groupCollapsed is called", function() {
                        gsoft.utils.groupTrace([[""], [""], [""]]);
                
                        expect(groupCollapsedCount).toBe(1);
                    });

                    it("console.log is called", function() {
                        gsoft.utils.groupTrace([[""], [""], [""]]);
                
                        expect(logCallCount).toBe(2);
                    });

                    it("console.groupEnd is called", function() {
                        gsoft.utils.groupTrace([[""], [""], [""]]);
                
                        expect(groupEndCount).toBe(1);
                    });
                });

                it("When multiple values are provided for the first log, pass them to console.groupCollapsed", function() {
                    gsoft.utils.groupTrace([["", "", ""], [""], [""]]);
                
                    expect(groupCollapsedArguments.length).toBe(3);
                });

                it("When multiple values are provided for a subsequent log, pass them to console.log", function() {
                    gsoft.utils.groupTrace([[""], ["", "", ""]]);
                
                    expect(logCallArguments.length).toBe(3);
                });
            });

            it("When the library is not in debug mode, do not log to the console", function() {
                gsoft.debug = false;
                gsoft.utils.groupTrace([[""]]);
                
                expect(groupCollapsedCount).toBe(0);
                expect(groupEndCount).toBe(0);
                expect(logCallCount).toBe(0);
            });
        });
        
        // ---------------------------------
        
        describe("Aliases exists", function() {
            it("isDefined", function()  {
                expect(gsoft.isDefined).toBeDefined();
            });
            
            it("isUndefined", function()  {
                expect(gsoft.isUndefined).toBeDefined();
            });
            
            it("isNotNull", function()  {
                expect(gsoft.isNotNull).toBeDefined();
            });
            
            it("isNull", function()  {
                expect(gsoft.isNull).toBeDefined();
            });
            
            it("isNullOrEmpty", function()  {
                expect(gsoft.isNullOrEmpty).toBeDefined();
            });
        });
    });
})(test.helpers,
   test.dataSampler);