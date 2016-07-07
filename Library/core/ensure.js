// Ensure
// ---------------------------------

(function(utils) {
    // Caching the unshift array prototype function give a small performance boost.
    // This is used when manipulating function arguments. Since arguments is
    // an "Array like" it doesn't implements the native array manipulation functions.
    var unshift = Array.prototype.unshift;

    // summary:
    //         Ensure that a @parameter respect the specified assertions.
    // description:
    //         Ensure that a @parameter respect the specified assertions. Every assertions returns
    //         an object literal that contains all the assertions to allow chaining. Custom assertions
    //         can be added by extending "gsoft.ensure.assertions".
    // parameter: Object
    //         The parameter to verify.
    // parameterName: String
    //         An optional name of the parameter to verify.
    // context: String
    //         An optional identifier providing more information about the context of the call to ensure.
    // returns:
    //         An object that contains all the assertions functions.
    // example:
    //         gsoft.ensure(parameter, "Optional parameter name", "Optional context").isNotNull("Optional specific message").isNotEmpty();
    var ensure = gsoft.ensure = function(parameter, parameterName, context) {
        var assertions = {};

        var getAssertionProxy = function(property) {
            return function() {
                unshift.apply(arguments, [parameter, parameterName, context]);

                return property.apply(assertions, arguments);
            };
        };
        
        // Wrap all the assertions to append the default arguments to the function arguments.
        utils.objectForEach(gsoft.ensure.assertions, function(assertion, assertionKey) {
            assertions[assertionKey] = getAssertionProxy(assertion);
        });

        return assertions;
    };
        
    // summary:
    //         Build an error message.
    // description:
    //         Build an error message. 
    //         For the default message format:
    //              {0} is the context of the call to ensure
    //              {1} is the parameter name
    var getMessage = ensure._getMessage = function(assertionMessage, defaultMessageTemplate, parameterName, context) {
        var message = assertionMessage;

        if (utils.isNullOrEmpty(message)) {
            message = _.formatString(defaultMessageTemplate,
                _.formatString(utils.isNullOrEmpty(context) ? "" : "{0} - ", context),
                utils.isNullOrEmpty(parameterName) ? "Parameter" : parameterName);
        }

        if (utils.isNullOrEmpty(message)) {
            message = _.formatString(defaultMessageTemplate,
                _.formatString(utils.isNullOrEmpty(context) ? "" : "{0} - ", context),
                utils.isNullOrEmpty(parameterName) ? "Parameter" : parameterName);
        }

        return message;
    };

    ensure.assertions = {
        // summary:
        //         Assert that a @parameter is not null.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isNotNull: function(parameter, parameterName, context, assertionMessage) {
            if (utils.isNull(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} cannot be null.", parameterName, context);
                throw new gsoft.ArgumentNullError(parameterName, message);
            }

            return this;
        },

        // summary:
        //         Assert that a @parameter is not empty.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isNotEmpty: function(parameter, parameterName, context, assertionMessage) {
            var isValid = false;

            if (utils.isArray(parameter)) {
                isValid = parameter.length > 0;
            } else {
                isValid = parameter !== "";
            }

            if (!isValid) {
                var message = getMessage(assertionMessage, "{0}{1} cannot be empty.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        },

        // summary:
        //         Assert that a @parameter is not null or an empty string.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isNotNullOrEmpty: function(parameter, parameterName, context, assertionMessage) {
            var message = "";

            if (utils.isNull(parameter)) {
                message = getMessage(assertionMessage, "{0}{1} cannot be null.", parameterName, context);
                throw new gsoft.ArgumentNullError(parameterName, message);
            }
                
            if (parameter === "") {
                message = getMessage(assertionMessage, "{0}{1} cannot be empty.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        },

        // summary:
        //         Assert that a @parameter is a function.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isFunction: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isFunction(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be a function.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }
                
            return this;
        },
        
        // summary:
        //         Assert that a @parameter is a date.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isDate: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isDate(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be a date.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }
                
            return this;
        },
        
        // summary:
        //         Assert that a @parameter is a number.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isNumber: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isNumber(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be a number.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }
                
            return this;
        },

        // summary:
        //         Assert that a @parameter is an array.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isArray: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isArray(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be an array.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        },

        // summary:
        //         Assert that a @parameter is an object.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isObject: function(parameter, parameterName, context, assertionMessage) {
            if (!utils.isObject(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be an object.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        },
        
        // summary:
        //         Assert that a @parameter pass the specified evaluation.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // evaluator: Function
        //         A function that evaluate the @parameter.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isTrue: function(parameter, parameterName, context, evaluator, assertionMessage) {
            if (!utils.isFunction(evaluator)) {
                evaluator = function(x) {
                    return !!x;
                };
            }

            if (!evaluator(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} is invalid.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        },

        // summary:
        //         Assert that a @parameter is a DOM element.
        // parameter: Object
        //         The parameter to verify.
        // parameterName: String
        //         An optional name of the parameter to verify.
        // context: String
        //         An optional identifier providing more information about the context of the call to ensure.
        // assertionMessage: String
        //         An optional message used when an assertion fail.
        // returns:
        //         An object that contains all the assertions functions.
        isDomElement: function(parameter, parameterName, context, assertionMessage) {
            if (!gsoft.utils.isDomElement(parameter)) {
                var message = getMessage(assertionMessage, "{0}{1} must be a DOM element.", parameterName, context);
                throw new gsoft.ArgumentError(message);
            }

            return this;
        }
    };
})(gsoft.utils);