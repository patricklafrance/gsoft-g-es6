// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler) {
    "use strict";

    describe("spa.services.objectNavigator", function() {
        var objectNavigator = null;

		beforeEach(function() {
            objectNavigator = gsoft.spa.services.objectNavigator();
        });

        describe("traverse", function() {
            it("When the object parameter is null, throw an exception", function() {
			    expect(function() { objectNavigator.traverse(null, {}, {}); }).toThrow();
		    });

		    it("When the options parameter is null, continue", function() {
			    expect(function() { objectNavigator.traverse({}, null, {}); }).not.toThrow();
		    });

            it("When the context parameter is null, continue", function() {
			    expect(function() { objectNavigator.traverse({}, {}, null); }).not.toThrow();
		    });

		    describe("Path", function() {
			    var obj = null;

			    beforeEach(function() {
				    obj = {
					    observableArrayProp: ko.observableArray([
						    dataSampler.generateString(5), 
						    dataSampler.generateString(5), 
						    {
							    innerArrayProp: [dataSampler.generateString(5)]
						    }
					    ]),
					    objProp: {
						    prop1: dataSampler.generateString(5),
						    observableProp: ko.observable(dataSampler.generateString(5))
					    },
					    fctProp: helpers.noop,
					    intProp: dataSampler.generateInteger(5),
					    strProp: dataSampler.generateString(5)
				    };
			    });

			    it("Always starts with {root}", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onPrimitive: function(args) {
						    if (args.path.indexOf("{root}") === 0) {
							    count += 1;
						    }
					    }
				    });

				    expect(count > 0).toBeTruthy();
			    });

			    it("Nested object are separated by '.'", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onPrimitive: function(args) {
						    if (args.path === "{root}.objProp.prop1") {
							    count += 1;
						    }
					    }
				    });

				    expect(count).toBe(1);
			    });

		        it("Array are represented by [i]", function() {
		            var count = 0;

		            objectNavigator.traverse(obj, {
		                onPrimitive: function(args) {
		                    if (args.path === "{root}.observableArrayProp[i]") {
		                        count += 1;
		                    } else if (args.path === "{root}.observableArrayProp[i].innerArrayProp") {
		                        count += 1;
		                    }
		                }
		            });

		            expect(count).toBe(2);
		        });
		    });

		    describe("Handlers", function() {
			    var obj = null;

			    beforeEach(function() {
				    obj = {
					    observableArrayProp: ko.observableArray([
						    dataSampler.generateString(5), 
						    dataSampler.generateString(5), 
						    {
							    innerArrayProp: [dataSampler.generateString(5)]
						    }
					    ]),
					    objProp: {
						    prop1: dataSampler.generateString(5),
						    observableProp: ko.observable(dataSampler.generateString(5))
					    },
					    fctProp: helpers.noop,
					    intProp: dataSampler.generateInteger(5),
					    strProp: dataSampler.generateString(5)
				    };
			    });

			    it("When provided, the array handler is always called when a property having a value of the array type is parsed", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onArray: function() {
						    count += 1;
					    }
				    });

				    expect(count).toBe(2);
			    });

			    it("When provided, the object handler is always called when a property having a value of the object type is parsed", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onObject: function() {
						    count += 1;
					    }
				    });

				    // Result is 3 because the original object count for one.
				    expect(count).toBe(3);
			    });

			    it("When provided, the function handler is always called when a property having a value of the function type is parsed", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onFunction: function() {
						    count += 1;
					    }
				    });

				    // Result is 2 because of the observable property.
				    expect(count).toBe(2);
			    });

			    it("When provided, the primitive handler is always called when a property having any other types is parsed", function() {
				    var count = 0;

				    objectNavigator.traverse(obj, {
					    onPrimitive: function() {
						    count += 1;
					    }
				    });

				    expect(count).toBe(6);
			    });

			    describe("Arguments passed to an handler always contains", function() {
				    it("The property key", function() {
					    var works = false;

					    objectNavigator.traverse(obj, {
						    onArray: function(args) {
							    if (args.key === "observableArrayProp") {
								    works = true;
							    }
						    }
					    });

					    expect(works).toBeTruthy();
				    });

				    it("The property value", function() {
					    var works = false;

					    objectNavigator.traverse(obj, {
						    onArray: function(args) {
							    if (args.key === "observableArrayProp" && helpers.areEquals(obj.observableArrayProp, args.value)) {
								    works = true;
							    }
						    }
					    });

					    expect(works).toBeTruthy();
				    });

				    it("The property path", function() {
					    var works = false;

					    objectNavigator.traverse(obj, {
						    onArray: function(args) {
							    if (args.key === "observableArrayProp" && args.path === "{root}.observableArrayProp") {
								    works = true;
							    }
						    }
					    });

					    expect(works).toBeTruthy();				
				    });

				    it("The parent of the property", function() {
					    var works = false;

					    objectNavigator.traverse(obj, {
						    onArray: function(args) {
							    if (args.key === "observableArrayProp" && helpers.areEquals(obj, args.parent)) {
								    works = true;
							    }
						    }
					    });

					    expect(works).toBeTruthy();						
				    });

				    it("The original object being parsed", function() {
					    var works = false;

					    objectNavigator.traverse(obj, {
						    onArray: function(args) {
							    if (args.key === "observableArrayProp" && helpers.areEquals(obj, args.obj)) {
								    works = true;
							    }
						    }
					    });

					    expect(works).toBeTruthy();	
				    });
			    });

			    it("When provided, the context object is always set as the context of the function when calling an handler", function() {
				    var works = false;

				    var context = {
					    prop: dataSampler.generateString(5)
				    };

			        var options = {
			            onArray: function(args) {
			                if (args.key === "observableArrayProp" && helpers.areEquals(context, this)) {
			                    works = true;
			                }
			            }
			        };

				    objectNavigator.traverse(obj, options, context);

				    expect(works).toBeTruthy();	
			    });
		    });

            describe("Filters", function() {
                var obj = null;

			    beforeEach(function() {
				    obj = {
					    observableArrayProp: ko.observableArray([
						    dataSampler.generateString(5), 
						    dataSampler.generateString(5), 
						    {
							    innerArrayProp: [dataSampler.generateString(5)]
						    }
					    ]),
					    objProp: {
						    prop1: dataSampler.generateString(5),
						    observableProp: ko.observable(dataSampler.generateString(5))
					    },
					    fctProp: helpers.noop,
					    intProp: dataSampler.generateInteger(5),
					    strProp: dataSampler.generateString(5)
				    };
			    });

                it("When provided, the properties of the object that are not matching the filter are ignored", function() {
				    var works = true;

				    objectNavigator.traverse(obj, {
					    onArray: function() {
						    works = false;
					    },
					    filter: function(property) {
		                    var value = ko.utils.peekObservable(property.value);
		            
		                    return !helpers.isArray(value);
					    }
				    });

				    expect(works).toBeTruthy();	
			    });
            });

		    it("Never modifiy original object", function() {
			    var obj = {};

			    objectNavigator.traverse(obj);

			    expect(helpers.keys(obj).length).toBe(0);
		    });

		    it("Never modify original options object.", function() {
			    var options = {};

			    objectNavigator.traverse({}, options);

			    expect(helpers.keys(options).length).toBe(0);
		    });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline