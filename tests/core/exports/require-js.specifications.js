(function() {
    "use strict";
    
    describe("require-js", function() {
        var instance = null;
        
        beforeEach(function(done) {
            require(["gsoft"], function(gsoft) {
                instance = gsoft;
                
                done();
            });
        });
        
        it("Can load the gsoft core library with require-js", function() {
            expect(instance).toBeDefined();
            expect(instance).not.toBeNull();
        });
    });
})();