// Utils
// ---------------------------------

(function(undefined) {
    var utils = gsoft.utils = {
        // summary:
        //         Determines wether @value is defined.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isDefined: function(value) {
            return !this.isUndefined(value);
        },
        
        // summary:
        //         Determines wether @value is undefined.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isUndefined: function(value) {
            return value === undefined;
        },
        
        // summary:
        //         Determines wether @value is not null and not undefined.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isNotNull: function(value) {
            return !this.isNull(value);
        },
                
        // summary:
        //         Determines wether @value is null or undefined.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isNull: function(value) {
            return this.isUndefined(value) || value === null;
        },
            
        // summary:
        //         Determines wether @value is null, undefined or an empty string.
        // value: String
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isNullOrEmpty: function(value) {
            return this.isNull(value) || value === "";
        },
            
        // summary:
        //         Determines wether @value is a String object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isString: function(value) {
            return Object.prototype.toString.call(value) === "[object String]";
        },
        
        // summary:
        //         Determines wether @value is a Number object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isNumber: function(value) {
            return Object.prototype.toString.call(value) === "[object Number]";
        },
        
        // summary:
        //         Determines wether @value is a Boolean object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isBoolean: function(value) {
            return Object.prototype.toString.call(value) === "[object Boolean]";
        },

        // summary:
        //         Determines wether @value is a Date object.
        // value: Object
        //         The value to perform the check against.  
        // returns:
        //         A boolean.
        isDate: function(value) {
            return Object.prototype.toString.call(value) === "[object Date]";
        },
        
        // summary:
        //         Determines wether @value is a RegExp object.
        // value: Object
        //         The value to perform the check against.  
        // returns:
        //         A boolean.
        isRegExp: function(value) {
            return Object.prototype.toString.call(value) === "[object RegExp]";
        },

        // summary:
        //         Determines wether @value is a Function object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isFunction: function(value) {
            return Object.prototype.toString.call(value) === "[object Function]";
        },
        
        // summary:
        //         Determines wether @value is an Array object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isArray: function(value) {
            return Object.prototype.toString.call(value) === "[object Array]";
        },
        
        // summary:
        //         Determines wether @value is an object.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        isObject: function(value) {
            if (this.isFunction(value) || this.isArray(value) || this.isDate(value) || this.isRegExp(value) || this.isNumber(value)) {
                return false;
            }
            
            return value === Object(value);
        },
        
        // ---------------------------------
        
        // summary:
        //         Removes the item at position @index from the @array.
        // array: Array
        //         The array to remove an item from.
        // index: Integer
        //         The index of the item to remove from the array.
        arrayRemoveAt: function(array, index) {
            var removedItems  = array.splice(index, 1);

            return removedItems.length > 0 ? removedItems[0] : null;
        },
        
        // ---------------------------------
        
        // summary:
        //        Iterate over every properties of an object.
        // obj: Object
        //         The object to iterates over.
        // action: Function
        //         The function to call for every properties of the object.
        objectForEach: function(obj, action, context) {
            for (var propertyKey in obj) {
                if (obj.hasOwnProperty(propertyKey)) {
                    action.call(context, obj[propertyKey], propertyKey);
                }
            }
        },
        
        // ---------------------------------
        
        // summary:
        //         Clone a plain object. 
        // description:
        //        A plain object is an object created by using the object literal { } notation. This function will not copy
        //        functions to the resulting object.
        // obj: Object
        //         The object to clone.
        // returns:
        //         A plain object.
        clonePlainObject: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
            
        // summary:
        //         Clone an array.
        // array: Array
        //         The array to clone.
        // returns:
        //         An array.
        cloneArray: function(array) {
            return array.slice(0);
        },
        
        // ---------------------------------
        
        // summary:
        //         Write a message to the console if debug is activated.
        // value(s): Object
        //         The value(s) to write to the console.
        trace: function(/* [value1], [value2], ... */) {
            if (gsoft.debug === true && !this.isNull(console.log)) {
                console.log.apply(console, arguments);
            }
        },

        // summary:
        //         Write a grouped message to the console if debug is activated.
        // value(s): Object
        //         The value(s) to write to the console. The first value will be the value visible when the group is collapsed.
        groupTrace: function(values) {
            if (gsoft.debug === true && !this.isNull(console.log) && !this.isNull(console.groupCollapsed) && !this.isNull(console.groupEnd)) {
                if (!this.isNull(values)) {
                    if (values.length >= 1) {
                        console.groupCollapsed.apply(console, values[0]);

                        for (var i = 1; i < values.length; i += 1) {
                            console.log.apply(console, values[i]);
                        }

                        console.groupEnd();
                    }
                }
            }
        }
    };
    
    // ********  TO DELETE ****************** 

    // if (!utils.isUndefined(Array.isArray) && !gsoft.forceShims) {
    //     // The assertion is done with the native JavaScript Array object which support this feature 
    //     // since the JavaScript 1.8.5 (ECMAScript 5) specifications.
    //     utils.isArray = function(value) {
    //         return Array.isArray(value);
    //     };
    // }

    // ********  /TO DELETE ****************** 
    
    if (_.isBrowser()) {
        // summary:
        //         Determines wether @value is a DOM element.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        utils.isDomElement = function(value) {
            try {
                if (value.ownerDocument.documentElement.tagName.toLowerCase() === "html") {
                    return true;
                }
            }
            catch (e) {
            }

            return false;
        };
    }
    
    // Define aliases for the most frequently used utils functions to allow a lighter syntax.
    gsoft.isDefined = utils.isDefined;
    gsoft.isUndefined = utils.isUndefined;
    gsoft.isNull = utils.isNull;
    gsoft.isNotNull = utils.isNotNull;
    gsoft.isNullOrEmpty = utils.isNullOrEmpty;
})();