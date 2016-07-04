(function() {
    // summary:
    //          Toggle the value when the binding element is clicked.
    ko.bindingHandlers.toggleVisibility = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            
            if (!ko.isObservable(value)) {
                throw new gsoft.ArgumentError("The \"toggleVisibility\" binding handler value must be an observable.");
            }
            
            return ko.applyBindingsToNode(element, {
                click: function() {
                    value(!value());
                }
            });
        }
    };
})();