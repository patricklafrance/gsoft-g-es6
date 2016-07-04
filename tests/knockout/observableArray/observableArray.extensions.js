// jscs:disable requireBlocksOnNewline

(function(helpers) {
    "use strict";
    
    describe("observableArray", function() {
        describe("count", function() {
            it("Returns the length of the underlying array", function() {
                expect(ko.observableArray([1, 3, 6]).count()).toBe(3);
            });
            
            it("Still works after pushing a new element", function() {
                var array = ko.observableArray([1, 3, 6]);
                array.push(4);
                
                expect(array.count()).toBe(4);
            });
        });
        
        describe("isEmpty", function() {
            it("If the array is empty, returns true", function() {
                expect(ko.observableArray([]).isEmpty()).toBeTruthy();
            });
            
            it("If the array is not empty, returns false", function() {
                expect(ko.observableArray([1, 3, 6]).isEmpty()).toBeFalsy();
            });
        });
        
        describe("itemAt", function() {
            it("Returns the items at the specified index", function() {
                expect(ko.observableArray([1, 3, 6]).itemAt(1)).toBe(3);
            });
        });
        
        describe("first", function() {
            describe("When first is called without a predicate", function() {
                it("Returns the first element of the array", function() {
                    expect(ko.observableArray([1, 3, 6]).first()).toBe(1);
                });
                
                it("When the array is empty, returns null", function() {
                    expect(ko.observableArray([]).first()).toBeNull();
                });
            });
            
            describe("When first is called with a predicate", function() {
                it("When no items match the predicate, returns null", function() {
                    var result = ko.observableArray([1, 3, 6]).first(function() {
                        return false;
                    });
                    
                    expect(result).toBeNull();
                });
                
                it("When a match is found, return that item", function() {
                    var result = ko.observableArray([1, 3, 6]).first(function(item) {
                        return item === 3;
                    });
                    
                    expect(result).toBe(3);
                });
                
                it("When a match is found, do not call the predicate for the other items", function() {
                    var callCount = 0;
                    
                    ko.observableArray([1, 3, 6]).first(function(item) {
                        callCount += 1;
                        
                        return item === 3;
                    });
                    
                    expect(callCount).toBe(2);
                });
                
                describe("The specified predicate is always called with", function() {
                    it("The value index", function() {
                        var indexes = [];

                        ko.observableArray([1, 3, 6]).first(function(value, index) {
                            indexes.push(index);

                            return false;
                        });

                        expect(indexes[0]).toBe(0);
                        expect(indexes[1]).toBe(1);                
                        expect(indexes[2]).toBe(2);
                    });

                    it("The value", function() {
                        var values = [];

                        ko.observableArray([1, 3, 6]).first(function(value) {
                            values.push(value);

                            return false;
                        });

                        expect(values[0]).toBe(1);
                        expect(values[1]).toBe(3);                
                        expect(values[2]).toBe(6);
                    });

                    it("The array", function() {
                        var array = null;

                        ko.observableArray([1]).first(function(value, index, instance) {
                            array = instance;

                            return false;
                        });

                        expect(array).toEqual([1]);
                    });
                });
                
                it("When a context is specified, the predicate is called with the context", function() {
                    var context = { foo: 1 };
                    var providedContext = null;

                    ko.observableArray([1]).first(function() {
                        providedContext = this;

                        return true;
                    }, context);

                    expect(providedContext).toEqual(context);
                });
            });
        });
        
        describe("forEach", function() {
            it("The specified callback is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).forEach(function(value) {
                    values.push(value);
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            describe("The specified callback is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).forEach(function(value, index) {
                        indexes.push(index);
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    ko.observableArray([1, 3, 6]).forEach(function(value) {
                        values.push(value);
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1]).forEach(function(value, index, instance) {
                        array = instance;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the callback is called with the context", function() {
                var context = { 
                    foo: 1 
                };
                
                var providedContext = null;
                
                ko.observableArray([1]).forEach(function() {
                    providedContext = this;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("map", function() {
            it("Mapper is called for every values of the array", function() {
                var mappedArray = ko.observableArray([1, 3, 6]).map(function(value) {
                    return value * 2;
                });
                
                expect(mappedArray.length).toBe(3);
                expect(mappedArray[0]).toBe(2);
                expect(mappedArray[1]).toBe(6);                
                expect(mappedArray[2]).toBe(12);
            });
            
            describe("The specified mapper is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).map(function(value, index) {
                        indexes.push(index);
                        
                        return value;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    ko.observableArray([1, 3, 6]).map(function(value) {
                        values.push(value);
                        
                        return value;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1]).map(function(value, index, instance) {
                        array = instance;
                        
                        return value;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the mapper is called with the context", function() {
                var context = { 
                    foo: 1 
                };
                
                var providedContext = null;
                
                ko.observableArray([1]).map(function(value) {
                    providedContext = this;
                    
                    return value;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("filter", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).filter(function(value) {
                    values.push(value);
                    
                    return true;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("The values that do not satisfy the predicate are not included in the resulting array", function() {
                var filteredArray = ko.observableArray([1, 3, 6]).filter(function(value) {
                    return value !== 3;
                });
                
                expect(filteredArray.length).toBe(2);
                expect(filteredArray[0]).toBe(1);
                expect(filteredArray[1]).toBe(6);                
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).filter(function(value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    ko.observableArray([1, 3, 6]).filter(function(value) {
                        values.push(value);
                        
                        return true;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1]).filter(function(value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the predicate is called with the context", function() {
                var context = { foo: 1 };
                var providedContext = null;
                
                ko.observableArray([1]).filter(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("every", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).every(function(value) {
                    values.push(value);
                    
                    return true;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("When the predicate returns true for every value, returns true", function() {
                expect(ko.observableArray([1, 3, 6]).every(function() { return true; })).toBeTruthy();
            });
            
            it("When the predicate returns false for a value, returns false", function() {
                expect(ko.observableArray([1, 3, 6]).every(function() { return false; })).toBeFalsy();
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).every(function(value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    ko.observableArray([1, 3, 6]).every(function(value) {
                        values.push(value);
                        
                        return true;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1]).every(function(value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the predicate is called with the context", function() {
                var context = { 
                    foo: 1 
                };
                
                var providedContext = null;
                
                ko.observableArray([1]).every(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("some", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).some(function(value) {
                    values.push(value);
                    
                    return false;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("When the predicate returns false for every value, returns false", function() {
                expect(ko.observableArray([1, 3, 6]).some(function() { return false; })).toBeFalsy();
            });
            
            it("When the predicate returns true for a value, returns true", function() {
                expect(ko.observableArray([1, 3, 6]).some(function(value) { 
                    return value === 3;
                })).toBeTruthy();
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).some(function(value, index) {
                        indexes.push(index);
                        
                        return false;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    ko.observableArray([1, 3, 6]).some(function(value) {
                        values.push(value);
                        
                        return false;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1]).some(function(value, index, instance) {
                        array = instance;
                        
                        return false;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the predicate is called with the context", function() {
                var context = { 
                    foo: 1 
                };
                
                var providedContext = null;
                
                ko.observableArray([1]).some(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("reduce", function() {
            it("The specified action is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).reduce(function(accumulator, value) {
                    values.push(value);
                    
                    return value;
                });
                
                expect(values.length).toBe(2);
                expect(values[0]).toBe(3);
                expect(values[1]).toBe(6);              
            });
            
            describe("When no initial value is specified", function() {
                it("The result is the reduction of the array", function() {
                    var result = ko.observableArray([1, 3, 6]).reduce(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(10);
                });
                
                it("When the array has one item, return that item", function() {
                    var result = ko.observableArray([1]).reduce(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(1);
                });
                
                it("When the array is empty, throw an exception", function() {
                    expect(function() { [].reduce(helpers.noop); }).toThrow();
                });
            });
            
            describe("When an initial value is specified", function() {
                it("The value is included in the reduction", function() {
                    var result = ko.observableArray([1, 3, 6]).reduce(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(20);
                });
                
                it("When the array is empty, return the initial value", function() {
                    var result = ko.observableArray([]).reduce(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(10);
                });
            });
            
            describe("The specified action is always called with", function() {
                it("The accumulator", function() {
                    var accumulators = [];

                    ko.observableArray([1, 3, 6]).reduce(function(accumulator, value) {
                        accumulators.push(accumulator);

                        return accumulator + value;
                    });

                    expect(accumulators[0]).toBe(1);                
                    expect(accumulators[1]).toBe(4);
                });
                
                it("The value", function() {
                    var values = [];

                    ko.observableArray([1, 3, 6]).reduce(function(accumulator, value) {
                        values.push(value);

                        return value;
                    });

                    expect(values[0]).toBe(3);                
                    expect(values[1]).toBe(6);
                });
                
                it("The index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).reduce(function(accumulator, value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(1);
                    expect(indexes[1]).toBe(2);                
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1, 3]).reduce(function(accumulator, value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1, 3]);
                });
            });
        });
        
        describe("reduceRight", function() {
            it("The specified action is called for every values of the array", function() {
                var values = [];
                
                ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value) {
                    values.push(value);
                    
                    return value;
                });
                
                expect(values.length).toBe(2);
                expect(values[0]).toBe(3);
                expect(values[1]).toBe(1);                
            });
            
            describe("When no initial value is specified", function() {
                it("The result is the reduction of the array", function() {
                    var result = ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(10);
                });
                
                it("When the array has one item, return that item", function() {
                    var result = ko.observableArray([1]).reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(1);
                });
                
                it("When the array is empty, throw an exception", function() {
                    expect(function() { ko.observableArray([]).reduceRight(helpers.noop); }).toThrow();
                });
            });
            
            describe("When an initial value is specified", function() {
                it("The value is included in the reduction", function() {
                    var result = ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(20);
                });
                
                it("When the array is empty, return the initial value", function() {
                    var result = ko.observableArray([]).reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(10);
                });
            });
            
            describe("The specified action is always called with", function() {
                it("The accumulator", function() {
                    var accumulators = [];

                    ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value) {
                        accumulators.push(accumulator);

                        return accumulator + value;
                    });

                    expect(accumulators[0]).toBe(6);                
                    expect(accumulators[1]).toBe(9);
                });
                
                it("The value", function() {
                    var values = [];

                    ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value) {
                        values.push(value);

                        return value;
                    });

                    expect(values[0]).toBe(3);                
                    expect(values[1]).toBe(1);
                });
                
                it("The index", function() {
                    var indexes = [];
                    
                    ko.observableArray([1, 3, 6]).reduceRight(function(accumulator, value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(1);
                    expect(indexes[1]).toBe(0);                
                });
                
                it("The array", function() {
                    var array = null;
                    
                    ko.observableArray([1, 3]).reduceRight(function(accumulator, value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1, 3]);
                });
            });
        });
        
        describe("concat", function() {
            it("Can concat 2 arrays together", function() {
                var array1 = ko.observableArray([1, 3, 6]);
                var array2 = [6, 9];
                
                expect(array1.concat(array2)).toEqual([1, 3, 6, 6, 9]);
            });
            
            it("Can concat 3 arrays together", function() {
                var array1 = ko.observableArray([1, 3, 6]);
                var array2 = [6, 9];
                var array3 = [2];
                
                expect(array1.concat(array2, array3)).toEqual([1, 3, 6, 6, 9, 2]);
            });
            
            it("Can concat 2 observable arrays together", function() {
                var array1 = ko.observableArray([1, 3, 6]);
                var array2 = ko.observableArray([6, 9]);
                
                expect(array1.concat(array2)).toEqual([1, 3, 6, 6, 9]);
            });
            
            it("Can concat 3 observable arrays together", function() {
                var array1 = ko.observableArray([1, 3, 6]);
                var array2 = ko.observableArray([6, 9]);
                var array3 = ko.observableArray([2]);
                
                expect(array1.concat(array2, array3)).toEqual([1, 3, 6, 6, 9, 2]);
            });
        });
        
        describe("difference", function() {
            describe("When a predicate is specified", function() {
                it("When both arrays are the same, returns an empty array", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 3, 6];

                    var result = array1.difference(array2, function(item1, item2) {
                        return item1 === item2;
                    });

                    expect(result).toEqual([]);
                });
                
                it("When all the source array items are in the other array, returns an empty array", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 3, 6, 2, 10];

                    var result = array1.difference(array2, function(item1, item2) {
                        return item1 === item2;
                    });

                    expect(result).toEqual([]);
                });
                
                it("When items from the source array are not in the other array, returns an array with those items", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 6, 9];

                    var result = array1.difference(array2, function(item1, item2) {
                        return item1 === item2;
                    });

                    expect(result).toEqual([3]);
                });
                
                describe("The specified predicate is always called with", function() {
                    it("The values being compared", function() {
                        var values = [];
                        
                        var array1 = ko.observableArray([1, 3]);
                        var array2 = [1, 3];

                        array1.difference(array2, function(item1, item2) {
                            values.push({
                                item1: item1,
                                item2: item2
                            });
                            
                            return false;
                        });
                        
                        expect(values.length).toBe(4);
                        expect(values[0].item1).toBe(1);
                        expect(values[0].item2).toBe(1);
                        expect(values[1].item1).toBe(1);
                        expect(values[1].item2).toBe(3);
                        expect(values[2].item1).toBe(3);
                        expect(values[2].item2).toBe(1);
                        expect(values[3].item1).toBe(3);
                        expect(values[3].item2).toBe(3);
                    });

                    it("The arrays being compared", function() {
                        var arrays = [];
                        
                        var array1 = ko.observableArray([1, 3]);
                        var array2 = [1, 3];

                        array1.difference(array2, function(item1, item2, array1, array2) {
                            arrays.push({
                                array1: array1,
                                array2: array2
                            });
                            
                            return false;
                        });
                        
                        expect(arrays.length).toBe(4);
                        expect(arrays[0].array1).toEqual(array1.peek());
                        expect(arrays[1].array2).toEqual(array2);
                    });
                });
                
                it("When a context is specified, the predicate is called with the context", function() {
                    var context = { 
                        foo: 1 
                    };

                    var providedContext = null;

                    ko.observableArray([1]).difference([1], function() {
                        providedContext = this;

                        return true;
                    }, context);

                    expect(providedContext).toEqual(context);
                });
            });
            
            describe("When a predicate is not specified", function() {
                it("When both arrays are the same, returns an empty array", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 3, 6];

                    var result = array1.difference(array2);

                    expect(result).toEqual([]);
                });
                
                it("When all the source array items are in the other array, returns an empty array", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 3, 6, 2, 10];

                    var result = array1.difference(array2);

                    expect(result).toEqual([]);
                });
                
                it("When items from the source array are not in the other array, returns an array with those items", function() {
                    var array1 = ko.observableArray([1, 3, 6]);
                    var array2 = [1, 6, 9];

                    var result = array1.difference(array2);

                    expect(result).toEqual([3]);
                });
            });
                
            it("When the other array is an observable array, it works", function() {
                var array1 = ko.observableArray([1, 3, 6]);
                var array2 = ko.observableArray([1, 3, 6]);

                var result = array1.difference(array2);

                expect(result).toEqual([]);
            });
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline