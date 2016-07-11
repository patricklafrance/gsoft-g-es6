(function(utils) {
    // Caching the shift array prototype function give a small performance boost.
    // This is used when manipulating function arguments. Since arguments is
    // an "Array like" it doesn't implements the native array manipulation functions.
    var shift = Array.prototype.shift;

    function formatString() {
        var args = arguments;
        var format = shift.apply(args);

        return format.replace(/\{(\d+)\}/g, function(m, n) {
            return args[n];
        });
    }

    ko.observable.fn.toString = function() {
        return "observable: " + ko.toJSON(this);
    };

    ko.computed.fn.toString = function() {
        return "computed: " + ko.toJSON(this);
    };

    ko.observableArray.fn.toString = function() {
        return "observableArray: " + ko.toJSON(this);
    };

    ko.subscribable.fn.log = function() {
        utils.trace(this);

        return this;
    };

    ko.subscribable.fn.logChanges = function(name) {
        this._triggeredCount = 0;

        this.subscribe(function(newValue) {
            this._triggeredCount += 1;

            utils.trace(formatString("{0} {1} triggered with new value {2}", this._triggeredCount, name, newValue));
        }, this);

        return this;
    };
})(gsoft.utils);