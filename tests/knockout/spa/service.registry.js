// jscs:disable requireBlocksOnNewline

(function(dataSampler, helpers) {
    "use strict";
    
    describe("spa.serviceRegistry", function() {
        describe("add", function() {
            it("When the service name is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.serviceRegistry.add("", helpers.noop()); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.add(null, helpers.noop()); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.add(undefined, helpers.noop()); }).toThrow();
            });
            
            it("When the service factory is not a function, throw an exception", function() {
                expect(function() { gsoft.spa.serviceRegistry.add(dataSampler.generateString(10), dataSampler.generateString(10)); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.add(dataSampler.generateString(10), null); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.add(dataSampler.generateString(10), undefined); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.add(dataSampler.generateString(10), {}); }).toThrow();
            });
            
            it("Can add a service", function() {
                var serviceName = dataSampler.generateString(10);
                var factory = helpers.noop;

                gsoft.spa.serviceRegistry.add(serviceName, factory);

                expect(gsoft.spa.serviceRegistry._services[serviceName]).toBe(factory);
            });
        });
        
        describe("find", function() {
            it("When the service name is null or empty, throw an exception", function() {
                expect(function() { gsoft.spa.serviceRegistry.find(""); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.find(null); }).toThrow();
                expect(function() { gsoft.spa.serviceRegistry.find(undefined); }).toThrow();
            });
            
            it("When the service is registered, returns the service factory", function() {
                var serviceName = dataSampler.generateString(10);
                var service = dataSampler.generateString(10);
                
                var factory = function() {
                    return service;
                };
                
                gsoft.spa.serviceRegistry.add(serviceName, factory);
                
                expect(gsoft.spa.serviceRegistry.find(serviceName)()).toBe(service);
            });
            
            it("When the service is not registered, returns null", function() {
                var service = gsoft.spa.serviceRegistry.find(dataSampler.generateString(10));
                
                expect(service).toBeNull();
            });
        });
    });
})(test.dataSampler,
   test.helpers);

// jscs:enable requireBlocksOnNewline