// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler) {
    "use strict";
    
    describe("mediator", function() {
        describe("subscribe", function() {
            it("When channel is null or empty, throw an exception", function() {
                expect(function() { gsoft.mediator.subscribe(null, helpers.noop); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(undefined, helpers.noop); }).toThrow();
                expect(function() { gsoft.mediator.subscribe("", helpers.noop); }).toThrow();
            });

            it("When callback is not a function, throw an exception", function() {
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), null); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), undefined); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), {}); }).toThrow();
                expect(function() { gsoft.mediator.subscribe(dataSampler.generateString(10), dataSampler.generateString(10)); }).toThrow();
            });

            it("Can subscribe to a channel", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);

                gsoft.mediator.subscribe(dataSampler.generateString(10), function() {
                    count -= 1;
                });

                gsoft.mediator.subscribe(channel, function() {
                    count += 1;
                });

                gsoft.mediator.publish(channel);
                gsoft.mediator.publish(dataSampler.generateString(10));
                gsoft.mediator.publish(channel);
                gsoft.mediator.publish(dataSampler.generateString(10));
                gsoft.mediator.publish(dataSampler.generateString(10));

                expect(count).toBe(2);
            });

            it("When a priority is specified, the subscribers are notified using the priority order from higher to lower", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                
                gsoft.mediator.subscribe(channel, function() {
                    expect(count).toBe(2);
                    count += 1;
                }, { priority: 1 });
                
                gsoft.mediator.subscribe(channel, function() {
                    expect(count).toBe(0);
                    count += 1;
                }, { priority: 9 });
                
                gsoft.mediator.subscribe(channel, function() {
                    expect(count).toBe(1);
                    count += 1;
                }, { priority: 4 });
                
                gsoft.mediator.publish(channel);
                
                expect(count).toBe(3);
            });
            
            it("When the priority is not specified, the subscription priority should be the default priority", function() {
                var channel = dataSampler.generateString(10);
                
                gsoft.mediator.subscribe(channel, helpers.noop);
                
                expect(gsoft.mediator._registry[channel][0].priority).toBe(gsoft.mediator.DEFAULT_PRIORITY);
            });
            
            describe("Returns an object having the subscription", function() {
                it("Channel", function() {
                    var channel = dataSampler.generateString(10);
                    var subscription = gsoft.mediator.subscribe(channel, helpers.noop);
    
                    expect(subscription.channel).toBe(channel);
                });
    
                it("Unsubscribe function", function() {
                    var subscription = gsoft.mediator.subscribe(dataSampler.generateString(10), helpers.noop);
    
                    expect(helpers.isFunction(subscription.unsubscribe)).toBeTruthy();
                });
            });

            it("When a subscriber unsubscribe from a channel, the subscriber is not called when an event is published on the channel", function() {
                var works = true;
                var channel = dataSampler.generateString(10);

                var subscription = gsoft.mediator.subscribe(channel, function() {
                    works = false;
                });

                subscription.unsubscribe();

                gsoft.mediator.publish(channel);

                expect(works).toBeTruthy();
            });

            describe("When there is multiple subscribers on the same channel", function() {
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
                
                it("Can unsubscribe from all the subscribers", function() {
                    subscription1.unsubscribe();
                    subscription2.unsubscribe();
                    subscription3.unsubscribe();
                    
                    expect(gsoft.mediator._registry[channel].length).toBe(0);
                });

                it("Only the specified subscriber is unsubscribed", function() {
                    subscription3.unsubscribe();

                    gsoft.mediator.publish(channel, dataSampler.generateString(10));

                    expect(subscription1Count).toBe(1);
                    expect(subscription2Count).toBe(1);
                    expect(subscription3Count).toBe(0);
                });

                it("Can unsubscribe a subscriber in a callback function", function() {
                    var subscription4 = gsoft.mediator.subscribe(channel, function() {
                        subscription4.unsubscribe();
                    });

                    // This is the subscriber that should fail.
                    gsoft.mediator.subscribe(channel, helpers.noop);
                    gsoft.mediator.publish(channel, dataSampler.generateString(10));

                    expect(gsoft.mediator._registry[channel].length).toBe(4);
                });
            });
        });
        
        describe("subscribeOnce", function() {
            it("When the subscriber is notified, he is automatically unsubscribed from the channel", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                
                gsoft.mediator.subscribeOnce(channel, function() {
                    count += 1;
                });
                
                gsoft.mediator.publish(channel);
                gsoft.mediator.publish(channel);
                gsoft.mediator.publish(channel);
                
                expect(count).toBe(1);
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
            
            it("Can publish a single value", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                var expectedValue = dataSampler.generateString(10);

                gsoft.mediator.subscribe(channel, function(value) {
                    if (value === expectedValue) {
                        count += 1;
                    }
                });

                gsoft.mediator.publish(channel, expectedValue);

                expect(count).toBe(1);
            });
            
            it("Can publish multiple values", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                var expectedValues = [dataSampler.generateString(10), dataSampler.generateString(10)];
                
                gsoft.mediator.subscribe(channel, function(value1, value2) {
                    if (value1 === expectedValues[0] && value2 === expectedValues[1]) {
                        count += 1;
                    }
                });

                gsoft.mediator.publish(channel, expectedValues[0], expectedValues[1]);

                expect(count).toBe(1);
            });
            
            it("Can publish without a value", function() {
                var count = 0;
                var channel = dataSampler.generateString(10);
                
                gsoft.mediator.subscribe(channel, function() {
                    count += 1;
                });

                gsoft.mediator.publish(channel);

                expect(count).toBe(1);
            });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline