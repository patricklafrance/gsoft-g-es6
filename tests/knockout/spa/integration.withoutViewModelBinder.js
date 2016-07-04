(function(helpers, dataSampler) {
    "use strict";

    describe("spa.integration.withoutViewModelBinder", function() {
        var routeUrl = null;
        var containerElement = null;
        var view = "<span>Hello world!</span>";

        beforeEach(function() {
            helpers.ajax.install();
            
            routeUrl = dataSampler.generateString(10);
            containerElement = document.createElement("div");
            
            helpers.dom.appendElementToBody(containerElement);

            gsoft.spa.shell.registerPage({ url: routeUrl, viewUrl: routeUrl });
            gsoft.spa.shell.start({ containerElement: containerElement });
        });

        afterEach(function() {
            helpers.ajax.uninstall();
            helpers.dom.removeElementFromBody(containerElement);
        });

        describe("When the route is runned", function() {
            it("Fetch the view from the server", function() {
                gsoft.spa.router.runRoute(routeUrl);

                expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).not.toBeTruthy();
            });

            it("Add the view to the DOM", function() {
                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                // Doing a lowerCase to prevent the test from failing in IE8 and lower, which convert
                // the <span> elements to <SPAN>.
                expect(containerElement.innerHTML.toLowerCase()).toBe(view.toLowerCase());
            });

            it("Page changing events are published throught the mediator", function() {
                var count = 0;

                gsoft.spa.shell.onPageChanging(function(targetPage) {
                    if (targetPage.pageUrl === routeUrl) {
                        count += 1;
                    }
                });

                gsoft.spa.shell.onPageChanged(function(page) {
                    if (page.pageUrl === routeUrl) {
                        count += 1;
                    }
                });

                gsoft.spa.router.runRoute(routeUrl);
                helpers.ajax.setupSuccessfulGetResponse(view);

                expect(count).toBe(2);
            });
        });

        describe("When the route is exited", function() {
            it("Nothing happens", function() {
                expect(function() {
                    gsoft.spa.router.runRoute(routeUrl);
                    helpers.ajax.setupSuccessfulGetResponse(view);

                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    Path.routes.defined[routeUrl].do_exit();
                    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
                }).not.toThrow();
            });
        });
    });
})(test.helpers,
   test.dataSampler);