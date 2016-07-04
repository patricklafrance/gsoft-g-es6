// jscs:disable requireBlocksOnNewline

(function(helpers) { 
    "use strict";
    
    describe("Array", function() {
        describe("isArray", function() {
            it("Return true when the value is an array", function() {
                expect(Array.isArray([])).toBeTruthy();
                expect(Array.isArray([1])).toBeTruthy();
                
                /* jshint -W009 */
                expect(Array.isArray(new Array())).toBeTruthy();
                /* jshint +W009 */
            });
            
            it("Return false when the value is not an array", function() {
                expect(Array.isArray("")).toBeFalsy();
                expect(Array.isArray({})).toBeFalsy();
                expect(Array.isArray(true)).toBeFalsy();
                expect(Array.isArray(1)).toBeFalsy();
                expect(Array.isArray(null)).toBeFalsy();
                expect(Array.isArray(undefined)).toBeFalsy();
            });
        });
        
        describe("forEach", function() {
            it("The specified callback is called for every values of the array", function() {
                var values = [];
                
                [1, 3, 6].forEach(function(value) {
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
                    
                    [1, 3, 6].forEach(function(value, index) {
                        indexes.push(index);
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    [1, 3, 6].forEach(function(value) {
                        values.push(value);
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1].forEach(function(value, index, instance) {
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
                
                [1].forEach(function() {
                    providedContext = this;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("map", function() {
            it("Mapper is called for every values of the array", function() {
                var mappedArray = [1, 3, 6].map(function(value) {
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
                    
                    [1, 3, 6].map(function(value, index) {
                        indexes.push(index);
                        
                        return value;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    [1, 3, 6].map(function(value) {
                        values.push(value);
                        
                        return value;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1].map(function(value, index, instance) {
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
                
                [1].map(function(value) {
                    providedContext = this;
                    
                    return value;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("filter", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                [1, 3, 6].filter(function(value) {
                    values.push(value);
                    
                    return true;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("The values that do not satisfy the predicate are not included in the resulting array", function() {
                var filteredArray = [1, 3, 6].filter(function(value) {
                    return value !== 3;
                });
                
                expect(filteredArray.length).toBe(2);
                expect(filteredArray[0]).toBe(1);
                expect(filteredArray[1]).toBe(6);                
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    [1, 3, 6].filter(function(value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    [1, 3, 6].filter(function(value) {
                        values.push(value);
                        
                        return true;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1].filter(function(value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1]);
                });
            });
            
            it("When a context is specified, the predicate is called with the context", function() {
                var context = { foo: 1 };
                var providedContext = null;
                
                [1].filter(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("every", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                [1, 3, 6].every(function(value) {
                    values.push(value);
                    
                    return true;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("When the predicate returns true for every value, returns true", function() {
                expect([1, 3, 6].every(function() { 
                    return true; 
                })).toBeTruthy();
            });
            
            it("When the predicate returns false for a value, returns false", function() {
                expect([1, 3, 6].every(function() { 
                    return false; 
                })).toBeFalsy();
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    [1, 3, 6].every(function(value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    [1, 3, 6].every(function(value) {
                        values.push(value);
                        
                        return true;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1].every(function(value, index, instance) {
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
                
                [1].every(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("some", function() {
            it("The specified predicate is called for every values of the array", function() {
                var values = [];
                
                [1, 3, 6].some(function(value) {
                    values.push(value);
                    
                    return false;
                });
                
                expect(values.length).toBe(3);
                expect(values[0]).toBe(1);
                expect(values[1]).toBe(3);                
                expect(values[2]).toBe(6);
            });
            
            it("When the predicate returns false for every value, returns false", function() {
                expect([1, 3, 6].some(function() { return false; })).toBeFalsy();
            });
            
            it("When the predicate returns true for a value, returns true", function() {
                expect([1, 3, 6].some(function(value) { 
                    return value === 3;
                })).toBeTruthy();
            });
            
            describe("The specified predicate is always called with", function() {
                it("The value index", function() {
                    var indexes = [];
                    
                    [1, 3, 6].some(function(value, index) {
                        indexes.push(index);
                        
                        return false;
                    });
                    
                    expect(indexes[0]).toBe(0);
                    expect(indexes[1]).toBe(1);                
                    expect(indexes[2]).toBe(2);
                });
                
                it("The value", function() {
                    var values = [];
                
                    [1, 3, 6].some(function(value) {
                        values.push(value);
                        
                        return false;
                    });

                    expect(values[0]).toBe(1);
                    expect(values[1]).toBe(3);                
                    expect(values[2]).toBe(6);
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1].some(function(value, index, instance) {
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
                
                [1].some(function() {
                    providedContext = this;
                    
                    return true;
                }, context);
                
                expect(providedContext).toEqual(context);
            });
        });
        
        describe("indexOf", function() {
            it("When the array is empty, return -1", function() {
                var index = [].indexOf(1);
                
                expect(index).toBe(-1);
            });
            
            it("When the value is in the array, return the index of the value", function() {
                var index = [1, 3, 6].indexOf(3);
                
                expect(index).toBe(1);
            });
            
            it("When the value is the first item of the array, return 0", function() {
                var index = [1, 3, 6].indexOf(1);
                
                expect(index).toBe(0);
            });
            
            it("When the value is the last item of the array, return the length of the index - 1", function() {
                var index = [1, 3, 6].indexOf(6);
                
                expect(index).toBe(2);
            });
            
            it("When the value is not in the array, return -1", function() {
                var index = [1, 3, 6].indexOf(2);
                
                expect(index).toBe(-1);
            });
            
            it("When the value has multiple occurence in the array, return the index of the first occurence", function() {
                var index = [1, 3, 6, 3].indexOf(3);
                
                expect(index).toBe(1);
            });
            
            describe("When fromIndex is specified", function() {
                it("When fromIndex is greater than the array length, return -1", function() {
                    var index = [1, 3, 6].indexOf(1, 10);
                
                    expect(index).toBe(-1);
                });
                
                it("When fromIndex is lower than the value index, return the index of the value", function() {
                    var index = [1, 3, 6].indexOf(6, 1);
                
                    expect(index).toBe(2);
                });
                
                it("When fromIndex is equal to the value index, return the index of the value", function() {
                    var index = [1, 3, 6].indexOf(3, 1);
                
                    expect(index).toBe(1);
                });
                
                it("When fromIndex is greater than the value index, return -1", function() {
                    var index = [1, 3, 6].indexOf(3, 2);
                
                    expect(index).toBe(-1);
                });
            });
        });
        
        describe("reduce", function() {
            it("The specified action is called for every values of the array", function() {
                var values = [];
                
                [1, 3, 6].reduce(function(accumulator, value) {
                    values.push(value);
                    
                    return value;
                });
                
                expect(values.length).toBe(2);
                expect(values[0]).toBe(3);
                expect(values[1]).toBe(6);                
            });
            
            describe("When no initial value is specified", function() {
                it("The result is the reduction of the array", function() {
                    var result = [1, 3, 6].reduce(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(10);
                });
                
                it("When the array has one item, return that item", function() {
                    var result = [1].reduce(function(accumulator, value) {
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
                    var result = [1, 3, 6].reduce(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(20);
                });
                
                it("When the array is empty, return the initial value", function() {
                    var result = [].reduce(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(10);
                });
            });
            
            describe("The specified action is always called with", function() {
                it("The accumulator", function() {
                    var accumulators = [];

                    [1, 3, 6].reduce(function(accumulator, value) {
                        accumulators.push(accumulator);

                        return accumulator + value;
                    });

                    expect(accumulators[0]).toBe(1);                
                    expect(accumulators[1]).toBe(4);
                });
                
                it("The value", function() {
                    var values = [];

                    [1, 3, 6].reduce(function(accumulator, value) {
                        values.push(value);

                        return value;
                    });

                    expect(values[0]).toBe(3);                
                    expect(values[1]).toBe(6);
                });
                
                it("The index", function() {
                    var indexes = [];
                    
                    [1, 3, 6].reduce(function(accumulator, value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(1);
                    expect(indexes[1]).toBe(2);                
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1, 3].reduce(function(accumulator, value, index, instance) {
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
                
                [1, 3, 6].reduceRight(function(accumulator, value) {
                    values.push(value);
                    
                    return value;
                });
                
                expect(values.length).toBe(2);
                expect(values[0]).toBe(3);
                expect(values[1]).toBe(1);                
            });
            
            describe("When no initial value is specified", function() {
                it("The result is the reduction of the array", function() {
                    var result = [1, 3, 6].reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(10);
                });
                
                it("When the array has one item, return that item", function() {
                    var result = [1].reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    });

                    expect(result).toBe(1);
                });
                
                it("When the array is empty, throw an exception", function() {
                    expect(function() { [].reduceRight(helpers.noop); }).toThrow();
                });
            });
            
            describe("When an initial value is specified", function() {
                it("The value is included in the reduction", function() {
                    var result = [1, 3, 6].reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(20);
                });
                
                it("When the array is empty, return the initial value", function() {
                    var result = [].reduceRight(function(accumulator, value) {
                        return accumulator + value;
                    }, 10);

                    expect(result).toBe(10);
                });
            });
            
            describe("The specified action is always called with", function() {
                it("The accumulator", function() {
                    var accumulators = [];

                    [1, 3, 6].reduceRight(function(accumulator, value) {
                        accumulators.push(accumulator);

                        return accumulator + value;
                    });

                    expect(accumulators[0]).toBe(6);                
                    expect(accumulators[1]).toBe(9);
                });
                
                it("The value", function() {
                    var values = [];

                    [1, 3, 6].reduceRight(function(accumulator, value) {
                        values.push(value);

                        return value;
                    });

                    expect(values[0]).toBe(3);                
                    expect(values[1]).toBe(1);
                });
                
                it("The index", function() {
                    var indexes = [];
                    
                    [1, 3, 6].reduceRight(function(accumulator, value, index) {
                        indexes.push(index);
                        
                        return true;
                    });
                    
                    expect(indexes[0]).toBe(1);
                    expect(indexes[1]).toBe(0);                
                });
                
                it("The array", function() {
                    var array = null;
                    
                    [1, 3].reduceRight(function(accumulator, value, index, instance) {
                        array = instance;
                        
                        return true;
                    });
                    
                    expect(array).toEqual([1, 3]);
                });
            });
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline