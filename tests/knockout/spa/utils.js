(function($, helpers) {
    "use strict";

    describe("utils.spa", function() {
        describe("_isjQueryElement", function() {
            it("When is a jQuery element, returns true", function() {
                expect(gsoft.utils.spa._isjQueryElement($("<div/>"))).toBeTruthy();
            });

            it("When is not a jQuery element, returns false", function() {
                expect(gsoft.utils.spa._isjQueryElement(document.createElement("div"))).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement("")).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement(true)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement(1)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement($.noop)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement(null)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryElement(undefined)).toBeFalsy();
            });
        });
        
        describe("_isjQueryPromise", function() {
            it("When is null, return false", function() {
                expect(gsoft.utils.spa._isjQueryPromise(null)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryPromise(undefined)).toBeFalsy();
            });

            it("When is not implementing a jQuery promise property, return false", function() {
                var partialPromise1 = {
                    fail: helpers.noop
                };

                var partialPromise2 = {
                    done: helpers.noop
                };

                expect(gsoft.utils.spa._isjQueryPromise(partialPromise1)).toBeFalsy();
                expect(gsoft.utils.spa._isjQueryPromise(partialPromise2)).toBeFalsy();
            });
            
            it("When is a jQuery promise, return true", function() {
                expect(gsoft.utils.spa._isjQueryPromise(new $.Deferred().promise())).toBeTruthy();
            });
        });
    });
})(jQuery,
   test.helpers);