(function(undefined) {
    "use strict";
    
    window.test = {};
    
    test.dataSampler = {
        alphaNumerics: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    
        generateString: function(length) {
            var str = "";

            for (var i = 0; i < length; i += 1) {
                str += this.alphaNumerics.charAt(Math.floor(Math.random() * this.alphaNumerics.length));
            }

            return str;
        },

        generateInteger: function(maximum) {
            return Math.floor((Math.random() * maximum) + 1);
        }
    };
    
    test.helpers = {
        isBrowser: function() {
            return typeof document === "object";
        },
        
        isDefined: function(value) {
            return value !== undefined;
        },
        
        isUndefined: function(value) {
            return value === undefined;
        },
                
        isNull: function(value) {
            return this.isUndefined(value) || value === null;
        },
        
        isFunction: function(value) {
            return Object.prototype.toString.call(value) === "[object Function]";
        },

        isArray: function(value) {
            return Object.prototype.toString.call(value) === "[object Array]";
        },
        
        noop: function() {
        },
        
        keys:function(obj) {
            var propertyKeys = [];

            for (var propertyKey in obj) {
                if (obj.hasOwnProperty(propertyKey)) {
                    propertyKeys.push(propertyKey);
                }
            }

            return propertyKeys;
        },
        
        areEquals: function(expected, actual) {
            if ((this.isNull(expected) && !this.isNull(actual)) || (!this.isNull(expected) && this.isNull(actual))) {
                return false;
            }

            if ((ko.isObservable(expected) && !ko.isObservable(actual)) || (!ko.isObservable(expected) && ko.isObservable(actual))) {
                return false;
            }

            // Make sure that all observables are unwraped.
            expected = ko.toJS(expected);
            actual = ko.toJS(actual);

            // Stringify excluded functions so we must do a property count to get more accurate results.
            return this.keys(expected).length === this.keys(actual).length && JSON.stringify(expected) === JSON.stringify(actual);
        },
        
        dom: {
            getBodyElement: function() {
                return document.getElementsByTagName("body")[0];
            },

            appendElementToBody: function(element) {
                this.getBodyElement().appendChild(element);
            },

            removeElementFromBody: function(element) {
                this.getBodyElement().removeChild(element);
            },
            
            triggerEvent: function(element, eventName) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(eventName, true, true);

                element.dispatchEvent(event);
            }
        },
        
        ajax: {
            install: function() {
                jasmine.Ajax.install();
                jasmine.Ajax.requests.reset();
            },
            
            uninstall: function() {
                jasmine.Ajax.uninstall();
            },
            
            setupSuccessfulGetResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 200,
                    responseText: content
                });

                expect(request.method).toBe("GET");
            },
            
            setupFailGetResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 500,
                    responseText: content
                });

                expect(request.method).toBe("GET");
            },
            
            setupSuccessfulPostResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 200,
                    responseText: content
                });

                expect(request.method).toBe("POST");
            },
            
            setupFailPostResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 500,
                    responseText: content
                });

                expect(request.method).toBe("POST");
            },

            setupSuccessfulPutResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 200,
                    responseText: content
                });

                expect(request.method).toBe("PUT");
            },
            
            setupFailPutResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 500,
                    responseText: content
                });

                expect(request.method).toBe("PUT");
            },

            setupSuccessfulDeleteResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 200,
                    responseText: content
                });

                expect(request.method).toBe("DELETE");
            },
            
            setupFailDeleteResponse: function(content) {
                var request = jasmine.Ajax.requests.mostRecent();

                request.respondWith({
                    status: 500,
                    responseText: content
                });

                expect(request.method).toBe("DELETE");
            }
        }
    };
})();