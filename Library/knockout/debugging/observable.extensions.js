(function() {
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
        gsoft.utils.trace(this);

        return this;
    };

    ko.subscribable.fn.logChanges = function(name) {
        this._triggeredCount = 0;

        this.subscribe(function(newValue) {
            this._triggeredCount += 1;

            gsoft.utils.trace("{0} {1} triggered with new value {2}".format(this._triggeredCount, name, newValue));
        }, this);

        return this;
    };
})();