// Ensure
// ---------------------------------

(function() {
    // summary:
    //         Assert that a @parameter is a jQuery element.
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
    gsoft.ensure.assertions.isjQueryElement = function(parameter, parameterName, context, assertionMessage) {
        if (!gsoft.utils.isjQueryElement(parameter)) {
            var message = gsoft.ensure._getMessage(assertionMessage, "{0}{1} must be a jQuery element.", parameterName, context);
            throw new gsoft.ArgumentError(message);
        }

        return this;
    };
})();