(function($, helpers) {
    "use strict";

    describe("spa.utils", function() {
        describe("_isjQueryElement", function() {
            it("When is a jQuery element, returns true", function() {
                expect(gsoft.spa.utils._isjQueryElement($("<div/>"))).toBeTruthy();
            });

            it("When is not a jQuery element, returns false", function() {
                expect(gsoft.spa.utils._isjQueryElement(document.createElement("div"))).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement("")).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement(true)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement(1)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement($.noop)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement(null)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryElement(undefined)).toBeFalsy();
            });
        });
        
        describe("_isjQueryPromise", function() {
            it("When is null, return false", function() {
                expect(gsoft.spa.utils._isjQueryPromise(null)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryPromise(undefined)).toBeFalsy();
            });

            it("When is not implementing a jQuery promise property, return false", function() {
                var partialPromise1 = {
                    fail: helpers.noop
                };

                var partialPromise2 = {
                    done: helpers.noop
                };

                expect(gsoft.spa.utils._isjQueryPromise(partialPromise1)).toBeFalsy();
                expect(gsoft.spa.utils._isjQueryPromise(partialPromise2)).toBeFalsy();
            });
            
            it("When is a jQuery promise, return true", function() {
                expect(gsoft.spa.utils._isjQueryPromise(new $.Deferred().promise())).toBeTruthy();
            });
        });
    });
})(jQuery,
   test.helpers);