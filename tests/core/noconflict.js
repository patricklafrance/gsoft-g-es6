(function() { 
    "use strict";

    describe("noConflict", function() {
        it("When \"g\" is the GSoft library, rollback \"g\" to old value", function() {
            expect(g).toBe(gsoft);

            gsoft.noConflict();

            expect(g).toBe("g before loading the GSoft library");
        });

        it("When \"g\" is not the GSoft library, do not rollback \"g\" to old value", function() {
            window.g = "Something else than GSoft";

            gsoft.noConflict();

            expect(g).toBe("Something else than GSoft");
        });
    });
})();