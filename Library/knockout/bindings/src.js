(function() {
    // summary:
    //          Set the "src" attribute of the binding element.
    ko.bindingHandlers.src = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            
            return ko.applyBindingsToNode(element, {
                attr: {
                    src: value
                }
            });
        }
    };
})();