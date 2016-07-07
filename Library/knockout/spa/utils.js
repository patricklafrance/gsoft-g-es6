// Utils
// ---------------------------------

(function(utils) {
    function isImplementing(obj, propertyKeys) {
        if (propertyKeys.length === 0) {
            return false;
        }
        
        return propertyKeys.every(function(propertyKey) {
            return propertyKey in obj;           
        });
    }
    
    // Represents the properties that should be present on every object that claims to 
    // be a jQuery promise .
    var promiseDefinition = ["always", "then", "done", "fail"];
    
    // Index used to generate GUID.
    var nextGuid = 0;
    
    spa.utils = {
        // summary:
        //         Determines wether @value is a jQuery element.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        _isjQueryElement: function(value) {
            return value instanceof jQuery;
        },
        
        // summary:
        //         Determines wether @value is a jQuery promise.
        // value: Object
        //         The value to perform the check against.
        // returns:
        //         A boolean.
        _isjQueryPromise: function(value) {
            return !utils.isNull(value) && isImplementing(value, promiseDefinition);
        },

        // summary:
        //         Retrieve the URL of the current page.
        // returns:
        //         An URL.
        _getCurrentUrl: function() {
            return window.location.href;
        },

        // summary:
        //         Navigate to the specified @url.
        // url:
        //         The URL to navigate to.
        _navigate: function(url) {
            window.location.href = url;
        },

        // summary:
        //         Open a new window (or tab) at the specified @url with the specified @options.
        // url:
        //         The URL to navigate to.
        // options:
        //         Windows options.
        _openWindow: function(url, options) {
            if (utils.isNull(options)) {
                options = [];
            }

            window.open.apply(window, options.unshift(url));
        },
        
        // summary:
        //         Generate a sequential GUID.
        // returns:
        //         A GUID.
        _generateGuid: function() {
            nextGuid += 1;
            
            return nextGuid;
        }
    };
})(gsoft.utils);