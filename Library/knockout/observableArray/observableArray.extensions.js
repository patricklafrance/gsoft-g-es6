// NOTE: The function documentation is based on the DOJO documentation: 
// https://dojotoolkit.org/reference-guide/1.7/util/doctools/markup.html

(function() {
    "use strict";
    
    var utils = null;

    if (typeof module === "object") {
        utils = require("gsoft").utils;
    } 
    else if (typeof window === "object") {
        if (window.GSOFT_UNIT_TESTS === true) {
            utils = window.gsoft.utils;
        }
    }

    // summary:
    //          Returns the number of items in the observable array.
    // returns:
    //          An integer that represent the number of items in the observable array.
    ko.observableArray.fn.count = function() {
        return this().length;
    };
    
    // summary:
    //          Determine wether the observable array is empty.
    // returns:
    //          True if the observable array is empty, otherwise, false.
    ko.observableArray.fn.isEmpty = function() {
        return this().length === 0;
    };
    
    // summary:
    //          Returns the items at the specified @index.
    // index: Integer
    //          The index of the item to retrieve.
    // returns:
    //          The item at the specified @index.
    ko.observableArray.fn.itemAt = function(index) {
        return this()[index];
    };
    
    // summary:
    //          Returns the items at the specified @index.
    // predicate: Function
    //          An optional function that returns true if this is a match, otherwise, false.
    //          The predicate parameters are in ordre:
    //              - The current item
    //              - The current item index
    //              - The array
    // context: Object
    //          An optional context to use as "this" for the @predicate.
    // returns:
    //          If a @predicate is specified, the first item of the array that match the predicate will be returned.
    //          If a @predicate is not specified, the first item of the array will be returned.
    //          If a match cannot be found, or the array is empty, null will be returned.
    ko.observableArray.fn.first = function(predicate, context) {
        var underlyingArray = this();
        
        if (utils.isFunction(predicate)) {
            var candidate = null;
            
            var foundCandidate = underlyingArray.some(function(item, index) {
                candidate = item;
                
                return predicate.call(context, item, index, underlyingArray) === true;
            });
            
            return foundCandidate ? candidate : null;
        }
        
        return underlyingArray.length > 0 ? underlyingArray[0] : null;
    };
    
    ko.observableArray.fn.forEach = function(callback, context) {
        this().forEach(callback, context);
    };
    
    ko.observableArray.fn.map = function(mapper, context) {
        return this().map(mapper, context);
    };
    
    ko.observableArray.fn.filter = function(predicate, context) {
        return this().filter(predicate, context);
    };
    
    ko.observableArray.fn.every = function(predicate, context) {
        return this().every(predicate, context);
    };
    
    ko.observableArray.fn.some  = function(predicate, context) {
        return this().some(predicate, context);
    };
    
    ko.observableArray.fn.reduce = function(action, initialValue) {
        var underlyingArray = this();
        
        if (arguments.length === 1) {
            return underlyingArray.reduce(action);
        }
        
        return underlyingArray.reduce(action, initialValue);
    };
    
    ko.observableArray.fn.reduceRight = function(action, initialValue) {
        var underlyingArray = this();
        
        if (arguments.length === 1) {
            return underlyingArray.reduceRight(action);
        }
        
        return underlyingArray.reduceRight(action, initialValue);
    };
    
    ko.observableArray.fn.concat = function() {
        var underlyingArray = this();
        var result = underlyingArray.concat(ko.utils.unwrapObservable(arguments[0]));
        
        for (var i = 1, max = arguments.length; i < max; i += 1) {
            result = result.concat(ko.utils.unwrapObservable(arguments[i]));
        }
        
        return result;
    };
    
    // summary:
    //          Returns the differences between the observable array and @otherArray.
    // predicate: Function
    //          An optional function that returns true if this is a match, otherwise, false.
    //          The predicate parameters are in order:
    //              - The current item of the observable array
    //              - The current item of the other observable array
    //              - The array
    //              - The other array
    // context: Object
    //          An optional context to use as "this" for the @predicate.
    // returns:
    //          The differences between the observable array and @otherArray 
    ko.observableArray.fn.difference = function(otherArray, predicate, context) {
        var underlyingArray = this();
        var underlyingOtherArray = ko.utils.unwrapObservable(otherArray);
        
        if (!utils.isFunction(predicate)) {
            predicate = function(item1, item2) {
                return item1 === item2;
            };
        }
        
        return underlyingArray.filter(function(item) {
            var exist = underlyingOtherArray.some(function(otherItem) {
                return predicate.call(context, item, otherItem, underlyingArray, underlyingOtherArray);
            });
            
            return !exist;
        });
    };
})();