(function(helpers, dataSampler) {
    "use strict";

    describe("spa.integration.bootstrapping", function() {
        var routeUrl = null;
        var containerElement = null;

        beforeEach(function() {
            helpers.ajax.install();

            routeUrl = dataSampler.generateString(10);
            containerElement = document.createElement("div");
            
            helpers.dom.appendElementToBody(containerElement);
        });

        afterEach(function() {
            helpers.ajax.uninstall();
            helpers.dom.removeElementFromBody(containerElement);
        });

        it("requireAll function exists", function() {
            // This is too hard to test the requireAll function in integration because of some Webpack magic,
            // so we only test if the function exist.
            expect(helpers.isDefined(gsoft.spa.bootstrapper.requireAll)).toBeTruthy();
        });

        it("Can bootstrap the application", function() {
            gsoft.spa.shell.registerPage({ url: routeUrl, viewUrl: routeUrl });

            var bootstrap = function() {
                gsoft.spa.bootstrapper
                    .useCustomComponentLoader()
                    .useApplicationRootRoute({ name: routeUrl })
                    .use404Route({ name: routeUrl })
                    .onError(helpers.noop)
                    .onPageChanging(helpers.noop)
                    .onPageChanged(helpers.noop)
                    .onBeforeHttpRequest(helpers.noop)
                    .onHttpRequestSucceeded(helpers.noop)
                    .onHttpRequestCompleted(helpers.noop)
                    .start({
                        containerElement: containerElement
                    });
            };

            expect(function() { bootstrap() }).not.toThrow();
        });
    });
})(test.helpers,
   test.dataSampler);