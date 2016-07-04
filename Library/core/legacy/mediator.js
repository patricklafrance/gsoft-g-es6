// Mediator
// ---------------------------------

(function($, utils) {
    // summary:
    //          Publish / subscribe message pattern implementation.
    // example:
    //          gsoft.mediator.subscribe("channel");
    //          gsoft.mediator.publish("channel", "value");
    gsoft.mediator = {
        _GLOBAL_CHANNEL: "mediator.global",

        _registry: {},

        // summary:
        //          Subscribe to a @channel. Everytime an event is published to that @channel 
        //          the @callback will be called with the event value.
        // channel: String
        //          An optional channel to suscribe to. If a channel is not specified, the subscribtion
        //          will be made on the global channel.
        // callback: Function
        //          An handler to call when an event is published on the @channel.
        // predicate: Function
        //          An optional function to filter the events published on the @channel for which the
        //          @callback is called.
        // returns:
        //         An object that contains informations about the subscription and a function to 
        //         unsuscribe from the @channel.
        subscribe: function(/* [channel], callback, [predicate] */) {
            var that = this;

            var channel = null;
            var callback = null;
            var predicate = null;

            if ($.isFunction(arguments[0])) {
                channel = this._GLOBAL_CHANNEL;
                callback = arguments[0];
                predicate = arguments[1];
            }
            else {
                channel = arguments[0];
                callback = arguments[1];
                predicate = arguments[2];
            }

            if (!$.isFunction(callback)) {
                throw new Error("\"callback\" must be a function.");
            }

            if (!$.isArray(this._registry[channel])) {
                this._registry[channel] = [];
            }

            this._registry[channel].push({
                callback: callback,
                predicate: predicate
            });

            return {
                channel: channel,
                unsubscribe: function() {
                    that._unsubscribe(channel, callback);
                }
            };
        },

        _unsubscribe: function(channel, callback) {
            var registry = this._registry[channel];

            if ($.isArray(registry)) {
                $.each(registry, function(i) {
                    if (this.callback === callback) {
                        utils.arrayRemoveIndex(registry, i);

                        return false;
                    }
                });
            }
        },

        // summary:
        //          Publish a @value to a @channel.
        // channel: String
        //          An optional channel to publish to. If a channel is not specified, the @value
        //          will be publish on the global channel.
        // value: Object
        //          The value to publish on the @channel.
        publish: function(/* [channel], value */) {
            var channel = null;
            var value = null;

            if (arguments.length > 1) {
                channel = arguments[0];
                value = arguments[1];
            } else {
                channel = this._GLOBAL_CHANNEL;
                value = arguments[0];
            }

            this._publishToChannel(channel, value);
        },

        _publishToChannel: function(channel, value) {
            var registry = this._registry[channel];

            if ($.isArray(registry)) {
                $.each(utils.cloneArray(registry), function() {
                    if (utils.isNull(this.predicate) || this.predicate(value)) {
                        this.callback(value);
                    }
                });
            }
        }
    };
})(jQuery, 
   gsoft.utils);