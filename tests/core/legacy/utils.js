(function() { 
    "use strict";
    
    describe("utils", function() {
        describe("isjQueryElement", function() {
            it("When is a jQuery element, returns true", function() {
                expect(gsoft.utils.isjQueryElement($("<div/>"))).toBeTruthy();
            });

            it("When is not a jQuery element, returns false", function() {
                expect(gsoft.utils.isjQueryElement(document.createElement("div"))).toBeFalsy();
                expect(gsoft.utils.isjQueryElement("")).toBeFalsy();
                expect(gsoft.utils.isjQueryElement(true)).toBeFalsy();
                expect(gsoft.utils.isjQueryElement(1)).toBeFalsy();
                expect(gsoft.utils.isjQueryElement($.noop)).toBeFalsy();
                expect(gsoft.utils.isjQueryElement(null)).toBeFalsy();
                expect(gsoft.utils.isjQueryElement(undefined)).toBeFalsy();
            });
        });
    });
})();