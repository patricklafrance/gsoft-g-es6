(function() {
    // summary:
    //          Set the "href" attribute of the binding element.
    ko.bindingHandlers.href = {
        init: function(element, valueAccessor) {
            var value = valueAccessor();
            
            return ko.applyBindingsToNode(element, {
                attr: {
                    href: value
                }
            });
        }
    };
})();