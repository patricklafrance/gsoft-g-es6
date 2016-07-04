// jscs:disable requireBlocksOnNewline

(function(helpers) {
    "use strict";

    function expectError(fct, message) {
        var wasThrown = false;
        
        try {
            fct();
        }
        catch (e) {
            wasThrown = e.message === message;
        }
        
        expect(wasThrown).toBeTruthy();
    }
    
    function expectArgumentNullError(fct, message, parameterName) {
        var wasThrown = false;
        
        try {
            fct();
        }
        catch (e) {
            if (e.message === message) {
                if (helpers.isDefined(parameterName)) {
                    if (e.parameterName === parameterName) {
                        wasThrown = true;
                    }
                } else {
                    wasThrown = true;
                }
            }
        }
        
        expect(wasThrown).toBeTruthy();        
    }
    
    describe("error", function() {
        describe("ArgumentError", function() {
            it("When no error message is specified, message is \"ArgumentError\"", function() {
                expectError(function() { throw new gsoft.ArgumentError(); }, "ArgumentError");
                expectError(function() { throw new gsoft.ArgumentError(null); }, "ArgumentError");
            });

            it("When an error message is specified, the proper format is used", function() {
                expectError(function() { throw new gsoft.ArgumentError("My message"); }, "ArgumentError: \"My message\"");
            });
        });

        describe("ArgumentNullError", function() {
            it("When no error message is specified, message is \"ArgumentNullError\"", function() {
                expectArgumentNullError(function() { throw new gsoft.ArgumentNullError(null, null); }, "ArgumentNullError");
                expectArgumentNullError(function() { throw new gsoft.ArgumentNullError(null, null); }, "ArgumentNullError");
            });

            describe("When a parameter name is specified", function() {
                it("The proper format is used", function() {
                    expectArgumentNullError(function() { throw new gsoft.ArgumentNullError("My parameter", null); }, "ArgumentNullError: \"My parameter\" cannot be null");
                });
                
                it("The parameter name is set on the error", function() {
                    expectArgumentNullError(function() { throw new gsoft.ArgumentNullError("My parameter", null); }, "ArgumentNullError: \"My parameter\" cannot be null", "My parameter");
                });
            });

            it("When an error message is specified, the proper format is used", function() {
                expectArgumentNullError(function() { throw new gsoft.ArgumentNullError(null, "My message"); }, "ArgumentNullError: \"My message\"");
            });
        });

        describe("InvalidOperationError", function() {
            it("When no error message is specified, message is \"InvalidOperationError\"", function() {
                expectError(function() { throw new gsoft.InvalidOperationError(); }, "InvalidOperationError");
                expectError(function() { throw new gsoft.InvalidOperationError(null); }, "InvalidOperationError");
            });

            it("When an error message is specified, the proper format is used", function() {
                expectError(function() { throw new gsoft.InvalidOperationError("My message"); }, "InvalidOperationError: \"My message\"");
            });
        });
    });
})(test.helpers);

// jscs:enable requireBlocksOnNewline