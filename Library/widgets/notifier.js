(function($, utils, ensure) {
    "use strict";

    var notifier = gsoft.widgets.notifier = {
        templates: {},

        _showHandlers: [],
        _hideHandlers: [],
        _current: null,

        // summary:
        //        Show a notification with the "loading" template.
        // options: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        loading: function(options) {
            this.show("loading", options);
        },

        // summary:
        //        Show a notification with the "error" template.
        // options: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        error: function(options) {
            this.show("error", options);
        },

        // summary:
        //        Show a notification with the "saving" template.
        // options: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        saving: function(options) {
            this.show("saving", options);
        },

        // summary:
        //        Show a notification with the "saved" template.
        // options: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        saved: function(options) {
            this.show("saved", options);
        },

        // summary:
        //        Show a notification.
        // id: String
        //        The id of the notification. It must match an existing template id that has been registred prior to the call.
        // options: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        show: function(id, userOptions) {
            ensure(id, "id").isNotNullOrEmpty();

            if (!utils.isString(id)) {
                throw new gsoft.ArgumentError("Notifier.show - The parameter \"id\" should be a string.");
            }

            var defaultOptions = this.templates[id];

            if (utils.isNull(defaultOptions)) {
                defaultOptions = {};
            }

            var options = defaultOptions;

            if (!utils.isNull(userOptions)) {
                options = $.extend({}, defaultOptions, userOptions);
            }

            ensure(options.position, "userOptions.position", "Notifier.show").isNotNullOrEmpty();
            ensure(options.html, "userOptions.html", "Notifier.show").isNotNullOrEmpty();

            if (utils.isNull(options.priority)) {
                options.priority = 1;
            }

            if (!this._isCurrentNotification(id)) {
                if (this._hasEqualOrHigherPriority(options.priority)) {
                    var that = this;

                    this.forceHide();

                    this._clearDeferredShowTimeout();

                    this._current = {
                        id: id,
                        options: options,
                        showCount: 0,
                        overlayElement: null,
                        notificationElement: null,
                        deferredShowTimeoutId: null,
                        lifetimeTimeoutIds: [],
                    };

                    var showNotification = function() {
                        that._render(options);
                        that._bindEvents(options);
                        that._setupLifetime(options);

                        that._callShowHandlers();

                        that._current.showCount += 1;
                    };

                    if (!this._isDeferred(options)) {
                        showNotification();
                    } else {
                        this._current.deferredShowTimeoutId = setTimeout(function() {
                            showNotification();

                            that._clearDeferredShowTimeout();
                        }, options.deferred);
                    }
                }
            } else {
                // HACK: support multiple calls to the same notification type to increase the lifetime of the notification.
                if (options.lifetime > 0) {
                    this._setupLifetime(options);
                    this._current.showCount += 1;
                }
            }
        },

        _isCurrentNotification: function(id) {
            if (!utils.isNull(this._current)) {
                if (this._current.id === id) {
                    return true;
                }
            }

            return false;
        },

        _hasEqualOrHigherPriority: function(priority) {
            if (!utils.isNull(this._current)) {
                if (priority >= this._current.options.priority) {
                    return true;
                }
            } else {
                return true;
            }

            return false;
        },

        _isDeferred: function(options) {
            if (!utils.isNull(options.deferred)) {
                return options.deferred > 0;
            }

            return false;
        },

        _render: function(options) {
            if (!utils.isNull(options.modal) && options.modal !== false) {
                this._current.overlayElement = this._renderOverlayElement(options);
            }

            this._current.notificationElement = this._renderNotificationElement(options);
        },

        _renderNotificationElement: function(options) {
            // Maximum z-index value - 9.
            var zIndex = "2147483638";

            var element = $("<div></div>")
                .html(this._extrapolateHtml(options))
                .addClass(options.cssClasses)
                .css({
                    "position": "fixed",
                    "z-index": zIndex
                });

            if (options.hideOnClick === true) {
                element.css("cursor", "pointer");
            }

            $("body").append(element);

            var position = this._getNotificationPosition(options, element);

            for (var i = 0, max = position.length; i < max; i += 1) {
                element.css(position[i][0], position[i][1]);
            }

            return element;
        },

        _extrapolateHtml: function(options) {
            return options.html.replace("{text}", options.text);
        },

        _getNotificationPosition: function(options, element) {
            if (options.position === "center") {
                var dimensions = this._getWindowDimensions();

                var top = Math.round(dimensions.height / 2) - Math.round(element.outerHeight(true) / 2);
                var left = Math.round(dimensions.width / 2) - Math.round(element.outerWidth(true) / 2);

                return [
                    ["top", top],
                    ["left", left]
                ];
            } else if (options.position === "bottom-right") {
                return [
                    ["bottom", "10px"],
                    ["right", "10px"]
                ];
            } else if (options.position === "top-right") {
                return [
                    ["top", "10px"],
                    ["right", "10px"]
                ];
            } else {
                if (!utils.isArray(options.position)) {
                    throw new gsoft.ArgumentError("Notifier._getNotificationPosition - Unknown position.");
                }

                var positions = [];

                for (var i = 0, max = options.position.length; i < max; i += 1) {
                    var value = options.position[i][1];

                    positions.push([options.position[i][0], utils.isFunction(value) ? value(element) : value]);
                }

                return positions;
            }
        },

        _renderOverlayElement: function(options) {
            var dimensions = this._getWindowDimensions();

            // Maximum z-index value - 10.
            var zIndex = "2147483637";

            var element = $("<div></div>")
                .css({
                    "width": dimensions.width,
                    "height": dimensions.height,
                    "position": "fixed",
                    "left": "0px",
                    "top": "0px",
                    "padding": "0",
                    "margin": "0",
                    "z-index": zIndex,
                    "overflow": "hidden"
                });

            if (utils.isObject(options.modal)) {
                if (!utils.isNullOrEmpty(options.modal.overlayCssClasses)) {
                    element.addClass(options.modal.overlayCssClasses);
                }
            }

            $("body").append(element);

            return element;
        },

        _getWindowDimensions: function() {
            return {
                width: $(window).width(),
                height: $(window).height()
            };
        },

        _bindEvents: function(options) {
            var that = this;

            $(window).on("resize.gsoft.notifier", function() {
                 that._resize(options);
            });

            if (options.hideOnClick === true) {
                this._current.notificationElement.on("click.gsoft.notifier", function(e) {
                    e.preventDefault();
                    that.forceHide();
                });
            }

            if ($(".btn-close", this._current.notificationElement).length > 0) {
                $(".btn-close", this._current.notificationElement).on("click.gsoft.notifier", function(e) {
                    e.preventDefault();
                    that.forceHide();
                });
            }
        },

        _resize: function(options) {
            var dimensions = this._getWindowDimensions();

            if (!utils.isNull(this._current.overlayElement)) {
                this._current.overlayElement.css({
                    width: dimensions.width,
                    height: dimensions.height
                });
            }

            if (!utils.isNull(this._current.notificationElement)) {
                var position = this._getNotificationPosition(options, this._current.notificationElement);

                for (var i = 0, max = position.length; i < max; i += 1) {
                    this._current.notificationElement.css(position[i][0], position[i][1]);
                }
            }
        },

        _setupLifetime: function(options) {
            if (options.lifetime > 0) {
                var that = this;

                var timeoutId = setTimeout(function() {
                    that.hide();
                }, options.lifetime);

                this._current.lifetimeTimeoutIds.push(timeoutId);
            }
        },

        // summary:
        //        Hide the current notification.
        hide: function() {
            if (!utils.isNull(this._current)) {
                if (this._current.showCount > 0) {
                    this._current.showCount -= 1;
                }

                if (this._current.showCount === 0) {
                    this.forceHide();
                }
            }
        },

        // summary:
        //        Hide the current notification.
        forceHide: function() {
            if (!utils.isNull(this._current)) {
                this._callHideHandlers();

                this._unbindEvents();
                this._removeElements();
                this._clearTimeouts();

                this._current = null;
            }
        },

        _unbindEvents: function() {
            $(window).off("resize.gsoft.notifier");

            if (this._current.options.hideOnClick === true) {
                if (!utils.isNull(this._current.notificationElement)) {
                    this._current.notificationElement.off("click.gsoft.notifier");
                }
            }

            if ($(".btn-close", this._current.notificationElement).length > 0) {
                this._current.notificationElement.off("click.gsoft.notifier");
            }
        },

        _removeElements: function() {
            if (!utils.isNull(this._current.notificationElement)) {
                this._current.notificationElement.remove();
                this._current.notificationElement = null;
            }
        
            if (!utils.isNull(this._current.overlayElement)) {
                this._current.overlayElement.remove();
                this._current.overlayElement = null;
            }
        },

        _clearTimeouts: function() {
            this._clearDeferredShowTimeout();
            this._clearLifetimeTimeouts();
        },

        _clearDeferredShowTimeout: function() {
            if (!utils.isNull(this._current)) {
                if (!utils.isNull(this._current.deferredShowTimeoutId)) {
                    clearTimeout(this._current.deferredShowTimeoutId);

                    this._current.deferredShowTimeoutId = null;
                }
            }
        },

        _clearLifetimeTimeouts: function() {
            for (var i = 0, max = this._current.lifetimeTimeoutIds; i < max; i += 1) {
                clearTimeout(this._current.lifetimeTimeoutIds[i]);
            }

            this._current.lifetimeTimeoutIds = [];
        },

        // summary:
        //        Register a new notification template.
        // id: String
        //        The id of the notification.
        // defaultOptions: Object
        //        position: String or 2 dimensions Array
        //             Indicate where the notification will be position at on the screen. 
        //             If the value is a String, the built in positions are: "center", "top-right" and "bottom-right".
        //             If the value is a 2 dimensions Array, the format is:
        //                 [
        //                     ["top" or "bottom", a value in pixels like "100px" or a function that return a value in pixels],
        //                     ["left" or "right", a value in pixels like "100px" or a function that return a value in pixels]
        //                 ]
        //        deferred: Integer
        //             Delay in milliseconds to wait before showing the notification. To immediatly show the notification, set the value as null or 0.
        //        lifetime: Integer
        //             Time in milliseconds that the notification will lasts. To show a "sticky" notification, set the value as 0.
        //        html: String
        //             The HTML template to render. If the HTML template contains the token "{text}", it will be replace by @text.
        //        text: String
        //             The text to display.
        //        cssClasses: String
        //             The CSS classes to set on the notification container element.
        //        modal: Boolean or Object
        //             If the value is undefined, null or false, the notification will not be show has a modal.
        //             If the value is true or an object the notification will be show has a modal.
        //             If the value is an object, the following properties are available:
        //                 overlayCssClasses: String
        //                     The CSS classes to set on the notification overlay element.
        //        hideOnClick: Boolean
        //             True to hide the notification when a click event occurs, false otherwise.
        //        priority: Integer
        //             Only one notificatiom at a time can be show. A notification with an equal or higher priority will replace a notification that is currently shown.   
        //             The default value is 1.
        registerNotificationTemplate: function(id, defaultOptions) {
            ensure(id, "id", "Notifier.registerNotificationTemplate").isNotNullOrEmpty();
            ensure(defaultOptions, "defaultOptions", "Notifier.registerNotificationTemplate").isNotNull();
            ensure(defaultOptions.position, "defaultOptions.position", "Notifier.registerNotificationTemplate").isNotNullOrEmpty();
            ensure(defaultOptions.html, "defaultOptions.html", "Notifier.registerNotificationTemplate").isNotNullOrEmpty();

            this.templates[id] = $.extend({}, defaultOptions);
        },

        // summary:
        //        Register an handler that will be called everytime a notification is shown.
        // handler: Function
        //        An handler to call everytime a notification is shown.
        registerShowHandler: function(handler) {
            ensure(handler, "handler", "Notifier.registerShowHandler").isFunction();

            this._showHandlers.push(handler);
        },

        // summary:
        //        Register an handler that will be called everytime a notification is hidden.
        // handler: Function
        //        An handler to call everytime a notification is hidden.
        registerHideHandler: function(handler) {
            ensure(handler, "handler", "Notifier.registerHideHandler").isFunction();

            this._hideHandlers.push(handler);
        },

        _callShowHandlers: function() {
            for (var i = 0, max = this._showHandlers.length; i < max; i += 1) {
                this._showHandlers[i](this._current.id, this._current.options);
            }
        },

        _callHideHandlers: function() {
            for (var i = 0, max = this._hideHandlers.length; i < max; i += 1) {
                this._hideHandlers[i](this._current.id, this._current.options);
            }
        }
    };

    // ---------------------------------

    notifier.registerNotificationTemplate("loading", {
        position: "center",
        deferred: 150,
        lifetime: 0,
        html: "<div>{text}</div>",
        text: "Loading...",
        cssClasses: "g-notifier-loading",
        modal: {
            overlayCssClasses: "g-notifier-loading-overlay"
        },
        hideOnClick: false,
        priority: 100
    });

    notifier.registerNotificationTemplate("error", {
        position: [
            ["top", "100px"],
            ["left", function(element) {
                var value = Math.round($(window).width() / 2) - Math.round(element.outerWidth(true) / 2);

                return value;
            }]
        ],
        lifetime: 0,
        html: "<div>{text}</div>",
        text: "Error",
        cssClasses: "g-notifier-error",
        modal: {
            overlayCssClasses: "g-notifier-error-overlay"
        },
        hideOnClick: false,
        priority: 9999
    });

    notifier.registerNotificationTemplate("saving", {
        position: "bottom-right",
        deferred: 150,
        lifetime: 0,
        html: "<div>{text}</div>",
        text: "Saving...",
        cssClasses: "g-notifier-saving",
        modal: false,
        hideOnClick: false,
        priority: 2
    });

    notifier.registerNotificationTemplate("saved", {
        position: "bottom-right",
        lifetime: 5 * 1000,
        html: "<div>{text}</div>",
        text: "Saved!",
        cssClasses: "g-notifier-saved",
        modal: false,
        hideOnClick: true,
        priority: 2
    });
})(jQuery,
   gsoft.utils,
   gsoft.ensure);