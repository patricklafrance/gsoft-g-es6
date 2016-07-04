// Object navigator service
// ---------------------------------

(function($, utils) {
    gsoft.spa.Service.ObjectNavigator = "object-navigator";

    // We cannot use gsoft.utils.clonePlainObject because it doesn't copy functions
    // to the resulting object.
    function clonePlainObject(obj) {
        return $.extend(true, {}, obj);
    }

    var ObjectNavigator = function() {
        this._current = null;
        this._options = null;
        this._context = null;
    };
    
    ObjectNavigator.prototype = {
        // summary:
        //         Traverse the specified @obj and call the specified handlers when objects, functions or primitive types are met.
        //         This object navigator is designed to support Knockout and can traverse and call handlers for observable properties.
        // description:
        //         When an handler is called by the object navigator, a path is provided to indicate which item is currently being traversed.
        //         That path can have any of the following formats:
        //                  {root}
        //                  {root}.obj.prop
        //                  {root}.obj.array
        //                  {root}.obj.array[i].obj.prop
        // obj: Object
        //         An object to traverse. It can be an object literal or a prototyped object.
        // options: Object
        //         filter: Function
        //                  An optional function that is called before traversing any properties of the object to validate if the property can
        //                  be traversed. The function is called with the current property and should return true if the property can be traversed,
        //                  otherwise; false.
        //         onObject: Function
        //                  An optional function that is called when an object property is traversed. The function can optionally return false if the navigator
        //                  shouldn't go deeper in current branch of the @obj.
        //         onFunction: Function
        //                  An optional function that is called when a function property is traversed.
        //         onArray: Function
        //                  An optional function that is called when an array property is traversed. The function can optionally return false if the navigator
        //                  shouldn't go deeper in current branch of the @obj.
        //         onPrimitive: Function
        //                  An optional function that is called when a property with a primitive type (boolean, string, integer, etc...) is traversed.
        //
        //         All the property handlers are called with the following object as function argument:
        //                  key: String
        //                          The key of the property that is currently being traversed. 
        //                  value: Object
        //                          The value of the property that is currently being traversed.
        //                  path: String
        //                          The path of the property that is currently being traversed.
        //                  parent: Object
        //                          The parent of the property that is currently being traversed.
        //                  obj: Object
        //                          The original @obj.        
        // context: Object
        //         A context object to provide as "this" when calling an handler.
        traverse: function(obj, options, context) {
            gsoft.ensure(obj, "obj", "ObjectNavigator.traverse").isNotNull();

            this._reset(obj, options, context);
            this._next("{root}", obj, "", null);
        },
        
        _reset: function(obj, options, context) {
            this._current = obj;
            this._options = this._computeOptions(options);
            this._context = context;
        },
        
        _computeOptions: function(options) {
            options = utils.isNull(options) ? {} : clonePlainObject(options);
            
            // When no filter are specified use a dummy function that always return true.
            if (!utils.isFunction(options.filter)) {
                options.filter = function() {
                    return true;
                };
            }
            
            return options;
        },
        
        _next: function(key, value, path, parent) {
            var augmentedPath = this._augmentPath(path, key);

            var property = {
                key: key,
                value: value,
                path: augmentedPath,
                parent: parent,
                obj: this._current
            };
            
            if (this._options.filter.call(this._context, property)) {
                if (this._isArray(value)) {
                    this._handleArray(property);
                }
                else if (utils.isObject(value)) {
                    this._handleObject(property);
                }
                else if (utils.isFunction(value)) {
                    this._handleScalar(property, this._options.onFunction);
                }
                else {
                    this._handleScalar(property, this._options.onPrimitive);
                }
            }
        },
        
        _handleObject: function(property) {
            this._handleScalar(property, this._options.onObject);

            var obj = property.value;

            for (var childKey in obj) {
                if (obj.hasOwnProperty(childKey)) {
                    this._next(childKey, obj[childKey], property.path, obj);
                }
            }
        },
        
        _handleArray: function(property) {
            this._handleScalar(property, this._options.onArray);
        
            var array = property.value;
            var unwrappedArray = ko.utils.peekObservable(array);
            
            for (var i = 0, max = unwrappedArray.length; i < max; i += 1) {
                this._next("[i]", unwrappedArray[i], property.path, array);
            }
        },
        
        _handleScalar: function(property, handler) {
            if (utils.isFunction(handler)) {
                handler.call(this._context, property);
            }
        },
        
        _isArray: function(value) {
            value = ko.utils.peekObservable(value);
        
            return utils.isArray(value);
        },
        
        _augmentPath: function(actualPath, newPart) {
            if (newPart === "{root}") {
                return newPart;
            }

            if (newPart === "[i]") {
                return actualPath + newPart;
            }
            
            return "{0}.{1}".format(actualPath, newPart);
        }
    };

    // ---------------------------------

    gsoft.spa.services.objectNavigator = function() {
        return new ObjectNavigator();
    };
})(jQuery,
   gsoft.utils);