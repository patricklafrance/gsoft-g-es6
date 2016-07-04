// jscs:disable requireBlocksOnNewline

(function($, helpers, dataSampler, undefined) {
    "use strict";

    describe("Notifier", function() {
        afterEach(function() {
            $(".g-notifier-error").remove();

            gsoft.widgets.notifier._current = null;
        });

        describe("show", function() {
            it("When the id parameter is null or empty, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.show(null, { position: "bottom-right", html: "<div></div>" }); }).toThrow();
                expect(function() { gsoft.widgets.notifier.show("", { position: "bottom-right", html: "<div></div>" }); }).toThrow();
            });

            it("When the id parameter is not a string, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.show({}, { position: "bottom-right", html: "<div></div>" }); }).toThrow();
                expect(function() { gsoft.widgets.notifier.show(1, { position: "bottom-right", html: "<div></div>" }); }).toThrow();
            });

            it("When the position option is null or empty, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.show(dataSampler.generateString(5), { position: null, html: "<div></div>" }); }).toThrow();
                expect(function() { gsoft.widgets.notifier.show(dataSampler.generateString(5), { position: "", html: "<div></div>" }); }).toThrow();
            });

            it("When the html option is null or empty, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.show(dataSampler.generateString(5), { position: "bottom-right", html: null }); }).toThrow();
                expect(function() { gsoft.widgets.notifier.show(dataSampler.generateString(5), { position: "bottom-right", html: "" }); }).toThrow();
            });

            it("When the notification is not deferred, add the HTML template to the DOM immediatly", function() {
                gsoft.widgets.notifier.show("error");

                expect($(".g-notifier-error").length).toBe(1);
            });

            it("When the notification is deferred, wait until the specified deferred timeout has elapsed before adding the HTML template to the DOM", function(done) {
                gsoft.widgets.notifier.show("error", {
                    deferred: 50
                });

                expect($(".g-notifier-error").length).toBe(0);

                setTimeout(function() {
                    expect($(".g-notifier-error").length).toBe(1);
                    done();
                }, 60);
            });

            it("When the text option is specified apply the text to the HTML template", function() {
                var text = dataSampler.generateString(5);

                gsoft.widgets.notifier.show("error", {
                    text: text
                });

                expect($(".g-notifier-error").html().indexOf(text) !== -1).toBeTruthy();
            });

            it("When the CSS class option is specified, set it on the container element", function() {
                var cssClass = dataSampler.generateString(5);

                gsoft.widgets.notifier.show("error", {
                    cssClasses: cssClass
                });

                expect($("." + cssClass).length).toBe(1);

                $("." + cssClass).remove();
            });

            it("When the CSS class option for the overlay is specified, set it on the overlay element", function() {
                var cssClass = dataSampler.generateString(5);

                gsoft.widgets.notifier.show("error", {
                    modal: {
                        overlayCssClasses: cssClass
                    }
                });

                expect($("." + cssClass).length).toBe(1);
            });

            describe("modal", function() {
                it("When the modal option is null, do not render the modal overlay", function() {
                    gsoft.widgets.notifier.show("error", {
                        modal: null
                    });

                    expect(gsoft.widgets.notifier._current.overlayElement).toBeNull();
                });

                it("When the modal option is false, do not render the modal overlay", function() {
                    gsoft.widgets.notifier.show("error", {
                        modal: false
                    });

                    expect(gsoft.widgets.notifier._current.overlayElement).toBeNull();
                });

                it("When the modal option is true, render the modal overlay", function() {
                    gsoft.widgets.notifier.show("error", {
                        modal: true
                    });

                    expect(gsoft.widgets.notifier._current.overlayElement).not.toBeNull();
                });

                it("When the modal option is an object, render the modal overlay", function() {
                    var cssClass = dataSampler.generateString(5);

                    gsoft.widgets.notifier.show("error", {
                        modal: {
                            overlayCssClasses: cssClass
                        }
                    });

                    expect($("." + cssClass).length).toBe(1);
                });
            });

            it("Always set the current notification", function() {
                gsoft.widgets.notifier.show("error");

                expect(gsoft.widgets.notifier._current).not.toBeNull();
            });

            it("Always increment the show count", function() {
                gsoft.widgets.notifier.show("error");

                expect(gsoft.widgets.notifier._current.showCount).toBe(1);
            });

            it("When the lifetime of the notification is greater than 0 and the same notification is called multiple time, increment the show count", function() {
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.show("error", { lifetime: 1 });

                expect(gsoft.widgets.notifier._current.showCount).toBe(3);
            });

            describe("priority", function() {
                it("When a notification have an equal priority, display it", function() {
                    gsoft.widgets.notifier.show("saving", {
                        priority: 1,
                        deferred: 0
                    });

                    gsoft.widgets.notifier.show("error", {
                        priority: 1,
                        deferred: 0
                    });

                    expect($(".g-notifier-saving").length).toBe(0);
                    expect($(".g-notifier-error").length).toBe(1);
                });

                it("When a notification have an higher priority, display it", function() {
                    gsoft.widgets.notifier.show("saving", {
                        priority: 1,
                        deferred: 0
                    });

                    gsoft.widgets.notifier.show("error", {
                        priority: 2,
                        deferred: 0
                    });

                    expect($(".g-notifier-saving").length).toBe(0);
                    expect($(".g-notifier-error").length).toBe(1);
                });

                it("When a notification have a lower priority, do not display it", function() {
                    gsoft.widgets.notifier.show("saving", {
                        priority: 10,
                        deferred: 0
                    });

                    gsoft.widgets.notifier.show("error", {
                        priority: 2,
                        deferred: 0
                    });

                    expect($(".g-notifier-saving").length).toBe(1);
                    expect($(".g-notifier-error").length).toBe(0);
                });
            });
        });

        describe("hide", function() {
            it("When no notification are displayed, hide do not throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.hide(); }).not.toThrow();
            });

            it("Always remove the DOM element", function() {
                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();

                expect($(".g-notifier-error").length).toBe(0);
            });

            it("When the show count is 0, clear the current notification", function() {
                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();

                expect(gsoft.widgets.notifier._current).toBeNull();
            });

            it("When the show count is greater than 1, do not clear the current notification", function() {
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.hide();

                expect(gsoft.widgets.notifier._current).not.toBeNull();
            });

            it("When the show count is greater than 1, decrement the show count", function() {
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.show("error", { lifetime: 1 });
                gsoft.widgets.notifier.hide();

                expect(gsoft.widgets.notifier._current.showCount).toBe(1);
            });
        });

        describe("registerNotificationTemplate", function() {
            var templateId = null;

            beforeEach(function() {
                templateId = dataSampler.generateString(5);
            });

            afterEach(function() {
                if (!helpers.isNull(gsoft.widgets.notifier.templates[templateId])) {
                    delete gsoft.widgets.notifier.templates[templateId];
                }  
            });

            it("When the id parameter is null or empty, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.registerNotificationTemplate(null, {}); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerNotificationTemplate("", {}); }).toThrow();
            });

            it("Add the template to the registry", function() {
                expect(helpers.keys(gsoft.widgets.notifier.templates).length).toBe(4);

                gsoft.widgets.notifier.registerNotificationTemplate(templateId, {
                    position: "center",
                    html: "<div>Hey!</div>"
                });

                expect(helpers.keys(gsoft.widgets.notifier.templates).length).toBe(5);
            });
        });

        describe("registerShowHandler", function() {
            afterEach(function() {
                gsoft.widgets.notifier._showHandlers = [];
            });

            it("When the handler parameter is not a function, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.registerShowHandler(null); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerShowHandler({}); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerShowHandler(""); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerShowHandler(1); }).toThrow();
            });

            it("The handler is called everytime a notification is shown", function() {
                var callCount = 0;

                gsoft.widgets.notifier.registerShowHandler(function() {
                    callCount += 1;
                });

                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();
                gsoft.widgets.notifier.show("error");

                expect(callCount).toBe(2);
            });

            it("The handler is called with the notification id", function() {
                var notificationId = null;

                gsoft.widgets.notifier.registerShowHandler(function(id) {
                    notificationId = id;
                });

                gsoft.widgets.notifier.show("error");

                expect(notificationId).toBe("error");
            });

            it("The handler is called with the notification options", function() {
                var notificationOptions = null;

                gsoft.widgets.notifier.registerShowHandler(function(id, options) {
                    notificationOptions = options;
                });

                gsoft.widgets.notifier.show("error");

                expect(notificationOptions).not.toBeNull(notificationOptions);
            });
        });

        describe("registerHideHandler", function() {
            afterEach(function() {
                gsoft.widgets.notifier._hideHandlers = [];
            });

            it("When the handler parameter is not a function, throw an exception", function() {
                expect(function() { gsoft.widgets.notifier.registerHideHandler(null); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerHideHandler({}); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerHideHandler(""); }).toThrow();
                expect(function() { gsoft.widgets.notifier.registerHideHandler(1); }).toThrow();
            });

            it("The handler is called everytime a notification is shown", function() {
                var callCount = 0;

                gsoft.widgets.notifier.registerShowHandler(function() {
                    callCount += 1;
                });

                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();
                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();

                expect(callCount).toBe(2);
            });

            it("The handler is called with the notification id", function() {
                var notificationId = null;

                gsoft.widgets.notifier.registerShowHandler(function(id) {
                    notificationId = id;
                });

                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();

                expect(notificationId).toBe("error");
            });

            it("The handler is called with the notification options", function() {
                var notificationOptions = null;

                gsoft.widgets.notifier.registerShowHandler(function(id, options) {
                    notificationOptions = options;
                });

                gsoft.widgets.notifier.show("error");
                gsoft.widgets.notifier.hide();

                expect(notificationOptions).not.toBeNull(notificationOptions);
            });
        });
    });
})(jQuery,
   test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline