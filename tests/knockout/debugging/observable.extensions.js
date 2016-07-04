(function(dataSampler) {
    "use strict";
    
    describe("ko.observable.fn.toString", function() {
        it("Use the expected format", function() {
            var value = dataSampler.generateString(10);
            var obs = ko.observable(value);
            
            expect(obs.toString()).toBe("observable: \"" + value + "\"");
        });
    });
    
    describe("ko.computed.fn.toString", function() {
        it("Use the expected format", function() {
            var value = dataSampler.generateString(10);
            
            var obs = ko.computed(function() {
                return value;
            });
            
            expect(obs.toString()).toBe("computed: \"" + value + "\"");
        });
    });
    
    describe("ko.observableArray.fn.toString", function() {
        it("Use the expected format", function() {
            var value = dataSampler.generateString(10);
            var obs = ko.observableArray([value]);
            
            expect(obs.toString()).toBe("observableArray: [\"" + value + "\"]");
        });
    });
    
    describe("ko.subscribable.fn.log", function() {
        beforeEach(function() {
            spyOn(gsoft.utils, "trace");
        });
        
        it("Can ouput a regular observable to the console", function() {
            var obs = ko.observable(dataSampler.generateString(10));
            obs.log();
            
            expect(gsoft.utils.trace).toHaveBeenCalledWith(obs);
        });
        
        it("Can ouput a computed observable to the console", function() {
            var obs = ko.computed(function() {
                return dataSampler.generateString(10);
            });
            
            obs.log();
            
            expect(gsoft.utils.trace).toHaveBeenCalledWith(obs);
        });
        
        it("Can ouput an observable array to the console", function() {
            var obs = ko.observableArray([dataSampler.generateString(10)]);
            obs.log();
            
            expect(gsoft.utils.trace).toHaveBeenCalledWith(obs);
        });
        
        it("Returns the observable", function() {
            var obs = ko.observable(dataSampler.generateString(10));
            var returnedValue = obs.log();
            
            expect(returnedValue).toBe(obs);
        });
    });
    
    describe("ko.subscribable.fn.logChanges", function() {
        it("When the observable value changed, output the new value to the console", function() {
            var messages = [];
            
            var value1 = dataSampler.generateString(10);
            var value2 = dataSampler.generateString(10);
            
            spyOn(gsoft.utils, "trace").and.callFake(function(message) {
                messages.push(message);
            });
            
            var obs = ko.observable().logChanges();
            
            obs(value1);
            obs(value2);
            
            expect(messages.length).toBe(2);
            expect(messages[0]).toContain(value1);
            expect(messages[1]).toContain(value2);
        });
        
        it("When the observable value changed, increment the count", function() {
            var messages = [];
            
            var value1 = dataSampler.generateString(10);
            var value2 = dataSampler.generateString(10);
            
            spyOn(gsoft.utils, "trace").and.callFake(function(message) {
                messages.push(message);
            });
            
            var obs = ko.observable().logChanges();
            
            obs(value1);
            obs(value2);
            
            expect(messages.length).toBe(2);
            expect(messages[0][0]).toBe("1");
            expect(messages[1][0]).toBe("2");
        });
        
        it("Returns the observable", function() {
            spyOn(gsoft.utils, "trace");
            
            var obs = ko.observable(dataSampler.generateString(10));
            var returnedValue = obs.logChanges();
            
            expect(returnedValue).toBe(obs);
        });
    });
})(test.dataSampler);