(function() { 
    "use strict";

    describe("namespace", function() {
        beforeEach(function() {
            window.level1 = null;
            window.first = null;
            window.second = null;
        });

        it("Can generate one level namespace", function() {
            gsoft.namespace("level1");

            expect(window.level1).toEqual({});
        });

        it("Can generate nested namespace", function() {
            gsoft.namespace("level1.level2.level3");

            expect(window.level1).not.toBeNull();
            expect(window.level1.level2).not.toBeNull();
            expect(window.level1.level2.level3).toEqual({});
        });

        it("Can generate multiple namespace", function() {
            gsoft.namespace("first", "second");

            expect(window.first).toEqual({});
            expect(window.second).toEqual({});
        });

        it("Do not override existing namespace parts", function() {
            window.level1 = {
                property: "Already existing property"
            };

            gsoft.namespace("level1.level2");

            expect(window.level1).not.toBeNull();
            expect(window.level1.property).toBe("Already existing property");
            expect(window.level1.level2).toEqual({});
        });
    });
})();