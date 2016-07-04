(function(helpers, dataSampler) {
    "use strict";
    
    describe("spa.integration.events", function() {
        beforeEach(function() {
            helpers.ajax.install();
        });
        
        afterEach(function() {
            helpers.ajax.uninstall();
        });
        
        describe("When an error occured during the page transition", function() {
            it("An event is published throught the mediator", function() {
                var works = false;

                gsoft.spa.shell.onError(function() {
                    works = true;
                });

                var routeUrl = dataSampler.generateString(10);
                
                gsoft.spa.shell.registerPage({ url: routeUrl, viewUrl: routeUrl });
                gsoft.spa.shell.start({ containerElement: helpers.dom.getBodyElement() });
                gsoft.spa.router.runRoute(routeUrl);

                helpers.ajax.setupFailGetResponse();

                expect(works).toBeTruthy();
            });
        });
    });
})(test.helpers,
   test.dataSampler);