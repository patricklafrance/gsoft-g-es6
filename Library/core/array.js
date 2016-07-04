// Array
// ---------------------------------

(function(utils) {
    if (utils.isUndefined(Array.isArray) || gsoft.forceShims) {
        Array.isArray = function(value) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }

            return utils.isArray(value);
        };
    }
    
    if (utils.isUndefined(Array.prototype.forEach) || gsoft.forceShims) {
        Array.prototype.forEach = function(callback, context) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(callback)) {
                throw new TypeError("{0} is not a function".format(callback));
            }
            
            for (var i = 0, max = this.length; i < max; i += 1) {
                callback.call(context, this[i], i, this);
            }
        };
    }
    
    if (utils.isUndefined(Array.prototype.map) || gsoft.forceShims) {
        Array.prototype.map = function(mapper, context) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            var newArray = [];
            
            for (var i = 0, max = this.length; i < max; i += 1) {
                newArray[i] = mapper.call(context, this[i], i, this);
            }
            
            return newArray;
        };
    }
    
    if (utils.isUndefined(Array.prototype.filter) || gsoft.forceShims) {
        Array.prototype.filter = function(predicate, context) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(predicate)) {
                throw new TypeError("{0} is not a function".format(predicate));
            }
            
            var newArray = [];
            
            for (var i = 0, max = this.length; i < max; i += 1) {
                if (predicate.call(context, this[i], i, this)) {
                    newArray.push(this[i]);
                }
            }
            
            return newArray;
        };
    }
    
    if (utils.isUndefined(Array.prototype.every) || gsoft.forceShims) {
        Array.prototype.every = function(predicate, context) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(predicate)) {
                throw new TypeError("{0} is not a function".format(predicate));
            }
            
            for (var i = 0, max = this.length; i < max; i += 1) {
                if (predicate.call(context, this[i], i, this) !== true) {
                    return false;
                }
            }
            
            return true;
        };
    }
    
    if (utils.isUndefined(Array.prototype.indexOf) || gsoft.forceShims) {
        Array.prototype.indexOf = function(value, fromIndex) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            var length = this.length;
            
            if (length === 0) {
                return -1;
            }
            
            var startAt = fromIndex || 0;
            
            if (startAt > length) {
                return -1;
            }
            
            for (var i = startAt; i < length; i += 1) {
                if (this[i] === value) {
                    return i;
                }
            }
            
            return -1;
        };
    }
    
    if (utils.isUndefined(Array.prototype.some) || gsoft.forceShims) {
        Array.prototype.some = function(predicate, context) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(predicate)) {
                throw new TypeError("{0} is not a function".format(predicate));
            }
            
            for (var i = 0, max = this.length; i < max; i += 1) {
                if (predicate.call(context, this[i], i, this) === true) {
                    return true;
                }
            }
            
            return false;
        };
    }
    
    if (utils.isUndefined(Array.prototype.reduce) ||  gsoft.forceShims) {
        Array.prototype.reduce = function(action, initialValue) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(action)) {
                throw new TypeError("{0} is not a function".format(action));
            }
            
            var index = 0;
            var accumulator = initialValue;
            
            if (utils.isUndefined(accumulator)) {
                if (this.length === 0) {
                    throw new TypeError("Reduce of an empty array with no initial value");
                }
                
                accumulator = this[index];
                index += 1;
            }
            
            for (var max = this.length; index < max; index += 1) {
                accumulator = action(accumulator, this[index], index, this);
            }
            
            return accumulator;
        };
    }
    
    if (utils.isUndefined(Array.prototype.reduceRight) ||  gsoft.forceShims) {
        Array.prototype.reduceRight = function(action, initialValue) {
            if (utils.isNull(this)) {
                throw new TypeError("Array is null or undefined");
            }
            
            if (!utils.isFunction(action)) {
                throw new TypeError("{0} is not a function".format(action));
            }
            
            var index = this.length - 1;
            var accumulator = initialValue;
            
            if (utils.isUndefined(accumulator)) {
                if (this.length === 0) {
                    throw new TypeError("Reduce of an empty array with no initial value");
                }
                
                accumulator = this[index];
                index -= 1;
            }
            
            for (; index >= 0; index -= 1) {
                accumulator = action(accumulator, this[index], index, this);
            }
            
            return accumulator;
        };
    }
})(gsoft.utils);