// Action binding
// --------------------------------

(function(utils) {
    var action = ko.bindingHandlers.action = {
        init: function(element, valueAccessor) {
            var options = valueAccessor();

            if (!utils.isObject(options)) {
                throw new gsoft.ArgumentError("Action binding - You must specify an object with the route options.");
            }
        },

        update: function(element, valueAccessor) {
            var options = valueAccessor();

            // This is the call to ko.toJS that unwrap all the observables and create the dependencies that will force the binding handler
            // to reevaluate and call the update function when a parameter change.
            var url = spa.action(ko.utils.unwrapObservable(options.name), ko.toJS(options.parameters));
            
            if (element.tagName === "A") {
                element.setAttribute("href", url);
            } else {
                var onClickProxy = function(event) {
                    action._onClick(event, url, options);
                };
                
                element.addEventListener("click", onClickProxy);
                
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    element.removeEventListener("click", onClickProxy);
                });  
            }   
        },
        
        _onClick: function(event, url, options) {
            event.preventDefault();

            var delay = options.redirectDelay;

            if (utils.isNull(delay)) {
                delay = action._redirectDelay;
            }

            if (delay > 0) {
                setTimeout(function() {
                    action._navigate(url, options);
                }, delay);
            } else {
                action._navigate(url, options);
            }
        },

        _navigate: function(url, options) {
            if (utils.isUndefined(options.newWindow)) {
                spa.utils._navigate(url);
            } else {
                spa.utils._openWindow(url, options.newWindow);
            }
        },

        _redirectDelay: 0
    };
})(gsoft.utils);