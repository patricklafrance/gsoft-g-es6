(function() {
    ko.bindingHandlers.toConsole = {
        update: function(element, valueAccessor) {
            gsoft.utils.trace(valueAccessor());
        }
    };
})();