(function() {
    // summary:
    //          Modify the inner HTML of the binding element when he is disabled. The binding element
    //          can be disabled with the "enable" or "disable" bindings.
    var binding = ko.bindingHandlers.disabledText = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var disabledText = valueAccessor();
            
            if (ko.isObservable(disabledText)) {
                throw new g.ArgumentError("The \"disabledText\" binding value cannot be an observable.");
            }
            
            return ko.applyBindingsToNode(element, {
                text: ko.computed(function() {
                    if (binding._isDisabled(allBindingsAccessor)) {
                        return disabledText;
                    }
                    
                    return binding._getEnabledText(element, allBindingsAccessor);
                })
            });
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
                
            throw new g.ArgumentError("The \"disableText\" binding require that you specify the \"enable\" or \"disable\" binding.");
        },
        
        _getEnabledText: function(element, allBindingsAccessor) {
            var enabledText = "";
            
            if (allBindingsAccessor.has("text")) {
                var textBinding = allBindingsAccessor.get("text");
                
                enabledText = ko.utils.unwrapObservable(textBinding);
            } else {
                enabledText = ko.utils.domData.get(element, "enabledText");
                
                if (g.isNull(enabledText)) {
                    enabledText = element.innerHTML;
                    ko.utils.domData.set(element, "enabledText", enabledText);
                }
            }
            
            return enabledText;
        }
    };
})();