// jscs:disable requireBlocksOnNewline

(function($, dataSampler, undefined) {
    "use strict";

    describe("mediator", function() {
        describe("subscribe", function() {
            it("When callback is not a function, throw an exception", function() {
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), null); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), undefined); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), {}); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), dataSampler.generateString(10)); }).toThrow();
            });

            it("When a channel is specified, subscribe only to this specific channel", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);

                gsoft.mediator.subscribe(dataSampler.generateString(10), function() {
                    count -= 1;
                });

                gsoft.mediator.subscribe(channel, function() {
                    count += 1;
                });

                gsoft.mediator.publish(channel, dataSampler.generateString(10));
                gsoft.mediator.publish(dataSampler.generateString(10));
                gsoft.mediator.publish(channel, dataSampler.generateString(10));
                gsoft.mediator.publish(dataSampler.generateString(10), dataSampler.generateString(10));
                gsoft.mediator.publish(dataSampler.generateString(10), dataSampler.generateString(10));

                expect(count).toBe(2);
            });

            it("When a channel is not specified, subscribe to the global channel", function() {
                var works = false;

                gsoft.mediator.subscribe(function() {
                    works = true;
                });

                gsoft.mediator.publish(gsoft.mediator._GLOBAL_CHANNEL, dataSampler.generateString(10));

                expect(works).toBeTruthy();
            });

            it("When a predicate is specified, callback is only call if the predicate is matched.", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                var data = dataSampler.generateString(10);

                var incrementCount = function() { count += 1; };
                var decrementCount = function() { count -= 1; };

                gsoft.mediator.subscribe(channel, incrementCount, function(value) {
                    return value === data;
                });

                gsoft.mediator.subscribe(channel, decrementCount, function(value) {
                    return value !== data;
                });

                gsoft.mediator.subscribe(channel, incrementCount);

                gsoft.mediator.publish(channel, data);

                expect(count).toBe(2);
            });

            describe("Always returns an object having the subscription", function() {
                it("Channel", function() {
                    var channel = dataSampler.generateString(10);
                    var subscription = gsoft.mediator.subscribe(channel, $.noop);

                    expect(subscription.channel).toBe(channel);
                });

                it("Unsubscribe function", function() {
                    var subscription = gsoft.mediator.subscribe(dataSampler.generateString(10), $.noop);

                    expect($.isFunction(subscription.unsubscribe)).toBeTruthy();
                });
            });

            it("When unsubscribed from a channel, the callback is not called when a publish happens on the channel", function() {
                var works = true;
                var channel = dataSampler.generateString(10);

                var subscription = gsoft.mediator.subscribe(channel, function() {
                    works = false;
                });

                subscription.unsubscribe();

                gsoft.mediator.publish(channel, dataSampler.generateString(10));

                expect(works).toBeTruthy();
            });

            describe("When there is multiple subscriptions on the same channel", function() {
                var channel = null;
                var subscription1 = null;
                var subscription2 = null;
                var subscription3 = null;
                var subscription1Count = 0;
                var subscription2Count = 0;
                var subscription3Count = 0;

                beforeEach(function() {
                    channel = dataSampler.generateString(10);

                    subscription1 = gsoft.mediator.subscribe(channel, function() {
                        subscription1Count += 1;
                    });

                    subscription2 = gsoft.mediator.subscribe(channel, function() {
                        subscription2Count += 1;
                    });

                    subscription3 = gsoft.mediator.subscribe(channel, function() {
                        subscription3Count += 1;
                    });
                });

                it("Can unsubscribe from all", function() {
                    subscription1.unsubscribe();
                    subscription2.unsubscribe();
                    subscription3.unsubscribe();
                    
                    expect(gsoft.mediator._registry[channel].length).toBe(0);
                });

                it("Subscribe always remove the good right subscription", function() {
                    subscription3.unsubscribe();

                    gsoft.mediator.publish(channel, dataSampler.generateString(10));

                    expect(subscription1Count).toBe(1);
                    expect(subscription2Count).toBe(1);
                    expect(subscription3Count).toBe(0);
                });

                it("When a subscriber remove his subscription during a publish, no error occurs", function() {
                    var subscription4 = gsoft.mediator.subscribe(channel, function() {
                        subscription4.unsubscribe();
                    });

                    // This is the one that should fail.
                    gsoft.mediator.subscribe(channel, $.noop);

                    gsoft.mediator.publish(channel, dataSampler.generateString(10));

                    expect(gsoft.mediator._registry[channel].length).toBe(4);
                });
            });
        });

        describe("publish", function() {
            it("When a channel is specified, publish only to the specified channel", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);

                gsoft.mediator.subscribe(dataSampler.generateString(10), function() {
                    count -= 1;
                });

                gsoft.mediator.subscribe(channel, function() {
                    count += 1;
                });

                gsoft.mediator.publish(channel, dataSampler.generateString(10));

                expect(count).toBe(1);
            });

            it("When no channel is specified, publish only to the global channel", function() {
                var count = 0;

                gsoft.mediator.subscribe(dataSampler.generateString(10), function() {
                    count -= 1;
                });

                gsoft.mediator.subscribe(function() {
                    count += 1;
                });

                gsoft.mediator.publish(dataSampler.generateString(10));

                expect(count).toBe(1);
            });
        });
    });
})(jQuery,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline