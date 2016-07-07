(function() {
    // summary:
    //          Add a CSS class to the binding element when he is disabled. The binding element
    //          can be disabled with the "enable" or "disable" bindings.
    var binding = ko.bindingHandlers.disabledCssClass = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var disabledCssClass = valueAccessor();
            
            if (ko.isObservable(disabledCssClass)) {
                throw new gsoft.ArgumentError("The \"disabledCssClass\" binding value cannot be an observable.");
            }
            
            var bindingsToApply = {
                css: {}
            };
            
            bindingsToApply.css[disabledCssClass] = ko.computed(function() {
                return binding._isDisabled(allBindingsAccessor);
            });
            
            return ko.applyBindingsToNode(element, bindingsToApply);
        },
        
        _isDisabled: function(allBindingsAccessor) {
            if (allBindingsAccessor.has("enable")) {
                var enableBinding = allBindingsAccessor.get("enable");

                return !ko.utils.unwrapObservable(enableBinding);
            }
            
            if (allBindingsAccessor.has("disable")) {
                var disableBinding = allBindingsAccessor.get("disable");

                return ko.utils.unwrapObservable(disableBinding);
            }
                
            throw new gsoft.ArgumentError("The \"disabledCssClass\" binding require that you specify the \"enable\" or \"disable\" binding.");
        }
    };
})();