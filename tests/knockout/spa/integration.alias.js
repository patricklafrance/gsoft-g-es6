(function(dataSampler) {
    "use strict";
    
    describe("spa.integration.alias", function() {
        describe("When this is an alias route", function() {
            var pageUrl = null;
            var aliasUrl = null;

            beforeEach(function() {
                spyOn(gsoft.utils.spa, "_navigate");

                pageUrl = dataSampler.generateString(10);
                aliasUrl = dataSampler.generateString(10);
            });

            it("When the route is runned, navigate to the redirect URL", function() {
                gsoft.spa.shell.registerPage({
                    url: pageUrl,
                    aliases: [aliasUrl]
                });
                
                gsoft.spa.router.runRoute(aliasUrl);

                expect(gsoft.utils.spa._navigate).toHaveBeenCalledWith(pageUrl);
            });

            it("When the route has parameters, the redirect URL receive the route parameters", function() {
                gsoft.spa.shell.registerPage({
                    url: pageUrl + "/:id",
                    aliases: [aliasUrl + "/:id"]
                });

                gsoft.spa.router.runRoute(aliasUrl + "/1");

                expect(gsoft.utils.spa._navigate).toHaveBeenCalledWith(pageUrl + "/1");
            });
        });
    });
})(test.dataSampler);