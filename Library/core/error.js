// Error
// ---------------------------------

(function(utils) {
    // summary:
    //         JavaScript error of type ArgumentError.
    // errorMessage: String
    //         An error message that will be part of the exception message.
    gsoft.ArgumentError = function(errorMessage) {
        this.message = _.formatString(utils.isNullOrEmpty(errorMessage) ? "ArgumentError" : "ArgumentError: \"{0}\"", errorMessage);
    };

    gsoft.ArgumentError.prototype = new Error();
        
    // summary:
    //         JavaScript error of type ArgumentNullError.
    // parameterName: String
    //         An error message that will be part of the exception message if
    //         @errorMessage is not specified.
    // errorMessage: String
    //         An error message that will be part of the exception message.
    gsoft.ArgumentNullError = function(parameterName, errorMessage) {
        this.parameterName = parameterName;
        
        if (utils.isNullOrEmpty(parameterName) && utils.isNullOrEmpty(errorMessage)) {
            this.message = "ArgumentNullError";
        }
        else if (utils.isNullOrEmpty(errorMessage)) {
            this.message = _.formatString("ArgumentNullError: \"{0}\" cannot be null", parameterName);
        }
        else {
            this.message = _.formatString("ArgumentNullError: \"{0}\"", errorMessage);
        }
    };

    gsoft.ArgumentNullError.prototype = new Error();

    // summary:
    //         JavaScript error of type InvalidOperationError.
    // errorMessage: String
    //         An error message that will be part of the exception message.
    gsoft.InvalidOperationError = function(errorMessage) {
        this.message = _.formatString(utils.isNullOrEmpty(errorMessage) ? "InvalidOperationError" : "InvalidOperationError: \"{0}\"", errorMessage);
    };

    gsoft.InvalidOperationError.prototype = new Error();
})(gsoft.utils);