// Dummy ViewModel binder
// ---------------------------------

(function($) {
    // summary:
    //         Dummy binder to use when a route is specified without a view model binder.
    gsoft.spa.DummyViewModelBinder = function() {
    };

    gsoft.spa.DummyViewModelBinder.prototype = {
        bind: function() {
            var deferred = $.Deferred();
            deferred.resolveWith(this);

            return deferred.promise();
        },

        unbind: function() {
        },

        isBound: function() {
            return true;
        }
    };
})(jQuery);