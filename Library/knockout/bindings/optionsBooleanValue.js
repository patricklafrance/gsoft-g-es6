(function(utils) {
    // summary:
    //          Value binding that support options with boolean values as string.
    ko.bindingHandlers.optionsBooleanValue = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();

            if (!ko.isObservable(value)) {
                throw new gsoft.ArgumentError("The \"optionsBooleanValue\" binding value must be an observable.");
            }
            
            return ko.applyBindingsToNode(element, { 
                value: ko.computed({
                    read: function() {
                        var unwrappedValue = value();

                        if (utils.isNull(unwrappedValue)) {
                            return null;
                        }

                        return unwrappedValue.toString();
                    },
                    write: function(newValue) {
                        if (utils.isNull(newValue)) {
                            value(null);
                        } else {
                            value(newValue === "true");
                        }
                    }                   
                }) 
            });
        }
    };
})(gsoft.utils);