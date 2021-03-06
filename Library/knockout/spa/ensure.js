// Ensure
// ---------------------------------

(function(utils) {
    var ensure = spa.ensure = function(parameter, parameterName, context) {
        return gsoft._ensure(spa.ensure.assertions, parameter, parameterName, context);
    };

    ensure.assertions = {
        // summary:
        //          Assert that a @parameter implements the KO view model contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isViewModel: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.bind, parameterName, context).isFunction(assertionMessage);
                    
            return this;
        },

        // summary:
        //          Assert that a @parameter implements the CompositeViewModelBinder's binding object contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isBinding: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.viewModelFactory, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.bindingElementAccessor, parameterName, context).isFunction(assertionMessage);

            return this;
        },

        // summary:
        //          Assert that a @parameter implements the router contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isRouter: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.addRoute, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.runRoute, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.setRoot, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.set404Handler, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.start, parameterName, context).isFunction(assertionMessage);
        },

        // summary:
        //          Assert that a @parameter implements the view model binder contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isViewModelBinder: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isNull(parameter)) {
                gsoft.ensure(parameter.bind, parameterName, context).isFunction(assertionMessage);
                gsoft.ensure(parameter.unbind, parameterName, context).isFunction(assertionMessage);
                gsoft.ensure(parameter.isBound, parameterName, context).isFunction(assertionMessage);
            }

            return this;
        },

        // summary:
        //          Assert that a @parameter implements the view provider contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isViewProvider: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.get, parameterName, context).isFunction(assertionMessage);
        },

        // summary:
        //          Assert that a @parameter implements the view renderer contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isViewRenderer: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.render, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.clear, parameterName, context).isFunction(assertionMessage);
        },

        // summary:
        //          Assert that a @parameter implements the route registry contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isRouteRegistry: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.add, parameterName, context).isFunction(assertionMessage);
            gsoft.ensure(parameter.find, parameterName, context).isFunction(assertionMessage);
        },

        // summary:
        //          Assert that a @parameter implements the route URL resolver contract.
        // parameter: Object
        //         The parameter to verify.
        // caller: String
        //         An optional identifier for the source calling the ensure function.
        // returns:
        //         An object that contains all the assertions functions.
        _isRouteUrlResolver: function(parameter, parameterName, context, assertionMessage) {
            gsoft.ensure(parameter, parameterName, context).isNotNull(assertionMessage);
            gsoft.ensure(parameter.getRouteUrl, parameterName, context).isFunction(assertionMessage);
        },

        // summary:
        //          Assert that a @parameter implements the jQuery's promise contract.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // returns:
        //         An object that contains all the assertions functions.
        _isjQueryPromise: function(parameter, parameterName, context, assertionMessage) {
            if (!spa.utils._isjQueryPromise(parameter)) {
                var message = gsoft._ensure.getMessage(assertionMessage, "{0}{1} Parameter must be a jQuery promise.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }
                    
            return this;
        }
    };
})(gsoft.utils);