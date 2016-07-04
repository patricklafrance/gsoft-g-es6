/* jshint esnext: true */

// Page view model
// ---------------------------------

(function($, utils) {
    gsoft.spa.viewModel = class ViewModel {
        // summary:
        //         When defined, the function will be called before applying the bindings.
        // returns:
        //         void or a jQuery promise.
        // _beforeBind: null,
        
        // summary:
        //         When defined, the function will be called after the bindings are applyied.
        // _afterBind: null,
        
        // summary:
        //         Bind the view model to the specified @element. This function is automatically called by the SPA
        //         when the route associated to the view model is entered.
        // description:
        //         If the "_beforeBind" function is defined, it will be called before applying the bindings.
        //         If the "_afterBind" function is defined, it will be called after ther binding are applyied.
        // element: DOM element
        //         The element to bind the view model to.
        // returns:
        //         A jQuery promise.
        bind(element) {
            gsoft.ensure(element, "element").isDomElement();

            this._element = element;

            if (utils.isFunction(this._beforeBind)) {
                var promise = this._beforeBind.call(this);

                if (utils.spa._isjQueryPromise(promise)) {
                    var that = this;

                    promise.done(function() {
                        that._applyBindings();
                    });

                    return promise;
                }
            }

            this._applyBindings();

            return this._createResolvingPromise();
        }

        _applyBindings() {
            ko.applyBindings(this, this._element);

            if (utils.isFunction(this._afterBind)) {
                this._afterBind.call(this);
            }
        }

        _createResolvingPromise() {
            var deferred = new $.Deferred();
            deferred.resolve();

            return deferred.promise();
        }
    };
})(jQuery,
   gsoft.utils);

/* jshint esnext: false */