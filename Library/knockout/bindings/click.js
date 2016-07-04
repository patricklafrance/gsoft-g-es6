(function() {
    var nativeClickInit = ko.bindingHandlers.click.init;
    
    // summary:
    //          Enhance the native "click" binding by adding the ability to disable the click with the "enable" or "disable" bindings.
    ko.bindingHandlers.click.init = function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var valueAccessorProxy = null;

        if (allBindingsAccessor.has("enable") || allBindingsAccessor.has("disable")) {
            valueAccessorProxy = function() {
                return function() {
                    if (allBindingsAccessor.has("enable")) {
                        var enableBinding = allBindingsAccessor.get("enable");

                        if (!ko.utils.unwrapObservable(enableBinding)) {
                            return false;
                        }
                    } else if (allBindingsAccessor.has("disable")) {
                        var disableBinding = allBindingsAccessor.get("disable");

                        if (ko.utils.unwrapObservable(disableBinding)) {
                            return false;
                        }
                    }

                    return valueAccessor().apply(this, arguments);
                };
            };
        }

        return nativeClickInit(element, (valueAccessorProxy || valueAccessor), allBindingsAccessor, viewModel, bindingContext);
    };
})();