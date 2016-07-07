(function(utils) {
    ko.bindingHandlers.toConsole = {
        update: function(element, valueAccessor) {
            utils.trace(valueAccessor());
        }
    };
})(gsoft.utils);