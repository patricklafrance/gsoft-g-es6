// HTTP service
// ---------------------------------

(function($, utils, ensure, mediator) {
    gsoft.spa.Service.Http = "http";
    
    gsoft.spa.Channel.HttpBeforeRequest = "g-spa-http-before-request";
    gsoft.spa.Channel.HttpRequestSucceeded = "g-spa-http-request-succeeded";
    gsoft.spa.Channel.HttpRequestCompleted = "g-spa-http-request-completed";
    
    // ---------------------------------
    
    gsoft.spa.services.http = function(shell) {
        return {
            // summary:
            //         Send a GET HTTP request.
            // options: Object
            //         Supports all the options that jQuery AJAX supports (http://api.jquery.com/jquery.ajax/).
            //         The additional options are:
            //              mapResponseToObservables: Boolean or Object
            //                      An optional boolean or object value. 
            //                          If the value is a boolean and is not false, the request response will be mapped to observables.
            //                          If the value is a non null object, the object will be passed to the mapper as mapping options.
            //              responseFilter: Function
            //                      An optional function to filter the request response data before mapping to observables.    
            // returns:
            //         A jQuery promise.
            get: function(options) {
                ensure(options, "options", "HttpService.get").isNotNull();
                ensure(options.url, "options.url", "HttpService.get").isNotNullOrEmpty();

                var request = $.extend({}, options, {
                    type: "GET"
                });
                
                utils.groupTrace([
                    ["[HTTP SERVICE] Executing an HTTP GET request to \"%s\"", request.url],
                    [request]
                ]);

                return this._send(request);
            },

            // summary:
            //         Send a POST HTTP request.
            // options: Object
            //         Supports all the options that jQuery AJAX supports (http://api.jquery.com/jquery.ajax/). 
            //         The additional options are:
            //              mapResponseToObservables: Boolean or Object
            //                      An optional boolean or object value. 
            //                          If the value is a boolean and is not false, the request response will be mapped to observables.
            //                          If the value is a non null object, the object will be passed to the mapper as mapping options.
            //              responseFilter: Function
            //                      An optional function to filter the request response data before mapping to observables.    
            // returns:
            //         A jQuery promise.
            post: function(options) {
                ensure(options, "options", "HttpService.post").isNotNull();
                ensure(options.url, "options.url", "HttpService.post").isNotNullOrEmpty();
                ensure(options.data, "options.data", "HttpService.post").isNotNull();

                var request = $.extend({}, options, {
                    type: "POST"
                });
                
                utils.groupTrace([
                    ["[HTTP SERVICE] Executing an HTTP POST request to \"%s\"", request.url],
                    [request]
                ]);

                return this._send(request);
            },

            // summary:
            //         Send a PUT HTTP request.
            // options: Object
            //         Supports all the options that jQuery AJAX supports (http://api.jquery.com/jquery.ajax/). 
            //         The additional options are:
            //              mapResponseToObservables: Boolean or Object
            //                      An optional boolean or object value. 
            //                          If the value is a boolean and is not false, the request response will be mapped to observables.
            //                          If the value is a non null object, the object will be passed to the mapper as mapping options.
            //              responseFilter: Function
            //                      An optional function to filter the request response data before mapping to observables.    
            // returns:
            //         A jQuery promise.
            put: function(options) {
                ensure(options, "options", "HttpService.put").isNotNull();
                ensure(options.url, "options.url", "HttpService.put").isNotNullOrEmpty();
                ensure(options.data, "options.data", "HttpService.put").isNotNull();

                var request = $.extend({}, options, {
                    type: "PUT"
                });
                
                utils.groupTrace([
                    ["[HTTP SERVICE] Executing an HTTP PUT request to \"%s\"", request.url],
                    [request]
                ]);

                return this._send(request);                
            },

            // summary:
            //         Send a DELETE HTTP request (the function is call "remove" because "delete is a reserved word in JavaScript).
            // options: Object
            //         Supports all the options that jQuery AJAX supports (http://api.jquery.com/jquery.ajax/). 
            //         The additional options are:
            //              mapResponseToObservables: Boolean or Object
            //                      An optional boolean or object value. 
            //                          If the value is a boolean and is not false, the request response will be mapped to observables.
            //                          If the value is a non null object, the object will be passed to the mapper as mapping options.
            //              responseFilter: Function
            //                      An optional function to filter the request response data before mapping to observables.    
            // returns:
            //         A jQuery promise.
            remove: function(options) {
                ensure(options, "options", "HttpService.remove").isNotNull();
                ensure(options.url, "options.url", "HttpService.remove").isNotNullOrEmpty();

                var request = $.extend({}, options, {
                    type: "DELETE"
                });
                
                utils.groupTrace([
                    ["[HTTP SERVICE] Executing an HTTP DELETE request to \"%s\"", request.url],
                    [request]
                ]);

                return this._send(request);    
            },
            
            _send: function(request) {
                var that = this;
                
                if (utils.isNullOrEmpty(request.contentType)) {
                    request.contentType = "application/json";
                }
                
                if (utils.isNull(request.cache)) {
                    request.cache = false;
                }
                
                // Convert the request data from KO observables to plain objects.
                if (utils.isObject(request.data)) {
                    if (!utils.isNull(ko.viewmodel)) {
                        request.data = ko.viewmodel.toModel(request.data);
                    } else {
                        that.notifyThatKnockoutViewModelIsNotReferenced();
                    }
                }
                
                if (request.type !== "GET") {
                    if (request.contentType === "application/json") {
                        request.data = JSON.stringify(request.data);
                    }
                }

                var oldBeforeSendFunction = request.beforeSend;
                
                // There is no hook on a "promise" to get notified before a request is sent. We set it on the request options instead.
                request.beforeSend = function(jqxhr, settings) {
                    if (utils.isFunction(oldBeforeSendFunction)) {
                        oldBeforeSendFunction.apply(null, [jqxhr, settings]);
                    }
                    
                    mediator.publishSilently(gsoft.spa.Channel.HttpBeforeRequest, request, jqxhr, settings);
                };
                
                // Execute the request.
                var promise = $.ajax(request);
                
                // Using a "proxy" deferred to add custom mapping / error handling logics through 
                // the AJAX promise handlers.
                var deferred = $.Deferred();
                
                promise.fail(function(jqxhr, textStatus, errorThrown) {                
                    that._logError(request, jqxhr, textStatus, errorThrown);
                    
                    // Reject the deferred promise that his returned.
                    deferred.rejectWith(this, [jqxhr, textStatus, errorThrown]);
                    
                    shell.publishError(gsoft.spa.Service.Http, "RequestFailed", {
                        request: request,
                        jqxhr: jqxhr,
                        textStatus: textStatus,
                        errorThrown: errorThrown
                    });
                });
                
                promise.done(function(data, textStatus, jqxhr) {
                    var result = data;
                    
                    if (utils.isFunction(request.responseFilter)) {
                        result = request.responseFilter(result, request);
                    }
                    
                    // Map the request result to KO observables.
                    if (request.mapResponseToObservables !== false) {
                        if (!utils.isNull(ko.viewmodel)) {
                            var mappingOptions = utils.isObject(request.mapResponseToObservables) ? request.mapResponseToObservables : {};

                            result = ko.viewmodel.fromModel(result, mappingOptions);

                            delete request.mapping;
                        } else {
                            that.notifyThatKnockoutViewModelIsNotReferenced();
                        }
                    }
                    
                    // Resolve the deferred promise that his returned.
                    deferred.resolveWith(this, [result, textStatus, jqxhr]);
                    
                    mediator.publishSilently(gsoft.spa.Channel.HttpRequestSucceeded, request, result, textStatus, jqxhr);
                });
                             
                promise.always(function(param1, param2, param3) {
                    mediator.publishSilently(gsoft.spa.Channel.HttpRequestCompleted, request, param1, param2, param3);
                });
                
                return deferred.promise();
            },
            
            _logError: function(request, jqxhr, textStatus, errorThrown) {
                utils.groupTrace([
                    ["[HTTP SERVICE] An error occurred while performing an HTTP request of type %s to \"%s\"", request.type, request.url],
                    [request],
                    ["Status code: %s", jqxhr.status],
                    ["Status text: %s", jqxhr.statusText],
                    ["Exception: %s", utils.isNullOrEmpty(textStatus) ? "{NO_EXCEPTION}" : textStatus],
                    ["HTTP error: %s", utils.isNullOrEmpty(errorThrown) ? "{NO_HTTP_ERROR}" : errorThrown],
                    ["Response text: %s", utils.isNullOrEmpty(jqxhr.responseText) ? "{NO_RESPONSE}" : jqxhr.responseText]
                ]);
            },

            notifyThatKnockoutViewModelIsNotReferenced: function() {
                utils.trace("*** To automatically map your objects to knockout observables, the HTTP service require that you reference an external dependency called \"knockout.viewmodel\", you can download it at http://coderenaissance.github.io/knockout.viewmodel. ***");
            }
        };
    };
})(jQuery,
   gsoft.utils,
   gsoft.ensure,
   gsoft.mediator);