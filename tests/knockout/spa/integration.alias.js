(function(dataSampler) {
    "use strict";
    
    describe("spa.integration.alias", function() {
        describe("When this is an alias route", function() {
            var pageUrl = null;
            var viewUrl = null;
            var aliasUrl = null;

            beforeEach(function() {
                spyOn(gsoft.spa.utils, "_navigate");

                pageUrl = dataSampler.generateString(10);
                viewUrl = dataSampler.generateString(10);
                aliasUrl = dataSampler.generateString(10);
            });

            it("When the route is runned, navigate to the redirect URL", function() {
                gsoft.spa.shell.registerPage({
                    url: pageUrl,
                    viewUrl: viewUrl,
                    aliases: [aliasUrl]
                });
                
                gsoft.spa.router.runRoute(aliasUrl);

                expect(gsoft.spa.utils._navigate).toHaveBeenCalledWith(pageUrl);
            });

            it("When the route has parameters, the redirect URL receive the route parameters", function() {
                gsoft.spa.shell.registerPage({
                    url: pageUrl + "/:id",
                    viewUrl: viewUrl,
                    aliases: [aliasUrl + "/:id"]
                });

                gsoft.spa.router.runRoute(aliasUrl + "/1");

                expect(gsoft.spa.utils._navigate).toHaveBeenCalledWith(pageUrl + "/1");
            });
        });
    });
})(test.dataSampler);