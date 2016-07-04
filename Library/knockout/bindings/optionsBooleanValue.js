(function() {
    // summary:
    //          Value binding that support options with boolean values as string.
    ko.bindingHandlers.optionsBooleanValue = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();

            if (!ko.isObservable(value)) {
                throw new g.ArgumentError("The \"optionsBooleanValue\" binding value must be an observable.");
            }
            
            return ko.applyBindingsToNode(element, { 
                value: ko.computed({
                    read: function() {
                        var unwrappedValue = value();

                        if (g.isNull(unwrappedValue)) {
                            return null;
                        }

                        return unwrappedValue.toString();
                    },
                    write: function(newValue) {
                        if (g.isNull(newValue)) {
                            value(null);
                        } else {
                            value(newValue === "true");
                        }
                    }                   
                }) 
            });
        }
    };
})();