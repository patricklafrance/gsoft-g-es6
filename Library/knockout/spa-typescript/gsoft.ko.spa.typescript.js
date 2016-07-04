var G;
(function (G) {
    var Spa;
    (function (Spa) {
        "use strict";
        var ViewModel = (function () {
            function ViewModel() {
            }
            ViewModel.prototype.bind = function (element) {
                var _this = this;
                g.ensure(element, "element").isDomElement();
                this.element = element;
                if (g.utils.isFunction(this.beforeBind)) {
                    var promise = this.beforeBind.call(this);
                    if (g.utils.spa._isjQueryPromise(promise)) {
                        promise.done(function () {
                            _this.applyBindings();
                        });
                        return promise;
                    }
                }
                this.applyBindings();
                return this.createResolvingPromise();
            };
            ViewModel.prototype.applyBindings = function () {
                ko.applyBindings(this, this.element);
                if (g.utils.isFunction(this.afterBind)) {
                    this.afterBind.call(this);
                }
            };
            ViewModel.prototype.createResolvingPromise = function () {
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred.promise();
            };
            return ViewModel;
        }());
        Spa.ViewModel = ViewModel;
    })(Spa = G.Spa || (G.Spa = {}));
})(G || (G = {}));
