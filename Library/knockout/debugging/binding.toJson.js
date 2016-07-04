(function() {
    ko.bindingHandlers.toJSON = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            
            return ko.applyBindingsToNode(element, {
                text: ko.computed(function() {
                    return ko.toJSON(value, null, 2);
                })
            });
        }
    };
})();