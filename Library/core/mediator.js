// Mediator
// ---------------------------------

(function(utils, ensure) {
    // summary:
    //          Publish / subscribe message pattern implementation.
    // example:
    //          gsoft.mediator.subscribe("channel");
    //          gsoft.mediator.publish("channel", "value");
    gsoft.mediator = {
        DEFAULT_PRIORITY: 4,
        
        _registry: {},
        
        // summary:
        //          Subscribe to a @channel. Everytime an event is published to that @channel 
        //          the @callback will be called with the event value.
        // channel: String
        //          A channel to suscribe to.
        // callback: Function
        //          An handler to call when an event is published on the @channel.
        // options: Object
        //          An optional object with options. Options can be:
        //             - priority: The subscriber priority. A subscriber with an higher will be notified
        //               before a subscriber with a lower priority.
        // returns:
        //         An object that contains informations about the subscription and a function to 
        //         unsuscribe from the @channel.
        subscribe: function(channel, callback /* options */) {
            ensure(channel, "channel", "Mediator.subscribe").isNotNullOrEmpty();
            ensure(callback, "callback", "Mediator.subscribe").isFunction();
            
            var that = this;
            var options = arguments[2];
            
            var subscription = {
                callback: callback,
                priority: this.DEFAULT_PRIORITY
            };
            
            if (utils.isObject(options)) {
                subscription.priority = options.priority || subscription.priority;
            }
            
            if (!utils.isArray(this._registry[channel])) {
                this._registry[channel] = [];
            }

            this._registry[channel].push(subscription);
            
            // Order subscriptions by priority (higher is better).
            this._registry[channel].sort(function(a, b) {
                return b.priority - a.priority;
            });

            return {
                channel: channel,
                unsubscribe: function() {
                    that.unsubscribe(channel, callback);
                }
            };
        },
        
        // summary:
        //          Subscribe to a @channel for a single event. When the first event is published, the subscriber
        //          will be automatically unsubscribed from the @channel.
        // channel: String
        //          A channel to suscribe to.
        // callback: Function
        //          An handler to call when an event is published on the @channel.
        // options: Object
        //          An optional object with options. Options can be:
        //             - priority: The subscriber priority. A subscriber with an higher will be notified
        //               before a subscriber with a lower priority.
        // returns:
        //         An object that contains informations about the subscription and a function to 
        //         unsuscribe from the @channel.
        subscribeOnce: function(channel, callback /* options */) {
            ensure(channel, "channel", "Mediator.subscribeOnce").isNotNullOrEmpty();
            ensure(callback, "callback", "Mediator.subscribeOnce").isFunction();
            
            var that = this;
            
            var proxy = function() {
                that.unsubscribe(channel, proxy);    
                callback.apply(this, arguments);
            };
            
            return this.subscribe(channel, proxy, arguments[2]);
        },
        
        // summary:
        //          unsubscribe from a @channel.
        // channel: String
        //          A channel to unsubscribe from.
        // callback: Function
        //          A callback function that was specified when the subscription to the @channel
        //          was made.
        unsubscribe: function(channel, callback) {
            ensure(channel, "channel", "Mediator.unsuscribe").isNotNullOrEmpty();
            ensure(callback, "callback", "Mediator.unsuscribe").isFunction();
            
            var registry = this._registry[channel];

            if (utils.isArray(registry)) {
                registry.some(function(subscription, index) {
                    if (subscription.callback === callback) {
                        utils.arrayRemoveAt(registry, index);
                        
                        return true;
                    }
                    
                    return false;
                });
            }
        },
        
        // summary:
        //          Publish a @value to a @channel.
        // channel: String
        //          A channel to publish to.
        // value(s): Object
        //          The value(s) to publish on the @channel.
        publish: function() {
            var result = this._publish.apply(this, arguments);
    
            this._logPublish(result.channel, result.values, result.subscribersCount);
        },

        // summary:
        //          Publish a @value to a @channel without logging to the console.
        // channel: String
        //          A channel to publish to.
        // value(s): Object
        //          The value(s) to publish on the @channel.
        publishSilently: function() {
            this._publish.apply(this, arguments);
        },

        _publish: function(channel /* [value1, value2, ...] */) {
            ensure(channel, "channel", "Mediator.publish").isNotNullOrEmpty();
    
            var subscribersCount = 0;
            var registry = this._registry[channel];
                
            // Retrieve all the values to publish.
            var values = Array.prototype.slice.call(arguments, 1);
        
            if (utils.isArray(registry)) {
                // Cloning the array give the possibility to add or remove a subscription in a publish callback.
                var subscriptions = utils.cloneArray(registry);
                        
                subscriptions.forEach(function(subscription) {
                    subscription.callback.apply(this, values);
                }, this);
    
                subscribersCount = subscriptions.length;
            }

            return {
                channel: channel,
                values: values,
                subscribersCount: subscribersCount
            };
        },

        _logPublish: function(channel, values, subscribersCount) {
            var consoleValues = [
                ["[MEDIATOR] A message has been publish on the channel \"%s\" to %i subscriber(s)", channel, subscribersCount],
                ["Channel: %s", channel],
                ["Number of subscribers: %i", subscribersCount],
                [values]
            ];

            utils.groupTrace(consoleValues);
        }
    };
})(gsoft.utils,
   gsoft.ensure);