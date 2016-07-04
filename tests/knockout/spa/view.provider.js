// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler, undefined) {
    "use strict";

    describe("spa.viewProvider", function() {
        function setupAjaxMock() {
            jasmine.Ajax.install();
            jasmine.Ajax.requests.reset();
        }

        function resetViewProvider() {
            gsoft.spa.viewProvider._cache = {};
        }

        function ajaxSuccessResponse(content) {
            var request = jasmine.Ajax.requests.mostRecent();

            request.respondWith({
                status: 200,
                responseText: content
            });

            expect(request.method).toBe("GET");
        }

        function ajaxFailResponse() {
            var request = jasmine.Ajax.requests.mostRecent();

            request.respondWith({
                status: 500
            });

            expect(request.method).toBe("GET");
        }

        describe("get", function() {
            beforeEach(function() {
                setupAjaxMock();
                resetViewProvider();
            });
            
            afterEach(function() {
                jasmine.Ajax.uninstall();
            });

            it("When url is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.viewProvider.get(null); }).toThrow();
                expect(function() { gsoft.spa.viewProvider.get(undefined); }).toThrow();
                expect(function() { gsoft.spa.viewProvider.get(""); }).toThrow();
            });

            describe("When the view is not cached", function() {
                describe("When the request succeeded", function() {
                    describe("When the response is empty", function() {
                        it("Reject the promise with the error", function() {
                            var works = false;

                            gsoft.spa.viewProvider.get(dataSampler.generateString(10)).fail(function() {
                                if (arguments[2] === "Invalid view.") {
                                    works = true;
                                }
                            });

                            ajaxSuccessResponse("");

                            expect(works).toBeTruthy();
                        });

                        it("Publish the error throught the mediator", function() {
                            var works = false;
                            var url = dataSampler.generateString(10);

                            gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                                if (error.source === gsoft.spa.Component.ViewProvider &&
                                    error.errorType === "InvalidView" &&
                                    error.data.url === url) {
                                    works = true;
                                }
                            });

                            gsoft.spa.viewProvider.get(url);
                            ajaxSuccessResponse("");

                            expect(works).toBeTruthy();
                        });
                    });

                    describe("When the response is not empty", function() {
                        it("When useCache is true, cache the response", function() {
                            var url = dataSampler.generateString(10);
                            var view = dataSampler.generateString(10);

                            gsoft.spa.viewProvider.get(url, true);

                            expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).toBeFalsy();

                            ajaxSuccessResponse(view);
                            jasmine.Ajax.requests.reset();

                            gsoft.spa.viewProvider.get(url);

                            expect(gsoft.spa.viewProvider._cache[url]).toBe(view);
                            expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).toBeTruthy();
                        });

                        it("When useCache is false, do not cache the response", function() {
                            var works = false;
                            var url = dataSampler.generateString(10);
                            var view = dataSampler.generateString(10);

                            gsoft.spa.viewProvider.get(url, false).done(function() {
                                if (arguments[0] === view) {
                                    works = true;
                                }
                            });

                            ajaxSuccessResponse(view);

                            expect(works).toBeTruthy();
                            expect(helpers.isNull(gsoft.spa.viewProvider._cache[url])).toBeTruthy();
                        });

                        it("When useCache is undefined, do not cache the response", function() {
                            var works = false;
                            var url = dataSampler.generateString(10);
                            var view = dataSampler.generateString(10);

                            gsoft.spa.viewProvider.get(url).done(function() {
                                if (arguments[0] === view) {
                                    works = true;
                                }
                            });

                            ajaxSuccessResponse(view);

                            expect(works).toBeTruthy();
                            expect(helpers.isNull(gsoft.spa.viewProvider._cache[url])).toBeTruthy();
                        });

                        it("Resolve the promise with response", function() {
                            var works = false;
                            var url = dataSampler.generateString(10);
                            var view = dataSampler.generateString(10);

                            gsoft.spa.viewProvider.get(url, true).done(function() {
                                if (arguments[0] === view) {
                                    works = true;
                                }
                            });

                            ajaxSuccessResponse(view);

                            expect(works).toBeTruthy();
                        });
                    });
                });

                describe("When the request fail", function() {
                    it("Reject the promise with the error", function() {
                        var works = false;

                        gsoft.spa.viewProvider.get(dataSampler.generateString(10)).fail(function() {
                            works = true;
                        });

                        ajaxFailResponse();

                        expect(works).toBeTruthy();
                    });

                    it("Publish the error throught the mediator", function() {
                        var works = false;
                        var url = dataSampler.generateString(10);

                        gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                            if (error.source === gsoft.spa.Component.ViewProvider &&
                                error.errorType === "InvalidView" &&
                                error.data.url === url) {
                                works = true;
                            }
                        });

                        gsoft.spa.viewProvider.get(url);
                        ajaxFailResponse();

                        expect(works).toBeTruthy();
                    });
                });
            });

            describe("When the view is cached", function() {
                it("Do not fetch view from the server", function() {
                    var url = dataSampler.generateString(10);

                    gsoft.spa.viewProvider.get(url, true);
                    ajaxSuccessResponse(dataSampler.generateString(10));

                    jasmine.Ajax.requests.reset();

                    gsoft.spa.viewProvider.get(url);

                    expect(helpers.isNull(jasmine.Ajax.requests.mostRecent())).toBeTruthy();
                });
            });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline