// jscs:disable requireBlocksOnNewline

(function(helpers, dataSampler) {
    "use strict";
    
    describe("spa.services.http", function() {
        var httpService = null;
        
        beforeEach(function() {
            helpers.ajax.install();
            httpService = gsoft.spa.services.http(gsoft.spa.shell);
        });
        
        afterEach(function() {
            helpers.ajax.uninstall();
        });
        
        describe("get", function() {
            it("When the options object is null, throw an exception", function() {
                expect(function() { httpService.get(null); }).toThrow();
                expect(function() { httpService.get(undefined); }).toThrow();
            });
            
            it("When the url is null or empty, throw an exception", function() {
                expect(function() { httpService.get({ url: "" }); }).toThrow();
                expect(function() { httpService.get({ url: null }); }).toThrow();
                expect(function() { httpService.get({ url: undefined }); }).toThrow();
            });

            it("When the content-type is specified, use the specified content-type", function() {
                var contentType = "text/html";
                
                httpService.get({ 
                    url: dataSampler.generateString(10),
                    contentType: contentType
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe(contentType);
            });
            
            it("When the content-type is not specified, set the content-type as JSON", function() {
                httpService.get({ 
                    url: dataSampler.generateString(10)
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe("application/json");
            });
            
            it("When the cache option is specified, use the specified cache option", function() {
                httpService.get({ 
                    url: dataSampler.generateString(10),
                    cache: true
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.url.indexOf("?_")).toBe(-1);
            });
            
            it("When the cache option is not specified, do not cache the request", function() {
                httpService.get({ 
                    url: dataSampler.generateString(10)
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.url.indexOf("?_")).not.toBe(-1);
            });
            
            it("The request type is GET", function() {
                httpService.get({ 
                    url: dataSampler.generateString(10)
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(request.method).toBe("GET");
            });
            
            describe("Before sending the request", function() {           
                it("When a beforeSend handler is specified, call the specified handler", function() {
                    var callCount = 0;
                    
                    httpService.get({ 
                        url: dataSampler.generateString(10),
                        beforeSend: function() {
                            callCount += 1;
                        }
                    });
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpBeforeRequest, function() {
                        callCount += 1;
                    });
                    
                    httpService.get({ 
                        url: dataSampler.generateString(10)
                    });
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request completed successfully", function() {
                it("When a responseFilter is specified, use the specified filter to filter the request result", function() {
                    var wasFiltered = false;
                    var param1Value = dataSampler.generateString(10);
                    var data = "{\"param1\":\"" + param1Value + "\"}";
                    
                    var promise = httpService.get({ 
                        url: dataSampler.generateString(10),
                        responseFilter: function(response) {
                            return response.data;
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasFiltered = data.param1.peek() === param1Value;
                    });
                    
                    expect(wasFiltered).toBeTruthy();
                });
                
                it("When mapResponseToObservables is not false, map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.get({ 
                        url: dataSampler.generateString(10)
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeTruthy();
                });
                
                it("When mapResponseToObservables is false, do not map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.get({ 
                        url: dataSampler.generateString(10),
                        mapResponseToObservables: false
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeFalsy();
                });

                it("When mapping options are specified, apply them", function() {
                    var wasUsed = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.get({ 
                        url: dataSampler.generateString(10),
                        mapResponseToObservables: {
                            extend: {
                                "{root}": function(obj) {
                                    obj.params2 = "extended data";

                                    return obj;
                                }
                            }
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data2) {
                        wasUsed = data2.params2 === "extended data";
                    });

                    expect(wasUsed).toBeTruthy();
                });
                
                it("Publish a success notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.get({ 
                        url: dataSampler.generateString(10)
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a completed notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.get({ 
                        url: dataSampler.generateString(10)
                    });
                    
                    helpers.ajax.setupSuccessfulGetResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request failed", function() {
                it("Publish a notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function() {
                        callCount += 1;
                    });
                    
                    httpService.get({ 
                        url: dataSampler.generateString(10)
                    });
                    
                    helpers.ajax.setupFailGetResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
                
                describe("The mediator notification has", function() {
                    it("gsoft.spa.Service.Http as source", function() {
                        var hasSource = false;
                    
                        gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                            hasSource = error.source === gsoft.spa.Service.Http;
                        });

                        httpService.get({ 
                            url: dataSampler.generateString(10)
                        });

                        helpers.ajax.setupFailGetResponse("{}");

                        expect(hasSource).toBeTruthy();
                    });
                    
                    it("RequestFailed as errorType", function() {
                        var hasErrorType = false;
            
                        gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                            hasErrorType = error.errorType === "RequestFailed";
                        });

                        httpService.get({ 
                            url: dataSampler.generateString(10)
                        });

                        helpers.ajax.setupFailGetResponse("{}");

                        expect(hasErrorType).toBeTruthy();
                    });
                    
                    it("Data about the request", function() {
                        var hasData = false;
            
                        gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                            hasData = !helpers.isNull(error.data);
                        });

                        httpService.get({ 
                            url: dataSampler.generateString(10)
                        });

                        helpers.ajax.setupFailGetResponse("{}");

                        expect(hasData).toBeTruthy();
                    });
                });
            });
        });

        describe("post", function() {
            it("When the options object is null, throw an exception", function() {
                expect(function() { httpService.post(null); }).toThrow();
                expect(function() { httpService.post(undefined); }).toThrow();
            });
            
            it("When the url is null or empty, throw an exception", function() {
                expect(function() { httpService.post({ url: "", data: {} }); }).toThrow();
                expect(function() { httpService.post({ url: null, data: {} }); }).toThrow();
                expect(function() { httpService.post({ url: undefined, data: {} }); }).toThrow();
            });
            
            it("When the data is null, throw an exception", function() {
                expect(function() { httpService.post({ url: dataSampler.generateString(10), data: null }); }).toThrow();
                expect(function() { httpService.post({ url: dataSampler.generateString(10), data: undefined }); }).toThrow();
            });
            
            it("When the content-type is specified, use the specified content-type", function() {
                var contentType = "text/html";
                
                httpService.post({ 
                    url: dataSampler.generateString(10),
                    data: {},
                    contentType: contentType
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe(contentType);
            });
            
            it("Unmap all the post data observable properties", function() {
                httpService.post({ 
                    url: dataSampler.generateString(10),
                    data: {
                        param1: ko.observable(dataSampler.generateString(10))
                    }
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(ko.isObservable(request.param1)).toBeFalsy();
            });
            
            it("When the content-type is not specified, set the content-type as JSON", function() {
                httpService.post({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe("application/json");
            });
            
            it("The request type is POST", function() {
                httpService.post({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(request.method).toBe("POST");
            });
            
            describe("Before sending the request", function() {    
                it("When a beforeSend handler is specified, call the specified handler", function() {
                    var callCount = 0;
                    
                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        beforeSend: function() {
                            callCount += 1;
                        }
                    });
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpBeforeRequest, function() {
                        callCount += 1;
                    });
                    
                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request completed successfully", function() {
                it("When a responseFilter is specified, use the specified filter to filter the request result", function() {
                    var wasFiltered = false;
                    var param1Value = dataSampler.generateString(10);
                    var data = "{\"param1\":\"" + param1Value + "\"}";
                    
                    var promise = httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        responseFilter: function(response) {
                            return response.data;
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasFiltered = data.param1.peek() === param1Value;
                    });
                    
                    expect(wasFiltered).toBeTruthy();
                });
                
                it("When mapResponseToObservables is not false, map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeTruthy();
                });
                
                it("When mapResponseToObservables is false, do not map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        mapResponseToObservables: false
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeFalsy();
                });

                it("When mapping options are specified, apply them", function() {
                    var wasUsed = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.post({ 
                        url: dataSampler.generateString(10),
                        mapResponseToObservables: {
                            extend: {
                                "{root}": function(obj) {
                                    obj.params2 = "extended data";

                                    return obj;
                                }
                            }
                        },
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasUsed = data.params2 === "extended data";
                    });

                    expect(wasUsed).toBeTruthy();
                });
                
                it("Publish a success notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a completed notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPostResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request failed", function() {
                it("gsoft.spa.Service.Http as source", function() {
                    var hasSource = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasSource = error.source === gsoft.spa.Service.Http;
                    });

                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPostResponse("{}");

                    expect(hasSource).toBeTruthy();
                });

                it("RequestFailed as errorType", function() {
                    var hasErrorType = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasErrorType = error.errorType === "RequestFailed";
                    });

                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPostResponse("{}");

                    expect(hasErrorType).toBeTruthy();
                });

                it("Data about the request", function() {
                    var hasData = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasData = !helpers.isNull(error.data);
                    });

                    httpService.post({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPostResponse("{}");

                    expect(hasData).toBeTruthy();
                });
            });
        });

        describe("put", function() {
            it("When the options object is null, throw an exception", function() {
                expect(function() { httpService.put(null); }).toThrow();
                expect(function() { httpService.put(undefined); }).toThrow();
            });
            
            it("When the url is null or empty, throw an exception", function() {
                expect(function() { httpService.put({ url: "", data: {} }); }).toThrow();
                expect(function() { httpService.put({ url: null, data: {} }); }).toThrow();
                expect(function() { httpService.put({ url: undefined, data: {} }); }).toThrow();
            });
            
            it("When the data is null, throw an exception", function() {
                expect(function() { httpService.put({ url: dataSampler.generateString(10), data: null }); }).toThrow();
                expect(function() { httpService.put({ url: dataSampler.generateString(10), data: undefined }); }).toThrow();
            });
            
            it("When the content-type is specified, use the specified content-type", function() {
                var contentType = "text/html";
                
                httpService.put({ 
                    url: dataSampler.generateString(10),
                    data: {},
                    contentType: contentType
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe(contentType);
            });
            
            it("Unmap all the put data observable properties", function() {
                httpService.put({ 
                    url: dataSampler.generateString(10),
                    data: {
                        param1: ko.observable(dataSampler.generateString(10))
                    }
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(ko.isObservable(request.param1)).toBeFalsy();
            });
            
            it("When the content-type is not specified, set the content-type as JSON", function() {
                httpService.put({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe("application/json");
            });
            
            it("The request type is PUT", function() {
                httpService.put({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(request.method).toBe("PUT");
            });
            
            describe("Before sending the request", function() {    
                it("When a beforeSend handler is specified, call the specified handler", function() {
                    var callCount = 0;
                    
                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        beforeSend: function() {
                            callCount += 1;
                        }
                    });
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpBeforeRequest, function() {
                        callCount += 1;
                    });
                    
                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request completed successfully", function() {
                it("When a responseFilter is specified, use the specified filter to filter the request result", function() {
                    var wasFiltered = false;
                    var param1Value = dataSampler.generateString(10);
                    var data = "{\"param1\":\"" + param1Value + "\"}";
                    
                    var promise = httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        responseFilter: function(response) {
                            return response.data;
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasFiltered = data.param1.peek() === param1Value;
                    });
                    
                    expect(wasFiltered).toBeTruthy();
                });
                
                it("When mapResponseToObservables is not false, map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeTruthy();
                });
                
                it("When mapResponseToObservables is false, do not map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        mapResponseToObservables: false
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeFalsy();
                });

                it("When mapping options are specified, apply them", function() {
                    var wasUsed = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        mapResponseToObservables: {
                            extend: {
                                "{root}": function(obj) {
                                    obj.params2 = "extended data";

                                    return obj;
                                }
                            }
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasUsed = data.params2 === "extended data";
                    });

                    expect(wasUsed).toBeTruthy();
                });
                
                it("Publish a success notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a completed notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulPutResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request failed", function() {
                it("gsoft.spa.Service.Http as source", function() {
                    var hasSource = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasSource = error.source === gsoft.spa.Service.Http;
                    });

                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPutResponse("{}");

                    expect(hasSource).toBeTruthy();
                });

                it("RequestFailed as errorType", function() {
                    var hasErrorType = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasErrorType = error.errorType === "RequestFailed";
                    });

                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPutResponse("{}");

                    expect(hasErrorType).toBeTruthy();
                });

                it("Data about the request", function() {
                    var hasData = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasData = !helpers.isNull(error.data);
                    });

                    httpService.put({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailPutResponse("{}");

                    expect(hasData).toBeTruthy();
                });
            });
        });

        describe("remove", function() {
            it("When the options object is null, throw an exception", function() {
                expect(function() { httpService.remove(null); }).toThrow();
                expect(function() { httpService.remove(undefined); }).toThrow();
            });
            
            it("When the url is null or empty, throw an exception", function() {
                expect(function() { httpService.remove({ url: "", data: {} }); }).toThrow();
                expect(function() { httpService.remove({ url: null, data: {} }); }).toThrow();
                expect(function() { httpService.remove({ url: undefined, data: {} }); }).toThrow();
            });
            
            it("When the content-type is specified, use the specified content-type", function() {
                var contentType = "text/html";
                
                httpService.remove({ 
                    url: dataSampler.generateString(10),
                    data: {},
                    contentType: contentType
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe(contentType);
            });
            
            it("Unmap all the remove data observable properties", function() {
                httpService.remove({ 
                    url: dataSampler.generateString(10),
                    data: {
                        param1: ko.observable(dataSampler.generateString(10))
                    }
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(ko.isObservable(request.param1)).toBeFalsy();
            });
            
            it("When the content-type is not specified, set the content-type as JSON", function() {
                httpService.remove({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();

                expect(request.contentType()).toBe("application/json");
            });
            
            it("The request type is DELETE", function() {
                httpService.remove({ 
                    url: dataSampler.generateString(10),
                    data: {}
                });
                
                var request = jasmine.Ajax.requests.mostRecent();
                
                expect(request.method).toBe("DELETE");
            });
            
            describe("Before sending the request", function() {    
                it("When a beforeSend handler is specified, call the specified handler", function() {
                    var callCount = 0;
                    
                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        beforeSend: function() {
                            callCount += 1;
                        }
                    });
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpBeforeRequest, function() {
                        callCount += 1;
                    });
                    
                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request completed successfully", function() {
                it("When a responseFilter is specified, use the specified filter to filter the request result", function() {
                    var wasFiltered = false;
                    var param1Value = dataSampler.generateString(10);
                    var data = "{\"param1\":\"" + param1Value + "\"}";
                    
                    var promise = httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        responseFilter: function(response) {
                            return response.data;
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasFiltered = data.param1.peek() === param1Value;
                    });
                    
                    expect(wasFiltered).toBeTruthy();
                });
                
                it("When mapResponseToObservables is not false, map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeTruthy();
                });
                
                it("When mapResponseToObservables is false, do not map the request result properties to observables", function() {
                    var wasMapped = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        mapResponseToObservables: false
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasMapped = ko.isObservable(data.data.param1);
                    });
                    
                    expect(wasMapped).toBeFalsy();
                });

                it("When mapping options are specified, apply them", function() {
                    var wasUsed = false;
                    var data = "{\"param1\":\"" + dataSampler.generateString(10) + "\"}";
                    
                    var promise = httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {},
                        mapResponseToObservables: {
                            extend: {
                                "{root}": function(obj) {
                                    obj.params2 = "extended data";

                                    return obj;
                                }
                            }
                        }
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{\"data\":" + data + "}");
                    
                    promise.done(function(data) {
                        wasUsed = data.params2 === "extended data";
                    });

                    expect(wasUsed).toBeTruthy();
                });
                
                it("Publish a success notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
                
                it("Publish a completed notification throught the mediator", function() {
                    var callCount = 0;
                    
                    gsoft.mediator.subscribe(gsoft.spa.Channel.HttpRequestSucceeded, function() {
                        callCount += 1;
                    });
                    
                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });
                    
                    helpers.ajax.setupSuccessfulDeleteResponse("{}");
                    
                    expect(callCount).toBe(1);
                });
            });
            
            describe("When the request failed", function() {
                it("gsoft.spa.Service.Http as source", function() {
                    var hasSource = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasSource = error.source === gsoft.spa.Service.Http;
                    });

                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailDeleteResponse("{}");

                    expect(hasSource).toBeTruthy();
                });

                it("RequestFailed as errorType", function() {
                    var hasErrorType = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasErrorType = error.errorType === "RequestFailed";
                    });

                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailDeleteResponse("{}");

                    expect(hasErrorType).toBeTruthy();
                });

                it("Data about the request", function() {
                    var hasData = false;

                    gsoft.mediator.subscribe(gsoft.spa.Channel.Error, function(error) {
                        hasData = !helpers.isNull(error.data);
                    });

                    httpService.remove({ 
                        url: dataSampler.generateString(10),
                        data: {}
                    });

                    helpers.ajax.setupFailDeleteResponse("{}");

                    expect(hasData).toBeTruthy();
                });
            });
        });
    });
})(test.helpers,
   test.dataSampler);

// jscs:enable requireBlocksOnNewline