(function() {
    // summary:
    //          Hide the binding element when the value is true.
    ko.bindingHandlers.hidden = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            
            return ko.applyBindingsToNode(element, {
                visible: ko.computed(function() {
                    return !ko.utils.unwrapObservable(value);
                })
            });
        }
    };
})();